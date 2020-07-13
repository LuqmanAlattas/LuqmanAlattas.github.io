//################### general ###################//
window.addEventListener('load', function () {
    document.querySelector('.nav-burger').addEventListener('click', function () {
        this.classList.toggle('active');
    });
    document.querySelector('.navigation').addEventListener('click', function () {
        document.querySelector('.nav-burger').classList.remove('active');
    });
});
//################### home ###################//
var homeApp = {
    init: function () {
        this.timeline = new TimelineLite();

        this.addListeners();
        this.enter();
    },
    defaultEnter: function () {
        this.timeline.set(['body', '.project-text-wrap', '.project-wrap', '.featured-projects-wrap > h1'], {
            autoAlpha: 0
        })
            .to('body', 0.5, {
                autoAlpha: 1
            }, '+=0.5')
            .to(['.project-wrap', '.featured-projects-wrap > h1'], 1, {
                autoAlpha: 1,
                clearProps: 'all'
            }, '+=0.5')
            .to('.project-text-wrap', 1, {
                autoAlpha: 1,
                clearProps: 'all'
            });
    },
    enter: function () {
        var start;
        switch (clickTarget) {
            case 'back':
            case 'fromNav':
                this.timeline.set(['.project-text-wrap', '.project-wrap', '.featured-projects-wrap > h1'], {
                    autoAlpha: 0
                })
                    .to(['.project-wrap', '.featured-projects-wrap > h1'], 1, {
                        autoAlpha: 1,
                        clearProps: 'all'
                    })
                    .to('.project-text-wrap', 1, {
                        autoAlpha: 1,
                        clearProps: 'all'
                    });
                break;
            default:
                this.defaultEnter();

        }
    },
    exit: function () {
        return new Promise(function (resolve, reject) {
            this.timeline.clear();

            switch (clickTarget) {
                case 'fromHomeToProjectInfo':
                    if (innerWidth <= 1023) {
                        this.timeline.to('.project-text-wrap', 0.5, { autoAlpha: 0 })
                            .to('.project-wrap', 0.3, { borderBottomColor: 'transparent' }, 0)
                            .to('.featured-projects-wrap', 0.3, { padding: '0px' }, '-=0.5')
                            .to('.featured-image-wrap', 0.5, { height: '60%' }, '-=0.3')
                            .to('.cover', 0.3, { y: '50%' }, '-=0.5');

                    } else {
                        this.timeline.to('.project-text-wrap', 0.5, { autoAlpha: 0 })
                            .to('.project-wrap', 0.3, { borderBottomColor: 'transparent' }, 0)
                            .to('.cover', 0.6, { x: '0%', ease: Power1.easeIn }, '-=0.5')
                    }
                    break;
                default:
                    this.timeline.to(['.project-wrap', '.featured-projects-wrap > h1'], 0.5, {
                        autoAlpha: 0
                    });
            }

            this.timeline.eventCallback('onComplete', function () {
                resolve(true);
            });
        }.bind(this));
    },
    addListeners: function () {

    },
    removeListeners: function () {

    }
};
//################### about ###################//
var aboutApp = {
    init: function () {
        this.timeline = new TimelineLite();
        this.enter();
    },
    enter: function () {
        switch (clickTarget) {
            case 'back':
            default:
                this.timeline.to('#right-skewed-background', 0.7, { className: '+=reveal', clearProps: 'all' })
        }
        this.timeline.to('.text-wrapper', 0.5, {
            autoAlpha: 1
        });
    },
    exit: function () {
        return new Promise(function (resolve, reject) {
            this.timeline.clear();
            switch (clickTarget) {
                case 'back':
                default:
                    this.timeline.to('.text-wrapper', 0.3, { autoAlpha: 0 })
                        .to('#right-skewed-background', 0.7, { className: '-=reveal' }, 0);
            }
            this.timeline.eventCallback('onComplete', function () {
                resolve(true);
            });
        }.bind(this));
    },
    addListeners: function () {

    },
    removeListeners: function () {
    }
};
//################### contact ###################//
var contactApp = {
    init: function () {
        this.timeline = new TimelineLite();
        //---- Google Map API -----//
        var key = 'AIzaSyAgoCLpactDY9ZTtMoIp74V4WxbwknDFcg',
            apiKey;

        function loadGoogleMaps() {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.id = "googleMaps";

            if (apiKey) {
                script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&callback=contactApp.initMap';
            } else {
                script.src = 'http://maps.google.com/maps/api/js?callback=contactApp.initMap';
            }
            document.querySelector('.contact').appendChild(script);
        }

        function GoogleMapInit(key) {
            if (key != null) {
                apiKey = key;
            }

            loadGoogleMaps();
        }

        //if google maps api does not exist, load it and initialize the map
        //otherwise, just initialize the map
        if (typeof google !== 'object' || typeof google.maps !== 'object') {
            GoogleMapInit(key);
        } else {
            this.initMap();
        }

    },
    initMap: function () {
        var uluru = {
            lat: 21.56911,
            lng: 39.163324
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: uluru,
            disableDefaultUI: true,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                    ]
                }
            ]
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            title: 'Click here to view this location on Google Maps',
            url: 'https://goo.gl/maps/TkvvpYgWqtt'
        });

        //create event listener for marker
        google.maps.event.addListener(marker, 'click', function () {
            window.open(marker.url);
        });

        //event listner executed once after the map has loaded
        google.maps.event.addListenerOnce(map, 'idle', this.enter.bind(this));
    },
    enter: function () {
        switch (clickTarget) {
            case 'back':
            default:
                this.timeline.to('#right-skewed-background', 0.7, { className: '+=reveal', clearProps: 'all' })
        }
        this.timeline.to('.text-wrapper', 0.5, {
            autoAlpha: 1
        });
    },
    exit: function () {
        return new Promise(function (resolve, reject) {
            this.timeline.clear();
            switch (clickTarget) {
                case 'back':
                default:
                    this.timeline.to('.text-wrapper', 0.3, { autoAlpha: 0 })
                        .to('#right-skewed-background', 0.7, { className: '-=reveal' }, 0);
            }
            this.timeline.eventCallback('onComplete', function () {
                resolve(true);
            });
        }.bind(this));
    },
    addListeners: function () {

    },
    removeListeners: function () {

    }
};
//################### projects ###################//
var projectsApp = {
    init: function () {
        this.container = document.querySelector('.projects-container');
        this.wrapper = document.querySelector('.projects-wrapper');
        this.list = document.querySelector('.projects-list');
        this.projects = document.querySelectorAll('.project-item');
        this.navProgress = document.querySelector('.progress-nav');
        this.progressBar = document.querySelector('.progress-nav span');

        this.start = 0;

        //calculate the number of projects off screen
        this.invisibleProjectsNum = this.projects.length - 3;
        //calculate maximum horizontal scrolling offset
        this.end = this.invisibleProjectsNum < 0 ? 0 : parseFloat(getComputedStyle(this.list).width, 10) * (0.35 * this.invisibleProjectsNum + 0.05);
        //calculate maximum horizontal scrolling offset for progress bar
        this.barEnd = parseFloat(getComputedStyle(this.navProgress).width, 10) - parseInt(getComputedStyle(this.progressBar).width, 10);
        this.progress = this.start;
        this.barProgress = this.start;

        this.firstTouch = this.start;
        this.lastTouch = this.firstTouch;
        this.pressed = false;
        this.barPressed = false;

        this.velocity = 1;
        this.ticker;
        this.amplitude = 0;
        this.frame;
        this.timestamp;
        this.target;
        this.animationFrameNumber;
        this.isEnabled = false;

        this.timeline = new TimelineLite();
        this.addListeners();
        this.setup();
        this.enter();
    },
    setup: function () {
        if (innerWidth > 1023) {
            this.end = this.invisibleProjectsNum < 0 ? 0 : parseFloat(getComputedStyle(this.list).width, 10) * (0.35 * this.invisibleProjectsNum + 0.05);

            this.barEnd = parseFloat(getComputedStyle(this.navProgress).width, 10) - parseInt(getComputedStyle(this.progressBar).width, 10);
            if (!this.isEnabled) {
                this.enableHorizontalScorlling();
            }

        } else {
            this.end = 0;
            this.disableHorizontalScorlling();
        }
        this.scroll(this.progress);
    },
    xPos: function (event) {
        //touch event
        if (event.targetTouches && (event.targetTouches.length >= 1)) {
            return event.targetTouches[0].clientX;
        }

        //mouse event
        return event.clientX;
    },
    scroll: function (x) {
        var progressPercentage;
        this.progress = x > this.end ? this.end : x < this.start ? this.start : x;
        this.list.style.transform = 'translateX(' + (-this.progress) + 'px)';

        progressPercentage = this.progress / this.end;
        this.barProgress = progressPercentage * this.barEnd;
        this.progressBar.style.transform = 'translateX(' + this.barProgress + 'px)';
    },
    barSCroll: function (barX) {
        var progressPercentage;
        this.barProgress = barX > this.barEnd ? this.barEnd : barX < 0 ? 0 : barX;
        this.progressBar.style.transform = 'translateX(' + (this.barProgress) + 'px)';

        progressPercentage = this.barProgress / this.barEnd;
        this.progress = progressPercentage * this.end;
        this.list.style.transform = 'translateX(' + (-this.progress) + 'px)';

    },
    autoScroll: function () {
        var elapsed, delta;
        if (this.amplitude) {
            elapsed = Date.now() - this.timestamp;
            delta = -this.amplitude * Math.exp(-elapsed / 325);
            if (delta > 0.5 || delta < -0.5) {
                this.scroll(this.target + delta);
                this.animationFrameNumber = requestAnimationFrame(this.autoScroll.bind(this));
            } else {
                this.scroll(this.target);
            }
        }
    },
    track: function () {
        var now, elapsed, delta, v;
        now = Date.now();
        elapsed = now - this.timestamp;
        this.timestamp = now;

        delta = this.progress - this.frame;
        this.frame = this.progress;

        v = 500 * delta / (0 + elapsed);
        this.velocity = 0.8 * v + 0.2 * this.velocity;
    },
    tap: function (event) {

        if (event.target !== this.progressBar) {
            this.pressed = true;
            this.firstTouch = this.xPos(event);
            this.lastTouch = this.firstTouch;

            //to calculate velocity
            this.velocity = this.amplitude = 0;
            this.frame = this.progress;
            this.timestamp = Date.now();
            //        clearInterval(ticker);
            //        ticker = setInterval(track, 100);
        } else {
            this.barPressed = true;
            this.lastTouch = this.xPos(event);
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
    },
    release: function (event) {

        if (this.pressed || this.barPressed) {
            //        clearInterval(ticker);
            this.track();
            if (this.velocity > 10 || this.velocity < -10) {
                this.amplitude = 0.8 * this.velocity;
                this.target = Math.round(this.progress + this.amplitude);
                this.timestamp = Date.now();
                this.animationFrameNumber = requestAnimationFrame(this.autoScroll.bind(this));
            }
        }

        this.barPressed = false;
        this.pressed = false;
        event.preventDefault();
        event.stopPropagation();
        return false;
    },
    drag: function (event) {
        var x, delta;
        if (this.pressed) {
            x = this.xPos(event); //get latest touch x position
            delta = this.lastTouch - x;
            // simple threshold of 2px to prevent jittering due to some micromovements
            if (delta > 2 || delta < -2) {
                this.lastTouch = x;
                this.scroll(delta + this.progress);
            }
        } else if (this.barPressed) {
            x = this.xPos(event);
            delta = x - this.lastTouch;

            if (delta > 2 || delta < -2) {
                this.lastTouch = x;
                this.barSCroll(delta + this.barProgress);
            }
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
    },
    wheelDrag: function (event) {
        cancelAnimationFrame(this.animationFrameNumber);
        var delta = event.deltaY || event.deltaX;
        this.scroll(delta + this.progress);
        event.preventDefault();
        event.stopPropagation();
        return false;
    },
    click: function (event) {
        //if it is a drag
        if (this.firstTouch !== this.lastTouch) {
            event.preventDefault();
            event.stopPropagation();
        }
    },
    enableHorizontalScorlling: function () {
        //keep references to these handlers in order to be able to remove the listeners later
        this.tapHandler = this.tap.bind(this);
        this.dragHandler = this.drag.bind(this);
        this.releaseHandler = this.release.bind(this);
        this.wheelDragHandler = this.wheelDrag.bind(this);
        this.clickHandler = this.click.bind(this);

        //enable horizontal scrolling
        if (typeof this.wrapper.ontouchstart !== 'undefined') {
            this.wrapper.addEventListener('touchstart', this.tapHandler);
            this.wrapper.addEventListener('touchmove', this.dragHandler);
            this.wrapper.addEventListener('touchend', this.releaseHandler);
        }
        this.wrapper.addEventListener('mousedown', this.tapHandler);
        this.wrapper.addEventListener('mousemove', this.dragHandler);
        this.wrapper.addEventListener('mouseup', this.releaseHandler);
        this.wrapper.addEventListener('wheel', this.wheelDragHandler);
        this.wrapper.addEventListener('click', this.clickHandler, true);

        //progress bar
        this.progressBar.addEventListener('mousedown', this.tapHandler);
        this.progressBar.addEventListener('mousemove', this.dragHandler);
        this.progressBar.addEventListener('mouseup', this.releaseHandler);

        this.isEnabled = true;
    },
    disableHorizontalScorlling: function () {
        //disable horizontal scrolling
        if (typeof this.wrapper.ontouchstart !== 'undefined') {
            this.wrapper.removeEventListener('touchstart', this.tapHandler);
            this.wrapper.removeEventListener('touchmove', this.dragHandler);
            this.wrapper.removeEventListener('touchend', this.releaseHandler);
        }
        this.wrapper.removeEventListener('mousedown', this.tapHandler);
        this.wrapper.removeEventListener('mousemove', this.dragHandler);
        this.wrapper.removeEventListener('mouseup', this.releaseHandler);
        this.wrapper.removeEventListener('wheel', this.wheelDragHandler);
        this.wrapper.removeEventListener('click', this.clickHandler, true);

        this.isEnabled = false;
    },
    addListeners: function () {
        this.resizeHandler = this.setup.bind(this);
        window.addEventListener('resize', this.resizeHandler);
        if (this.end !== 0) {
            this.enableHorizontalScorlling();
        } else {
            this.navProgress.style.display = 'none';
        }
    },
    removeListeners: function () {
        window.addEventListener('resize', this.resizeHandler);
        this.disableHorizontalScorlling();
    },
    enter: function () {
        this.timeline.set('.progress-nav', { autoAlpha: '0' })
            .staggerTo('.project-item', 1, {
                className: '+=shown',
                clearProps: 'all'
            }, 0.2)
            .to('.progress-nav', 0.5, { autoAlpha: '1', clearProps: 'all' }, 0);
    },
    exit: function () {
        return new Promise(function (resolve, reject) {
            this.timeline.clear();

            switch (clickTarget) {
                case 'fromProjectsToProjectInfo':
                    if (innerWidth <= 1023) {
                        //create additional empty item so the last item can be positioned to top
                        // of the page when scrolling to it
                        var emptyItem = document.createElement('li');
                        emptyItem.className = 'project-item';
                        emptyItem.style.height = '100vh';
                        this.list.appendChild(emptyItem);

                        this.timeline
                            .set('.project-item:not(#selected)', { className: '-=shown' })
                            .set('#selected .content', { transition: 'all 0s ease 0s' })
                            .to('#selected .content', 0.7, { opacity: 0 })
                            .to('#selected', 0.7, { height: '60vh' }, 0)
                            .to(this.wrapper, 0.7, { scrollTo: '#selected', ease: Power2.easeInOut }, 0)
                            .to('#selected .cover', 0.3, { y: '83%' }, 0.5);

                    } else {
                        var arr = Array.prototype.slice.call(this.projects);
                        var index = arr.indexOf(document.getElementById('selected')) + 1;

                        this.timeline.set('.content', { transition: 'all 0s ease 0s' })
                            .to('.project-item:not(#selected)', 1, { className: '-=shown' })
                            .to(['.progress-nav', '#selected .content'], 0.3, { autoAlpha: '0' }, 0)
                            .to('.projects-wrapper', 1, { left: 0, width: '100%', ease: Power1.easeInOut }, 0)
                            .to('.projects-list', 1, { top: 0, height: '100%', x: (100 - (index * 35 + 20)) + '%', ease: Power1.easeInOut }, 0)
                            .to('#selected', 1, { paddingTop: '148px', width: '55%', ease: Power1.easeInOut }, 0)
                            .to('#selected .cover', 0.5, { x: '-95%' }, 0);
                    }
                    break;
                default:
                    this.timeline.to('.project-item', 1, { className: '-=shown' })
                        .to('.progress-nav', 0.5, { autoAlpha: '0' }, 0);
            }

            this.timeline.eventCallback('onComplete', function () {
                resolve(true);
            });
        }.bind(this));
    }
};
//################### projectInfo ###################//
var projectInfoApp = {
    init: function () {
        this.content = document.querySelector('.text-content');
        this.images = document.querySelectorAll('.project-imgs-wrap img');
        this.nextBtn = document.querySelector('.next');
        this.imageBars = document.querySelectorAll('.images-nav .bar');
        this.currentIndex = 0;
        this.timeline = new TimelineLite();

        this.addListeners();
        this.enter();
    },
    changeImage: function (index) {
        document.querySelector('.shown').classList.remove('shown');
        this.images.item(index).classList.add('shown');

        document.querySelector('.selected').classList.remove('selected');
        this.imageBars.item(index).classList.add('selected');

        this.currentIndex = index;
    },
    nextImage: function () {
        this.changeImage((this.currentIndex + 1) % this.images.length);
    },
    enter: function () {
        switch (clickTarget) {
            case 'fromHomeToProjectInfo':
                if (innerWidth <= 1023) {
                    this.timeline.set('#right-skewed-background', { className: '+=reveal', clearProps: 'all' });
                } else {
                    this.timeline.to('#right-skewed-background', 0.7, { x: '105%' })
                        .set('#right-skewed-background', { className: '+=reveal', clearProps: 'all' });
                }
                break;
            case 'fromProjectsToProjectInfo':
                this.timeline.set('#right-skewed-background', { className: '+=reveal', clearProps: 'all' });
                break;
            default:
                this.timeline.to('#right-skewed-background', 0.7, { className: '+=reveal', clearProps: 'all' })
        }
        this.timeline.to('.text-wrapper', 0.5, {
            autoAlpha: 1
        });
    },
    exit: function () {
        return new Promise(function (resolve, reject) {
            this.timeline.clear();
            switch (clickTarget) {
                case 'back':
                default:
                    this.timeline.to('.text-wrapper', 0.3, { autoAlpha: 0 })
                        .to('#right-skewed-background', 0.7, { className: '-=reveal' }, 0);
            }
            this.timeline.eventCallback('onComplete', function () {
                resolve(true);
            });
        }.bind(this));
    },
    addListeners: function () {
        this.barHandlers = [];
        this.nextBtn.addEventListener('click', this.nextImage.bind(this));
        this.imageBars.forEach(this.addImageBarClickEvent.bind(this));
    },
    addImageBarClickEvent: function (elem, index) {
        this.barHandlers[index] = this.changeImage.bind(this, index);
        elem.addEventListener('click', this.barHandlers[index]);
    },
    removeListeners: function () {
        this.nextBtn.removeEventListener('click', this.nextImage);
        this.imageBars.forEach(this.removeImageBarClickEvent.bind(this));

    },
    removeImageBarClickEvent: function (elem, index) {
        elem.removeEventListener('click', this.barHandlers[index]);
    }
};


//barba initialization
var currentApp;
var clickTarget;
document.addEventListener('DOMContentLoaded', function () {
    // console.log('barba start ---');
    Barba.Pjax.start();
});

//event handler whenever the new content loaded but not yet removed the old container
Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, newContainer, newRawHtml) {
    // console.log('new content ready');
    if (currentApp) {
        currentApp.removeListeners();
    }

    if (newContainer.classList.contains('home')) {
        currentApp = homeApp;
    } else if (newContainer.classList.contains('about')) {
        currentApp = aboutApp;
    } else if (newContainer.classList.contains('architecture')) {
        currentApp = projectsApp;
    } else if (newContainer.classList.contains('interior')) {
        currentApp = projectsApp;
    } else if (newContainer.classList.contains('micro-architecture')) {
        currentApp = projectsApp;
    } else if (newContainer.classList.contains('graphic-identities')) {
        currentApp = projectsApp;
    } else if (newContainer.classList.contains('wayfinding')) {
        currentApp = projectsApp;
    } else if (newContainer.classList.contains('contact')) {
        currentApp = contactApp;
    } else if (newContainer.classList.contains('project-info')) {
        currentApp = projectInfoApp;
    }

    selectNavItem(newContainer.classList);
});

