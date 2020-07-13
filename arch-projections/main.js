(function () {
    /*
    ################# shared #################
    */

    // ---- check mouse support --- //
    window.addEventListener('mousemove', mouseDetected);

    function mouseDetected(e) {
        var body = document.body;
        body.classList.add('mouse-supported');
        window.removeEventListener('mousemove', mouseDetected);
    }
    var timeline = new TimelineLite();
    var navigaton = (function () {
        //elements
        // var burger = document.querySelector('.burger'),
        //     nav = document.querySelector('.navigation-wrap'),
        //     mainList = nav.querySelector('.main-list'),
        //     aboutLinks = mainList.querySelectorAll('.about-links .section-link'),
        //     servicesLinks = mainList.querySelectorAll('.services-links .section-link');

        //vars
        destination = {
            to: '',
            sectionIndex: 0
        };

        //functons
        function _isSamePage() {
            var currentPage = barbaHandler.oldPage();
            if (currentPage.pathname === destination.to) {
                return true;
            }

            return false;
        }

        function _toggleNav() {
            burger.classList.toggle('burger-x');
            nav.classList.toggle('nav-active');
        }

        function _goTo(event) {
            var target = event.target;
            var tagName = target.tagName;
            if (target.classList.contains('section-link')) {
                destination.to = 'about-us';
                destination.sectionIndex = Array.prototype.indexOf.call(aboutLinks, target);
                if (destination.sectionIndex < 0) {
                    destination.to = 'services';
                    destination.sectionIndex = Array.prototype.indexOf.call(servicesLinks, target);
                }

                if (!_isSamePage()) {
                    setTimeout(function () {
                        Barba.Pjax.goTo('/' + destination.to + '/');
                    }, 700);
                } else {
                    var currentPage = barbaHandler.oldPage();
                    setTimeout(function () {
                        currentPage.object.scrollTo(destination.sectionIndex);
                    }, 700);
                }
            }

            if (tagName === 'A' || tagName === 'SPAN') {
                _toggleNav();
            }
        }

        //events
        // burger.addEventListener('click', _toggleNav);
        // mainList.addEventListener('click', _goTo);

        return {
            destination: function () {
                return destination;
            }
        };
    })();

    /*
    ################# Custom scrolling functionality #################
    */
    var customScrolling = (function () {
        //vars
        var pressed, firstTouch, lastTouch, velocity, amplitude,
            frame, timestamp, animationFrameNumber;


        // Determines if the passed element is overflowing its bounds,
        // either vertically or horizontally.
        function _isScrollingOnOverflowedEl(el, tagName) {
            if (tagName) {
                return el.tagName === tagName && el.clientHeight < el.scrollHeight;
            }
            return el.clientHeight < el.scrollHeight;
        }
        //horizontal Scrolling/dragging methods
        function _xPos(event) {
            //touch event
            if (event.targetTouches && (event.targetTouches.length >= 1)) {
                return event.targetTouches[0].clientX;
            }

            //mouse event
            return event.clientX;
        }

        function _yPos(event) {
            //touch event
            if (event.targetTouches && (event.targetTouches.length >= 1)) {
                return event.targetTouches[0].clientY;
            }

            //mouse event
            return event.clientY;
        }

        function _getPos(isVertical, event) {
            return isVertical ? _yPos(event) : _xPos(event);
        }

        function _scroll(object, delta) {
            var translate, directedProg;
            delta = delta || 0;
            object.progress = object.progress + object.direction * delta * 0.05; // controls scroller speed and direction

            //object.progress must be absolute regardless its directon from 0 to 100
            if (object.progress <= 0) {
                object.progress = 0;
            } else if (object.progress >= 100) {
                object.progress = 100;
            }

            //if the scrolling progress indicator exists
            if (object.el != null) {
                //progress with a direction, it's either - or +
                directedProg = object.progress * object.direction;
                // translate = object.isVertical ? 'translate3D( 0, ' + directedProg + '%, 0)' : 'translate3D(' + directedProg + '%, 0, 0)';
                // object.el.style.transform = translate;
                translate = object.isVertical ? {
                    x: '0%',
                    y: directedProg + '%'
                } : {
                        x: directedProg + '%',
                        y: '0%'
                    };

                //TODO: replace timeline with tweenlite
                if (object.animatable) {
                    TweenLite.to(object.el, 0.6, translate);
                } else {
                    TweenLite.set(object.el, translate);
                }
            }
        }

        function _autoScroll(object) {
            var elapsed, delta;
            if (amplitude) {
                elapsed = Date.now() - timestamp;
                delta = amplitude * Math.exp(-elapsed / 325);
                if (delta > 0.5 || delta < -0.5) {
                    _scroll(object, delta);
                    animationFrameNumber = requestAnimationFrame(_autoScroll.bind(null, object));
                } else {
                    _scroll(object, delta);
                }
            }
            if (object.updateSildeIndex) {
                object.updateSildeIndex();
            }
        }

        function _track(progress) {
            var now, elapsed, delta, v;
            now = Date.now();
            elapsed = now - timestamp;
            timestamp = now;
            delta = progress - frame;
            frame = progress;

            v = 500 * delta / elapsed;
            velocity = 0.8 * v + 0.2 * velocity;
        }

        function tap(object, event) {
            pressed = true;
            firstTouch = _getPos(object.isVertical, event);
            lastTouch = firstTouch;

            //to calculate velocity
            velocity = amplitude = 0;
            frame = object.progress;
            timestamp = Date.now();
            // console.log('firstTouch = ' + firstTouch);
            //        clearInterval(ticker);
            //        ticker = setInterval(_track, 100);
            // event.preventDefault();
            // event.stopPropagation();
            // return false;
        }

        function release(object, event) {
            // console.log(event.target);
            if (pressed) {
                //        clearInterval(ticker);
                _track(object.progress);
                if (velocity > 5 || velocity < -5) {
                    amplitude = 0.8 * velocity;
                    // target = Math.round(object.progress + amplitude);
                    timestamp = Date.now();
                    animationFrameNumber = requestAnimationFrame(_autoScroll.bind(null, object));
                }
            }

            pressed = false;
            // event.preventDefault();
            // event.stopPropagation();
            // return false;
        }

        function drag(object, event) {
            if (_isScrollingOnOverflowedEl(event.target)) {
                return false;
            }
            var pos, delta;
            if (pressed) {
                pos = _getPos(object.isVertical, event); //get latest touch x or y position
                delta = lastTouch - pos;
                // simple threshold of 2px to prevent jittering due to some micromovements
                if (delta > 2 || delta < -2) {
                    lastTouch = pos;
                    _scroll(object, delta);
                }
            }
            // console.log('delta = ' + delta);
            event.preventDefault();
            event.stopPropagation();
            return true;
        }

        function wheelDrag(scrollObject, event) {
            if (_isScrollingOnOverflowedEl(event.target)) {
                return false;
            }
            var deltaY = event ? event.deltaY : 0,
                deltaX = event ? event.deltaX : 0,
                delta = scrollObject.isVertical ? deltaY : deltaX;

            _scroll(scrollObject, delta);
            return true;
        }

        function click(scrollObject) {
            _scroll(scrollObject);
        }

        // function isItAClick(event) {
        //     console.log(true);
        //     //if it is a drag
        //     if (this.firstTouch !== this.lastTouch) {
        //         event.preventDefault();
        //         event.stopPropagation();
        //     }
        // }

        //public properties
        return {
            wheelDrag: wheelDrag,
            tap: tap,
            drag: drag,
            release: release,
            click: click
        };
    })();

    /*
    ################# Pages' components #################
    */


    var home = function () {
        //elements
        var container = document.querySelector('.home'),
            content = container.querySelector('.content'),
            // scrollArea = content.querySelector('.scroll-area'),
            // leftArea = scrollArea.querySelector('.left-area'),
            // rightArea = scrollArea.querySelector('.right-area'),
            // bottomArea = scrollArea.querySelector('.bottom-area'),
            // leftTitle = leftArea.querySelector('.dest-title'),
            // leftScrollBar = leftArea.querySelector('.progress'),
            // rightTitle = rightArea.querySelector('.dest-title'),
            // rightScrollBar = rightArea.querySelector('.progress'),
            // bottomTitle = bottomArea.querySelector('.dest-title'),
            // bottomScrollBar = bottomArea.querySelector('.progress'),
            introElements = content.querySelectorAll('.opacity0');

        //vars
        var scrollObj = {
            el: null,
            progress: 70,
            direction: 1,
            isVertical: true
        },
            reached = false;
        // var leftScrollBarObj = {
        //         el: leftScrollBar,
        //         direction: -1, // 0 to -100
        //         progress: 0,
        //         isVertical: false,
        //     },
        //     rightScrollBarObj = {
        //         el: rightScrollBar,
        //         direction: 1, // 0 to 100
        //         progress: 0,
        //         isVertical: false,
        //     },
        //     bottomScrollBarObj = {
        //         el: bottomScrollBar,
        //         direction: 1, // 0 to 100
        //         progress: 0,
        //         isVertical: true,
        //     },

        //     scrollBarArray = [leftScrollBarObj, rightScrollBarObj, bottomScrollBarObj],
        //     destPath = ['philosophy', 'services', 'projects'];


        //functions
        function init() {
            //configure the component based on the current width
            // _resize();
        }

        function goTo(path) {
            if (!reached) {
                Barba.Pjax.goTo('/' + path + '/');
                reached = true;
            }
        }

        function _resize() {

        }

        function _scroll(event) {
            customScrolling.wheelDrag(scrollObj, event);
            if (scrollObj.progress >= 100) {
                goTo('projects');
            }
        }

        function _tapHandler(event) {
            customScrolling.tap(scrollObj, event);
        }

        function _dragHandler(event) {
            customScrolling.drag(scrollObj, event);
            if (scrollObj.progress >= 100) {
                goTo('projects');
            }
        }

        function _releaseHandler(event) {
            customScrolling.release(scrollObj, event);
        }

        //exits and enters animations for the page
        function enter(source) {
            switch (source) {
                case 'projects':
                case 'catalog':
                case 'project':
                case 'about-us':
                case 'services':
                    timeline.fromTo(container, 0.6, {
                        y: '-100%'
                    }, {
                        y: '0%'
                    });
                default:
                    //show landing's content
                    content.classList.remove('hidden-intro');
                    timeline.staggerTo(introElements, 0, {
                        className: '-=opacity0'
                    }, 0.1);
            }
        }

        function _renderExitUp(newPage) {
            timeline.to(container, 0.6, {
                y: '-100%'
            });
        }

        function _renderExitLeft(newPage) {
            timeline.to(container, 0.6, {
                x: '-100%'
            });
        }

        function _renderExitRight() {
            timeline.to(container, 0.6, {
                x: '100%'
            });
        }

        function _renderExit() {

        }

        function _exit(resolve, reject) {
            var newPage = barbaHandler.newPage();
            var destination = newPage.class;
            var newContent = newPage.containerEl;

            content.parentElement.style.zIndex = 1;
            newContent.style.zIndex = 0;
            timeline.clear();
            timeline.eventCallback('onComplete', function () {
                resolve(true);
            });

            switch (destination) {
                case 'projects':
                    _renderExitUp(newPage);
                    break;
                case 'services':
                    _renderExitLeft(newPage);
                    break;
                case 'about-us':
                    _renderExitRight(newPage);
                    break;
                default:
                    _renderExitUp(newPage);

            }
            newPage.object.enter('home');
        }

        function exiting() {
            var exitPromise = new Promise(_exit);
            return exitPromise;
        }

        //events
        // content.addEventListener('wheel', _scroll);
        window.addEventListener('resize', _resize);
        //enable dragging events
        // content.addEventListener('touchstart', _tapHandler);
        // content.addEventListener('touchmove', _dragHandler);
        // content.addEventListener('touchend', _releaseHandler);

        //public properties
        return {
            init: init,
            enter: enter,
            exiting: exiting
        };
    };

    var projects = function () {

        //elements
        var container = document.querySelector('.projects'),
            content = container.querySelector('.content'),
            firstWrap = content.querySelector('.first-wrap'),
            secondWrap = content.querySelector('.second-wrap'),
            headersList = firstWrap.querySelector('.headers-list'),
            trackList = firstWrap.querySelector('.scroller ul'),
            trackItems = trackList.querySelectorAll('.track'),
            scrollerProgress = firstWrap.querySelector('.progress'),
            coversList = content.querySelector('.covers-list'),
            control = content.querySelector('.control');


        //vars
        var numberOftracks = trackItems.length,
            currentSlide = 0,
            paths = ['large', 'medium', 'small'],
            trackLength = 100 / numberOftracks,
            scrollBarObj = {
                el: scrollerProgress,
                direction: 1, // 0 to 100
                progress: trackLength / 2,
                isVertical: true,
                animatable: false,
                updateSildeIndex: updateSildeIndex
            };

        //methods
        function init() {
            // _resize();
        }

        function _resize() {
            _setScrollDirection();
            scrollTo(currentSlide, false);
        }

        function _setScrollDirection() {
            if (innerWidth >= 1024) {
                scrollBarObj.isVertical = true;
            } else {
                scrollBarObj.isVertical = false;
            }
        }

        function _changeSlides(index) {
            var offset = index * -100,
                translate = {
                    y: offset + '%'
                };

            // display current project's title and cover
            if (scrollBarObj.animatable) {
                TweenLite.to(coversList, 0.6, translate);
                TweenLite.to(headersList, 0.6, translate);
            } else {
                TweenLite.set(coversList, translate);
                TweenLite.set(headersList, translate);
            }
        }

        function _isIndexChanged(index) {
            return index !== currentSlide;
        }

        function updateSildeIndex() {
            var index = Math.floor(scrollBarObj.progress / trackLength);
            index = index == (100 / trackLength) ? index - 1 : index;
            if (_isIndexChanged(index)) {
                // console.log('change slide');
                _changeSlides(index);
            }

            currentSlide = index;
        }

        function scrollTo(index, animatable = true) {
            scrollBarObj.animatable = animatable;
            scrollBarObj.progress = index * trackLength + trackLength / 2;
            customScrolling.click(scrollBarObj);
            updateSildeIndex();
        }

        function _projectSelected(event) {
            var target = event.target,
                index = Array.prototype.indexOf.call(trackItems, target);
            scrollTo(index);
        }

        function _wheelHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.wheelDrag(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        function _tapHandler(event) {
            customScrolling.tap(scrollBarObj, event);
        }

        function _dragHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.drag(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        function _releaseHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.release(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        function _viewCatalog() {
            Barba.Pjax.goTo(paths[currentSlide] + '/');
        }

        //exits and enters animations for the page
        function _restoreCurrentSlide() {
            //choose a slide based on the previous page
            var oldPage = barbaHandler.oldPage();
            var pathname, index;
            if (oldPage) {
                pathname = oldPage.pathname;
                index = paths.indexOf(pathname);
                index = index <= -1 ? 0 : index;
            } else {
                index = 0;
            }
            scrollTo(index, false);
        }

        function enter(source) {
            _setScrollDirection();
            var scrollDir = innerWidth >= 1024 ? {
                y: scrollBarObj.progress + '%'
            } : {
                    x: scrollBarObj.progress + '%'
                },
                shiftDirection;
            switch (source) {
                case 'home':
                    timeline.set(headersList, {
                        y: '100%'
                    }, 0)
                        .to(headersList, 0.6, {
                            y: '0%'
                        })
                        .to(scrollerProgress, 0.6, scrollDir);
                    break;
                case 'catalog':
                    _restoreCurrentSlide();
                    shiftDirection = innerWidth >= 1024 ? {
                        x: '-50%'
                    } : {
                            y: '-50%'
                        };
                    timeline.fromTo(container, 0.6, shiftDirection, {
                        x: '0%',
                        y: '0%'
                    }, 0);
                    break;
                case 'about-us':
                    shiftDirection = innerWidth >= 1024 ? {
                        x: '50%'
                    } : {
                            y: '50%'
                        };
                    timeline.fromTo(container, 0.6, shiftDirection, {
                        x: '0%',
                        y: '0%'
                    }, 0)
                        .fromTo(scrollerProgress, 0.6, {
                            x: '0%',
                            y: '0%'
                        }, scrollDir, '-=0.2');
                    break;

                case 'services':
                    timeline.fromTo(headersList.parentElement, 0.6, {
                        opacity: 0
                    }, {
                        opacity: 1
                    }, 0)
                        .fromTo(scrollerProgress, 0.6, {
                            x: '0%',
                            y: '0%'
                        }, scrollDir);

                    break;
                default:
                    timeline.fromTo(content, 1, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1
                    }, 0.2)
                        .fromTo(headersList, 0.2, {
                            y: '100%'
                        }, {
                            y: '0%'
                        }, '-=0.5')
                        .fromTo(scrollerProgress, 0.6, {
                            x: '0%',
                            y: '0%'
                        }, scrollDir, '-=0.2');
            }
        }

        function _exit(resolve, reject) {
            if (scrollBarObj.isVertical) {
                var lastProgress = {
                    y: scrollBarObj.progress + '%'
                }

            } else {
                var lastProgress = {
                    x: scrollBarObj.progress + '%'
                }
            }
            var shiftDirection;
            var newPage = barbaHandler.newPage();
            var destination = newPage.class;
            var newContainer = newPage.containerEl;

            container.style.zIndex = 1;
            newContainer.style.zIndex = 0;
            timeline.clear();
            timeline.eventCallback('onComplete', function () {
                resolve(true);
            });

            switch (destination) {
                case 'home':
                    newContainer.style.zIndex = 2;
                    break;
                case 'catalog':
                    shiftDirection = innerWidth >= 1024 ? {
                        x: '-50%',
                        opacity: 0
                    } : {
                            y: '-50%',
                            opacity: 0
                        };
                    timeline.to(container, 0.6, shiftDirection);

                    break;
                case 'about-us':
                    shiftDirection = innerWidth >= 1024 ? {
                        x: '50%',
                        opacity: 0
                    } : {
                            y: '50%',
                            opacity: 0
                        };
                    timeline.to(container, 0.6, shiftDirection);
                    break;
                case 'services':
                    timeline.to(secondWrap, 0.6, {
                        y: '100%'
                    })
                        .to(headersList.parentElement, 0.6, {
                            opacity: 0
                        }, 0)
                        .fromTo(scrollerProgress, 0.6, lastProgress, {
                            x: '0%',
                            y: '0%'
                        }, 0)
                        .set(trackList.parentElement, {
                            opacity: 0
                        });
                    break;

                default:
                    timeline.to(container, 0.5, {
                        autoAlpha: 0
                    });


            }
            newPage.object.enter('projects');
        }

        function exiting() {
            var exitPromise = new Promise(_exit);
            return exitPromise;
        }

        //events
        window.addEventListener('resize', _resize);
        // content.addEventListener('wheel', _wheelHandler);
        control.addEventListener('click', _viewCatalog);
        trackList.addEventListener('click', _projectSelected);
        //enable dragging events
        content.addEventListener('touchstart', _tapHandler);
        content.addEventListener('touchmove', _dragHandler);
        content.addEventListener('touchend', _releaseHandler);

        return {
            init: init,
            scrollTo: scrollTo,
            enter: enter,
            exiting: exiting
        };
    };

    var catalog = function () {
        //elements
        var container = document.querySelectorAll('.catalog'),
            container = container[1] || container[0],
            content = container.querySelector('.content'),
            firstWrap = content.querySelector('.first-wrap'),
            coversList = firstWrap.querySelector('.covers-list'),
            headersList = firstWrap.querySelector('.headers-list'),
            control = firstWrap.querySelector('.control'),
            secondWrap = content.querySelector('.second-wrap'),
            scroller = secondWrap.querySelector('.scroller'),
            tracks = scroller.querySelectorAll('.track'),
            scrollerProgress = scroller.querySelector('.progress'),
            plans = secondWrap.querySelector('.project-plans'),
            planItems = plans.querySelectorAll('.plans-item');


        //vars
        var numberOfTrack = tracks.length,
            currentSlide = 0,
            paths = ['max-complex', 'bxw-community', 'seaside-villa', '510-residence', 'zen-house'],
            trackLength = 100 / numberOfTrack,
            scrollBarObj = {
                el: scrollerProgress,
                direction: 1, // 0 to 100
                progress: trackLength / 2,
                isVertical: true,
                animatable: false,
                updateSildeIndex: updateSildeIndex
            };

        //functions
        function init() {
            // _resize();
        }

        function _resize() {
            _setScrollDirection();
            scrollTo(currentSlide, false);
        }

        function _setScrollDirection() {
            if (innerWidth >= 1024) {
                scrollBarObj.isVertical = true;
            } else {
                scrollBarObj.isVertical = false;
            }
        }

        function _changeSlides(index) {
            var offset = index * -100;
            translate = {
                y: offset + '%'
            };

            // display current project's title and cover
            if (scrollBarObj.animatable) {
                TweenLite.to(coversList, 0.6, translate);
                TweenLite.to(headersList, 0.6, translate);
            } else {
                TweenLite.set(coversList, translate);
                TweenLite.set(headersList, translate);
            }

            //display current project's plan
            TweenLite.to(planItems[currentSlide], 0.6, {
                autoAlpha: 0
            });
            TweenLite.to(planItems[index], 0.6, {
                autoAlpha: 1
            });
        }

        function _isIndexChanged(index) {
            return index !== currentSlide;
        }

        function updateSildeIndex() {
            var index = Math.floor(scrollBarObj.progress / trackLength);
            index = index == (100 / trackLength) ? index - 1 : index;
            if (_isIndexChanged(index)) {
                // console.log('change slide');
                _changeSlides(index);
            }

            currentSlide = index;
        }

        function scrollTo(index, animatable = true) {
            scrollBarObj.animatable = animatable;
            scrollBarObj.progress = index * trackLength + trackLength / 2;
            customScrolling.click(scrollBarObj);
            updateSildeIndex();
        }

        function _projectSelected(event) {
            var target = event.target,
                index = Array.prototype.indexOf.call(tracks, target);
            scrollTo(index);
        }

        function _wheelHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.wheelDrag(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        function _tapHandler(event) {
            customScrolling.tap(scrollBarObj, event);
        }

        function _dragHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.drag(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        function _releaseHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.release(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        function _viewProject() {
            Barba.Pjax.goTo(paths[currentSlide] + '/');
        }


        //exits and enters animations for the page
        function _restoreCurrentSlide() {
            //choose a slide based on the previous page
            var oldPage = barbaHandler.oldPage();
            var pathname, index;
            if (oldPage) {
                pathname = oldPage.pathname;
                index = paths.indexOf(pathname);
                index = index <= -1 ? 0 : index;
            } else {
                index = 0;
            }
            scrollTo(index, false);
        }

        function enter(source) {
            _setScrollDirection();
            var scrollDir = innerWidth >= 1024 ? {
                y: scrollBarObj.progress + '%'
            } : {
                    x: scrollBarObj.progress + '%'
                };
            switch (source) {
                case 'projects':
                    var shiftDirection = innerWidth >= 1024 ? {
                        x: '50%'
                    } : {
                            y: '50%'
                        };
                    timeline.fromTo(container, 0.6, shiftDirection, {
                        x: '0%',
                        y: '0%'
                    }, 0)
                        .fromTo(headersList, 0.2, {
                            y: '100%'
                        }, {
                            y: '0%'
                        })
                        .fromTo(scrollerProgress, 0.6, {
                            x: '0%',
                            y: '0%'
                        }, scrollDir, '-=0.2');
                    break;

                case 'project':
                    _restoreCurrentSlide();
                    var shiftDirection = innerWidth >= 1024 ? {
                        x: '-50%'
                    } : {
                            y: '-50%'
                        };
                    timeline.fromTo(container, 0.6, shiftDirection, {
                        x: '0%',
                        y: '0%'
                    }, 0);
                    break;
                case 'catalog':
                    timeline.set(scrollerProgress, scrollDir, 0);
                    break;
                default:
                    timeline.fromTo(content, 1, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1
                    }, 0.2)
                        .fromTo(headersList, 0.2, {
                            y: '100%'
                        }, {
                            y: '0%'
                        }, '-=0.5')
                        .fromTo(scrollerProgress, 0.6, {
                            x: '0%',
                            y: '0%'
                        }, scrollDir, '-=0.2');

            }
        }

        function _exit(resolve, reject) {
            if (scrollBarObj.isVertical) {
                var scrollDir = {
                    y: trackLength / 2 + '%'
                },
                    lastProgress = {
                        y: scrollBarObj.progress + '%'
                    }

            } else {
                var scrollDir = {
                    x: trackLength / 2 + '%'
                },
                    lastProgress = {
                        x: scrollBarObj.progress + '%'
                    }
            }

            var newPage = barbaHandler.newPage(),
                destination = newPage.class,
                newContainer = newPage.containerEl;

            container.style.zIndex = 1;
            newContainer.style.zIndex = 0;
            timeline.clear();
            timeline.eventCallback('onComplete', function () {
                resolve(true);
            });

            switch (destination) {
                case 'home':
                    container.style.zIndex = 0;
                    newContainer.style.zIndex = 1;
                    break;
                case 'projects':
                    var shiftDirection = innerWidth >= 1024 ? {
                        x: '50%',
                        opacity: 0
                    } : {
                            y: '50%',
                            opacity: 0
                        };
                    timeline.to(container, 0.6, shiftDirection);
                    break;
                case 'project':
                    //fade out and translate left/up
                    var shiftDirection = innerWidth >= 1024 ? {
                        x: '-50%',
                        opacity: 0
                    } : {
                            y: '-50%',
                            opacity: 0
                        };
                    timeline.to(container, 0.6, shiftDirection);
                    break;


                case 'catalog':
                    timeline.to([coversList.parentElement, headersList.parentElement], 0.6, {
                        y: '-100%'
                    })
                        .to(plans, 0.6, {
                            opacity: 0
                        }, 0)
                        .fromTo(scrollerProgress, 0.6, lastProgress, scrollDir, 0);

                    break;
                default:
                    timeline.to(container, 0.5, {
                        autoAlpha: 0
                    });
            }
            newPage.object.enter('catalog');
        }

        function exiting() {
            var exitPromise = new Promise(_exit);
            return exitPromise;
        }

        //events
        window.addEventListener('resize', _resize);
        // content.addEventListener('wheel', _wheelHandler);
        control.addEventListener('click', _viewProject);
        scroller.addEventListener('click', _projectSelected);
        //enable dragging events
        content.addEventListener('touchstart', _tapHandler);
        content.addEventListener('touchmove', _dragHandler);
        content.addEventListener('touchend', _releaseHandler);

        //public properties
        return {
            init: init,
            scrollTo: scrollTo,
            enter: enter,
            exiting: exiting
        };
    };

    var project = function () {
        //elements
        var container = document.querySelector('.project'),
            content = container.querySelector('.content'),
            firstWrap = content.querySelector('.first-wrap'),
            plans = firstWrap.querySelector('.project-plans'),
            plansList = plans.querySelector('.plans-list'),
            plansItems = plans.querySelectorAll('.plans-item'),
            plansCounter = plans.querySelector('.counter'),
            secondWrap = content.querySelector('.second-wrap'),
            pics = secondWrap.querySelector('.project-pics'),
            picsList = pics.querySelector('.pics-list'),
            picsItems = pics.querySelectorAll('.pics-item'),
            picsCounter = pics.querySelector('.counter'),
            textWrap = content.querySelector('.text-wrap'),
            textControl = content.querySelector('.text-control');
        // backControl = content.querySelector('.back-control');

        //vars
        var numberOfPlans = plansItems.length,
            numberOfPics = picsItems.length,
            currentPlanNum = 1,
            currentPicNum = 1;

        // //functions
        function init() {
            updateCounterHtml();
        }

        function updateCounterHtml() {
            plansCounter.innerHTML = currentPlanNum + '/' + numberOfPlans;
            picsCounter.innerHTML = currentPicNum + '/' + numberOfPics;
        }

        function changeImg(event) {
            var imgs, imgIndex;
            if (event.currentTarget === plansList) {
                imgs = plansItems;
                currentPlanNum = currentPlanNum % numberOfPlans + 1 // [1 to number of plans] 
                imgIndex = currentPlanNum - 1;
            } else {
                imgs = picsItems;
                currentPicNum = currentPicNum % numberOfPics + 1;
                imgIndex = currentPicNum - 1;
            }
            updateCounterHtml();

            //display project's next image
            imgs.forEach(function (el, index) {
                if (imgIndex === index) {
                    el.classList.add('active');
                } else {
                    el.classList.remove('active');
                }
            });
        }

        function toggleText() {
            firstWrap.classList.toggle('hidden');
            secondWrap.classList.toggle('hidden');
            textWrap.classList.toggle('hidden');
            textControl.innerHTML = textWrap.classList.contains('hidden') ? 'Text' : 'Close Text';
        }

        function backClicked() {
            Barba.Pjax.goTo('../');
        }

        //exits and enters animations for the page
        function enter(source) {
            switch (source) {
                case 'catalog':
                    var shiftDirection = innerWidth >= 1024 ? {
                        x: '50%'
                    } : {
                            y: '50%'
                        };
                    timeline.fromTo(container, 0.6, shiftDirection, {
                        x: '0%',
                        y: '0%'
                    }, 0);
                    break;
                default:
                    timeline.fromTo(container, 0.6, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1
                    });
            }
        }

        function _exit(resolve, reject) {
            var newPage = barbaHandler.newPage(),
                destination = newPage.class,
                newContainer = newPage.containerEl;

            container.style.zIndex = 1;
            newContainer.style.zIndex = 0;
            timeline.clear();
            timeline.eventCallback('onComplete', function () {
                resolve(true);
            });

            switch (destination) {
                case 'catalog':
                    var shiftDirection = innerWidth >= 1024 ? {
                        x: '50%',
                        opacity: 0
                    } : {
                            y: '50%',
                            opacity: 0
                        };
                    timeline.to(container, 0.6, shiftDirection);
                    break;
                default:
                    timeline.to(container, 0.5, {
                        autoAlpha: 0
                    });
            }
            newPage.object.enter('project');
        }

        function exiting() {
            var exitPromise = new Promise(_exit);
            return exitPromise;
        }

        //events
        plansList.addEventListener('click', changeImg);
        picsList.addEventListener('click', changeImg);
        textControl.addEventListener('click', toggleText);
        // backControl.addEventListener('click', backClicked);


        //public
        return {
            init: init,
            enter: enter,
            exiting: exiting
        };

    };

    var aboutUs = function () {
        //elements
        var container = document.querySelector('.about-us'),
            content = container.querySelector('.content'),
            firstWrap = content.querySelector('.first-wrap'),
            secondWrap = content.querySelector('.second-wrap'),
            coversList = firstWrap.querySelector('.covers-list'),
            scroller = secondWrap.querySelector('.scroller'),
            tracks = scroller.querySelectorAll('.track'),
            scrollerProgress = scroller.querySelector('.progress'),
            texts = secondWrap.querySelector('.about-us-texts'),
            textItems = texts.querySelectorAll('.texts-item'),

            assocLogos = firstWrap.querySelector('.assoc-logos');

        //vars
        var numberOfTracks = tracks.length,
            currentSlide = 0,
            trackLength = 100 / numberOfTracks,
            scrollBarObj = {
                el: scrollerProgress,
                direction: 1, // 0 to 100
                progress: trackLength / 2,
                isVertical: true,
                animatable: false,
                updateSildeIndex: updateSildeIndex
            };

        //functions
        function init() {
            // _resize();
            // googleMap.setupMap(container);
        }

        function _resize() {
            _setScrollDirection();
            scrollTo(currentSlide, false);
        }

        function _setScrollDirection() {
            if (innerWidth >= 1024) {
                scrollBarObj.isVertical = true;
            } else {
                scrollBarObj.isVertical = false;
            }
        }

        function _changeSlides(index) {
            var offset = index * -100,
                translate = {
                    y: offset + '%'
                };

            if (scrollBarObj.animatable) {
                TweenLite.to(coversList, 0.6, translate);
            } else {
                TweenLite.set(coversList, translate);
            }

            //display current service's text
            TweenLite.to(textItems[currentSlide], 0.6, {
                autoAlpha: 0
            });
            TweenLite.to(textItems[index], 0.6, {
                autoAlpha: 1
            });
        }

        function _isIndexChanged(index) {
            return index !== currentSlide;
        }

        function updateSildeIndex() {
            var index = Math.floor(scrollBarObj.progress / trackLength);
            index = index == (100 / trackLength) ? index - 1 : index;
            if (_isIndexChanged(index)) {
                // console.log('change slide');
                _changeSlides(index);
            }

            currentSlide = index;
        }

        function scrollTo(index, animatable = true) {
            scrollBarObj.animatable = animatable;
            scrollBarObj.progress = index * trackLength + trackLength / 2;
            customScrolling.click(scrollBarObj);
            updateSildeIndex();
        }

        function assocLogosClicked(e) {
            if (e.target.tagName === 'IMG') {
                textItems[1].getElementsByTagName('h3')[0].innerHTML = e.target.dataset.header;
            }
        }

        function _trackSelected(event) {
            // console.log(event.target);
            var target = event.target,
                index = Array.prototype.indexOf.call(tracks, target);
            scrollTo(index);
        }

        function _wheelHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.wheelDrag(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        function _tapHandler(event) {
            customScrolling.tap(scrollBarObj, event);
        }

        function _dragHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.drag(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        function _releaseHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.release(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        //exits and enters animations for the page

        function enter(source) {
            var sectionIndex = navigaton.destination().sectionIndex,
                shiftDirection;

            _setScrollDirection();
            switch (source) {
                case 'home':
                    timeline.fromTo(secondWrap, 1, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1
                    }, 0.2);
                    break;

                case 'projects':
                case 'services':
                    shiftDirection = innerWidth >= 1024 ? {
                        x: '-50%'
                    } : {
                            y: '-50%'
                        };
                    timeline.fromTo(container, 0.6, shiftDirection, {
                        x: '0%',
                        y: '0%'
                    }, 0);
                    break;
                default:
                    timeline.fromTo(container, 1, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1
                    }, 0.2);
            }

            //shared animations
            timeline.fromTo(scrollerProgress, 1, {
                x: '0%',
                y: '0%'
            }, {
                //bug fix for chrome; a scroller's red background is not painted
                onStart: function () {
                    scrollTo(sectionIndex);
                    navigaton.destination().sectionIndex = 0;
                }
            }, '-=0.2');

        }

        function _exit(resolve, reject) {
            if (scrollBarObj.isVertical) {
                var lastProgress = {
                    y: scrollBarObj.progress + '%'
                }

            } else {
                var lastProgress = {
                    x: scrollBarObj.progress + '%'
                }
            }

            var newPage = barbaHandler.newPage(),
                destination = newPage.class,
                newContainer = newPage.containerEl;

            container.style.zIndex = 1;
            newContainer.style.zIndex = 0;
            timeline.clear();
            timeline.eventCallback('onComplete', function () {
                resolve(true);
            });

            switch (destination) {
                case 'home':
                    newContainer.style.zIndex = 2;
                    break;

                case 'projects':
                case 'services':
                    var shiftDirection = innerWidth >= 1024 ? {
                        x: '-50%',
                        opacity: 0
                    } : {
                            y: '-50%',
                            opacity: 0
                        };
                    timeline.to(container, 0.6, shiftDirection);
                    break;
                default:
                    timeline.to(container, 0.5, {
                        opacity: 0
                    });
            }
            newPage.object.enter('about-us');
        }

        function exiting() {
            var exitPromise = new Promise(_exit);
            return exitPromise;
        }

        //events
        window.addEventListener('resize', _resize);
        // content.addEventListener('wheel', _wheelHandler);
        scroller.addEventListener('click', _trackSelected);
        //enable dragging events
        content.addEventListener('touchstart', _tapHandler);
        content.addEventListener('touchmove', _dragHandler);
        content.addEventListener('touchend', _releaseHandler);
        assocLogos.addEventListener('click', assocLogosClicked);

        //public properties
        return {
            init: init,
            scrollTo: scrollTo,
            enter: enter,
            exiting: exiting
        };
    }

    var services = function () {

        //elements
        var container = document.querySelector('.services'),
            content = container.querySelector('.content'),
            firstWrap = content.querySelector('.first-wrap'),
            secondWrap = content.querySelector('.second-wrap'),
            scroller = firstWrap.querySelector('.scroller'),
            tracks = scroller.querySelectorAll('.track'),
            scrollerProgress = scroller.querySelector('.progress'),
            servTexts = firstWrap.querySelector('.services-texts'),
            textItems = servTexts.querySelectorAll('.texts-item'),
            coversList = secondWrap.querySelector('.covers-list');


        //vars
        var numberOfServices = tracks.length,
            currentSlide = 0,
            trackLength = 100 / numberOfServices,
            scrollBarObj = {
                el: scrollerProgress,
                direction: 1, // 0 to 100
                progress: trackLength / 2,
                isVertical: true,
                animatable: false,
                updateSildeIndex: updateSildeIndex
            };

        //functions
        function init() {
            // _resize();
        }

        function _resize() {
            _setScrollDirection();
            scrollTo(currentSlide, false);
        }

        function _setScrollDirection() {
            if (innerWidth >= 1024) {
                scrollBarObj.isVertical = true;
            } else {
                scrollBarObj.isVertical = false;
            }
        }

        function _changeSlides(index) {
            var offset = index * -100,
                translate = {
                    y: offset + '%'
                };

            if (scrollBarObj.animatable) {
                TweenLite.to(coversList, 0.6, translate);
            } else {
                TweenLite.set(coversList, translate);
            }

            //display current service's text
            TweenLite.to(textItems[currentSlide], 0.6, {
                autoAlpha: 0
            });
            TweenLite.to(textItems[index], 0.6, {
                autoAlpha: 1
            });
        }

        function _isIndexChanged(index) {
            return index !== currentSlide;
        }

        function updateSildeIndex() {
            var index = Math.floor(scrollBarObj.progress / trackLength);
            index = index == (100 / trackLength) ? index - 1 : index;
            if (_isIndexChanged(index)) {
                // console.log('change slide');
                _changeSlides(index);
            }

            currentSlide = index;
        }

        function scrollTo(index, animatable = true) {
            scrollBarObj.animatable = animatable;
            scrollBarObj.progress = index * trackLength + trackLength / 2;
            customScrolling.click(scrollBarObj);
            updateSildeIndex();
        }

        function _trackSelected(event) {
            var target = event.target,
                index = Array.prototype.indexOf.call(tracks, target);
            scrollTo(index);
        }

        function _wheelHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.wheelDrag(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        function _tapHandler(event) {
            customScrolling.tap(scrollBarObj, event);
        }

        function _dragHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.drag(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        function _releaseHandler(event) {
            scrollBarObj.animatable = false;
            customScrolling.release(scrollBarObj, event);
            scrollBarObj.animatable = true;
            updateSildeIndex();
        }

        //exits and enters animations for the page

        function enter(source) {
            var sectionIndex = navigaton.destination().sectionIndex,
                shiftDirection;

            _setScrollDirection();
            switch (source) {
                case 'home':
                    timeline.fromTo(firstWrap, 1, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1
                    }, 0.2);
                    break;
                case 'projects':
                    timeline.fromTo(servTexts, 0.6, {
                        opacity: 0
                    }, {
                        opacity: 1
                    }, 0);
                    break;
                case 'about-us':
                    shiftDirection = innerWidth >= 1024 ? {
                        x: '50%'
                    } : {
                            y: '50%'
                        };
                    timeline.fromTo(container, 0.6, shiftDirection, {
                        x: '0%',
                        y: '0%'
                    }, 0);
                    break;
                default:
                    timeline.fromTo(container, 1, {
                        opacity: 0
                    }, {
                        opacity: 1,
                    }, 0.2);
            }

            //shared animations
            timeline.fromTo(scrollerProgress, 1, {
                x: '0%',
                y: '0%'
            }, {
                //bug fix for chrome; a scroller's red background is not painted
                onStart: function () {
                    scrollTo(sectionIndex);
                    navigaton.destination().sectionIndex = 0;
                }
            }, '-=0.2');
        }

        function _exit(resolve, reject) {
            if (scrollBarObj.isVertical) {
                var lastProgress = {
                    y: scrollBarObj.progress + '%'
                }

            } else {
                var lastProgress = {
                    x: scrollBarObj.progress + '%'
                }
            }

            var newPage = barbaHandler.newPage();
            var destination = newPage.class;
            var newContainer = newPage.containerEl;

            container.style.zIndex = 1;
            newContainer.style.zIndex = 0;
            timeline.clear();
            timeline.eventCallback('onComplete', function () {
                resolve(true);
            });

            switch (destination) {
                case 'home':
                    newContainer.style.zIndex = 2;
                    break;

                case 'about-us':
                    var shiftDirection = innerWidth >= 1024 ? {
                        x: '50%',
                        opacity: 0
                    } : {
                            y: '50%',
                            opacity: 0
                        };
                    timeline.to(container, 0.6, shiftDirection);
                    break;

                case 'projects':
                    timeline.to(secondWrap, 0.6, {
                        y: '100%'
                    })
                        .to(servTexts, 0.6, {
                            opacity: 0
                        }, 0)
                        .fromTo(scrollerProgress, 0.6, lastProgress, {
                            x: '0%',
                            y: '0%'
                        }, 0)
                        .set(scroller, {
                            opacity: 0
                        });
                    break;

                default:
                    timeline.to(container, 0.5, {
                        opacity: 0
                    });

            }
            newPage.object.enter('services');
        }

        function exiting() {
            var exitPromise = new Promise(_exit);
            return exitPromise;
        }

        //events
        window.addEventListener('resize', _resize);
        // content.addEventListener('wheel', _wheelHandler);
        scroller.addEventListener('click', _trackSelected);
        //enable dragging events
        content.addEventListener('touchstart', _tapHandler);
        content.addEventListener('touchmove', _dragHandler);
        content.addEventListener('touchend', _releaseHandler);

        return {
            init: init,
            scrollTo: scrollTo,
            enter: enter,
            exiting: exiting
        };
    };

    //################### barba handler ###################//
    var barbaHandler = (function () {
        //variables
        var newPage = {
            pathname: undefined,
            containerEl: undefined,
            object: undefined,
            class: undefined
        },
            oldPage;

        //methods

        function _getPageObject(className) {
            switch (className) {
                case 'home':
                    newPageObj = home();
                    break;
                case 'projects':
                    newPageObj = projects();
                    break;
                case 'catalog':
                    newPageObj = catalog();
                    break;

                case 'project':
                    newPageObj = project();
                    break;
                case 'about-us':
                    newPageObj = aboutUs();
                    break;
                case 'services':
                    newPageObj = services();

            }

            return newPageObj;
        }

        //event handler whenever the new page is loaded but not yet removed the old page
        function _newPageHandler(currentStatus, oldStatus, newContainer, newRawHtml) {
            // console.log('New page is ready.');
            //make it visible immediately after being loaded
            newContainer.style.visibility = 'visible';
            //update newPage object
            var pathArray = window.location.pathname.split('/'); // /pathname1/pathname2/ -> split -> array["", "pathname1", "pathname2", ""]
            newPage.pathname = pathArray[pathArray.length - 2];
            newPage.containerEl = newContainer;
            newPage.class = newContainer.classList.item(1);
            newPage.object = _getPageObject(newPage.class);
        }

        function _enterFirstPage() {
            newPage.object.enter();
        }

        function disableEvents() {
            document.body.style.pointerEvents = 'none';
        }

        function enableEvents() {
            document.body.style.pointerEvents = 'auto';
        }

        //after exit transition is completed, or after first page is loaded.
        function _initNewPage() {
            // console.log('Initializing new page ...');
            //disable any events during animation
            timeline.eventCallback('onStart', disableEvents);
            //if this is the first page, begin animation sequence for entering
            if (!oldPage) {
                //since _start and _finish cannot be called
                timeline.eventCallback('onComplete', enableEvents);
                _enterFirstPage();
            }
            newPage.object.init();
            //performing deep copy of newPage to oldPage, that is copying value not the reference.
            // oldPage = JSON.parse(JSON.stringify(newPage));
            //performing shallow copy, that is copying by value for the object but inner objects such as newPage.object is copied by reference
            oldPage = Object.assign({}, newPage);
        };

        function _oldPageTransition() {
            // console.log('Exiting from the old page ...');
            //disable any events during animation
            // document.body.style.pointerEvents = 'none';
            //when the exit animation is finished, remove the old page
            var exitPromise = oldPage.object.exiting();
            exitPromise.then(this.finish.bind(this));
        }

        function _start() {
            // console.log('Downloading new page ...');
            //exit from the old page when new page is loaded
            this.newContainerLoading.then(_oldPageTransition.bind(this));
        }

        function _finish() {
            // console.log('Done. Removing the old page');
            //enable any events after animation
            document.body.style.pointerEvents = 'auto';
            timeline.eventCallback('onStart', null);
            timeline.eventCallback('onComplete', null);
            this.done();
        }

        //binding events
        document.addEventListener('DOMContentLoaded', _init);
        // Barba.Dispatcher.on('linkClicked', _linkClickedHandler)
        Barba.Dispatcher.on('newPageReady', _newPageHandler);
        //init the new page after the old page removed from DOM
        Barba.Dispatcher.on('transitionCompleted', _initNewPage);

        //declare and initialize exit transition
        var exitTransition = Barba.BaseTransition.extend({
            start: _start,
            finish: _finish
        });
        //let barba know that we want to use the transition created above
        Barba.Pjax.getTransition = function () {
            return exitTransition;
        };

        //init
        function _init() {
            // console.log('barba start ---');
            // workView.init();
            Barba.Pjax.start();
        }

        return {
            oldPage: function () {
                return oldPage;
            },
            newPage: function () {
                return newPage;
            }
        }
    })();
})();


/*
################# google maps api #################
*/
var googleMap = (function () {
    function _loadGoogleMaps(apiKey, container) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "googleMaps";

        if (apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&callback=googleMap.initMap';
            // script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=googleMap.initMap'
        } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=googleMap.initMap';
        }
        container.appendChild(script);
    }

    function _GoogleMapInit(key, container) {
        if (key != null) {
            apiKey = key;
        }

        _loadGoogleMaps(apiKey, container);
    }

    function initMap() {
        var uluru = {
            lat: 21.684872,
            lng: 39.117968
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center: uluru,
            disableDefaultUI: true,
            styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }]
            },
            {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ff2600"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#f5f5f5"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ff2600"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ff2600"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#d6d6d6"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ff2600"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e5e5e5"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ff2600"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ff2600"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dadada"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ff2600"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ff2600"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#929292"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ff2600"
                }]
            }
            ]
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            title: 'Click here to view this location on Google Maps',
            url: 'https://goo.gl/maps/5hAC5cjdNYR2'
        });

        //create event listener for marker
        google.maps.event.addListener(marker, 'click', function () {
            window.open(marker.url);
        });

    }

    function setupMap(container) {
        // var key = 'AIzaSyAOqDYy33abZE1zVz8Q2PP5supXT78x82U';
        var key = 'AIzaSyAgoCLpactDY9ZTtMoIp74V4WxbwknDFcg';
        //if google maps api does not exist, load it and initialize the map
        //otherwise, just initialize the map
        if (typeof google !== 'object' || typeof google.maps !== 'object') {
            _GoogleMapInit(key, container);
        } else {
            initMap();
        }

    }

    return {
        setupMap: setupMap,
        initMap: initMap
    }
})();