function selectNavItem(classList) {
    var sections = document.querySelectorAll('.sections-list li');
    var activeSection = document.querySelector('.on');

    activeSection.classList.remove('on');
    if (classList.contains('home')) {
        sections[0].classList.add('on');
    } else if (classList.contains('about')) {
        sections[1].classList.add('on');
    } else if (classList.contains('architecture') || classList.contains('arch-proj')) {
        sections[2].classList.add('on');
    } else if (classList.contains('interior') || classList.contains('interior-proj')) {
        sections[3].classList.add('on');
    } else if (classList.contains('micro-architecture') || classList.contains('micro-arch-proj')) {
        sections[4].classList.add('on');
    } else if (classList.contains('graphic-identities') || classList.contains('graph-proj')) {
        sections[5].classList.add('on');
    } else if (classList.contains('wayfinding') || classList.contains('wayfinding-proj')) {
        sections[6].classList.add('on');
    } else if (classList.contains('contact')) {
        sections[7].classList.add('on');
    }
}

//barba any link click listener (except for links to other domains)
Barba.Dispatcher.on('linkClicked', function (target, event) {
    // console.log('link clicked');

    // via navigation
    if (target.classList.contains('section-item')) {
        clickTarget = 'fromNav';
    } else if (target.classList.contains('project-wrap')) {
        clickTarget = 'fromHomeToProjectInfo';
    } else if (target.parentElement.classList.contains('project-item')) {
        clickTarget = 'fromProjectsToProjectInfo';
        target.parentElement.id = 'selected';
    }
});

//declare and initialize exit transition
var exitTransition = Barba.BaseTransition.extend({
    start: function () {
        // console.log('downloading new content...');
        var oldApp = currentApp;
        //        Promise.all([this.newContainerLoading, currentApp.exit()]).then(this.finish.bind(this));
        this.newContainerLoading.then(function () {
            // console.log('exiting the old content...');
            document.body.style.pointerEvents = 'none';
            var appExiting = oldApp.exit();
            appExiting.then(this.finish.bind(this));
        }.bind(this));
    },
    finish: function () {
        // console.log('done');
        this.done();
    }
});

//let barba know that we want use the transition created above
Barba.Pjax.getTransition = function () {
    return exitTransition;
};

//init the new page after the old page removed from DOM
Barba.Dispatcher.on('transitionCompleted', function () {
    // console.log('transition completed');
    document.body.style.pointerEvents = 'auto';
    currentApp.init();
    clickTarget = "back";
});
