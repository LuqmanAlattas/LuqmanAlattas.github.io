//################### general ###################//
var app = (function () {
    //elements
    var logo = document.querySelector('.logo'),
        navBurger = document.querySelector('.nav-burger'),
        nav = document.querySelector('.navigation'),
        sections = nav.querySelectorAll('.sections-list li');


    //variables
    var timeline = new TimelineLite();

    //methods
    function _toggleNavMenu() {
        navBurger.classList.toggle('active');
    }

    function _hideNavMenu() {
        navBurger.classList.remove('active');
    }

    function setActiveNavItem(classList) {
        var activeSection = nav.querySelector('.on');

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

    //binding events
    navBurger.addEventListener('click', _toggleNavMenu);
    nav.addEventListener('click', _hideNavMenu);

    return {
        timeline: timeline,
        setActiveNavItem: setActiveNavItem
    }
})();

//################### home ###################//
var home = (function () {
    //elements
    var body, header, projectWrap, imageWrap, textWrap, cover;

    //methods
    function _initElements() {
        body = document.body;
        header = document.querySelector('.featured-projects-wrap > h1');
        projectWrap = document.querySelector('.project-wrap');
        imageWrap = document.querySelector('.featured-image-wrap');
        textWrap = document.querySelector('.project-text-wrap');
        cover = document.querySelector('.cover');
    }

    function _renderContentFromNav() {
        app.timeline.set([header, projectWrap, textWrap], { autoAlpha: 0 })
            .to([projectWrap, header], 1, { autoAlpha: 1, clearProps: 'all' })
            .to(textWrap, 1, { autoAlpha: 1, clearProps: 'all' });
    }

    function _renderContent() {
        app.timeline.set([body, header, projectWrap, textWrap], { autoAlpha: 0 })
            .to(body, 0.5, { autoAlpha: 1 }, '+=0.5')
            .to([projectWrap, header], 1, { autoAlpha: 1, clearProps: 'all' }, '+=0.5')
            .to(textWrap, 1, { autoAlpha: 1, clearProps: 'all' });
    }

    function _load() {
        var origin = barbaHandler.getOrigin();
        switch (origin) {
            case 'navigation':
                _renderContentFromNav();
                break;
            default:
                _renderContent();

        }
    }

    function _renderExitToProjectInfo() {
        if (innerWidth <= 1023) {
            app.timeline.to(textWrap, 0.5, { autoAlpha: 0 })
                .to(projectWrap, 0.3, { borderBottomColor: 'transparent' }, 0)
                .to(projectWrap, 0.3, { padding: '0px' }, '-=0.5')
                .to(imageWrap, 0.5, { height: '60%' }, '-=0.3')
                .to(cover, 0.3, { y: '50%' }, '-=0.5');

        } else {
            app.timeline.to(textWrap, 0.5, { autoAlpha: 0 })
                .to(projectWrap, 0.3, { borderBottomColor: 'transparent' }, 0)
                .to(cover, 0.6, { x: '0%', ease: Power1.easeIn }, '-=0.5');
        }
    }

    function _renderExit() {
        app.timeline.to([projectWrap, header], 0.5, { autoAlpha: 0 });
    }

    function _exit(resolve, reject) {
        var destination = barbaHandler.getDest();
        app.timeline.clear();
        app.timeline.eventCallback('onComplete', function () { resolve(true); });

        switch (destination) {
            case 'projectInfo':
                _renderExitToProjectInfo();
                break;
            default:
                _renderExit();
        }
    }

    function exiting() {
        var exitPromise = new Promise(_exit);
        return exitPromise;
    }

    //init
    function init() {
        _initElements();
        _load();
    }

    return {
        init: init,
        exiting: exiting
    }

})();

//################### about ###################//
var about = (function () {
    //elements
    var rightBackground, textWrap;

    //methods
    function _initElements() {
        rightBackground = document.getElementById('right-skewed-background');
        textWrap = document.querySelector('.text-wrapper');
    }

    function _renderContent() {
        app.timeline.to(rightBackground, 0.7, { className: '+=reveal', clearProps: 'all' })
            .to(textWrap, 0.5, { autoAlpha: 1 });
    }

    function _renderExit() {
        app.timeline.to(textWrap, 0.3, { autoAlpha: 0 })
            .to(rightBackground, 0.7, { className: '-=reveal' }, 0);
    }

    function _exit(resolve, reject) {
        app.timeline.clear();
        app.timeline.eventCallback('onComplete', function () { resolve(true); });
        _renderExit();

    }

    function exiting() {
        var exitPromise = new Promise(_exit);
        return exitPromise;
    }

    //init
    function init() {
        _initElements();
        _renderContent();
    }

    return {
        init: init,
        exiting: exiting
    }
})();

//################### contact ###################//
var contact = (function () {
    //elements
    var contentContainer, rightBackground, textWrap, mapEl;

    //variables
    var key, apiKey;

    //methods
    function _initElements() {
        contentContainer = document.querySelector('.contact');
        rightBackground = contentContainer.querySelector('#right-skewed-background');
        mapEl = contentContainer.querySelector('#map');
        textWrap = contentContainer.querySelector('.text-wrapper');
        key = 'AIzaSyAgoCLpactDY9ZTtMoIp74V4WxbwknDFcg';
    }

    function initMap() {
        var uluru = {
            lat: 21.56911,
            lng: 39.163324
        };


        var map = new google.maps.Map(mapEl, {
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
        google.maps.event.addListenerOnce(map, 'idle', _renderContent);
    }

    function _loadGoogleMaps() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "googleMaps";

        if (apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&callback=contact.initMap';
        } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=contact.initMap';
        }
        contentContainer.appendChild(script);
    }

    function _initGoogleMap(key) {
        if (key != null) {
            apiKey = key;
        }
        _loadGoogleMaps();
    }

    function _renderContent() {
        app.timeline.to(rightBackground, 0.7, { className: '+=reveal', clearProps: 'all' })
            .to(textWrap, 0.5, { autoAlpha: 1 });
    }

    function _renderExit() {
        app.timeline.to(textWrap, 0.3, { autoAlpha: 0 })
            .to(rightBackground, 0.7, { className: '-=reveal' }, 0);
    }

    function _exit(resolve, reject) {
        app.timeline.clear();
        app.timeline.eventCallback('onComplete', function () { resolve(true); });
        _renderExit();

    }

    function exiting() {
        var exitPromise = new Promise(_exit);
        return exitPromise;
    }

    //init
    function init() {
        _initElements();
        //if google maps api does not exist, load it and initialize the map
        //otherwise, just initialize the map
        if (typeof google !== 'object' || typeof google.maps !== 'object') {
            _initGoogleMap(key);
        } else {
            initMap();
        }
    }

    return {
        init: init,
        exiting: exiting,
        initMap: initMap
    }
})();

//################### projects ###################//
var projects = (function () {
    //elements
    var projectsContainer, projectsWrap, projectsList, projectsItems, progressNav, bar;
    //variables
    var invisibleProjLength, start, end, barEnd, progress, barProgress;
    //variables for scrolling/dragging events
    var firstTouch, lastTouch, pressed, barPressed;
    //variables for velocity
    var velocity, ticker, amplitude, frame, timestamp, target, animationFrameNumber, isEnabled;

    //methods
    function _initElements() {
        projectsContainer = document.querySelector('.projects-container');
        projectsWrap = projectsContainer.querySelector('.projects-wrapper');
        projectsList = projectsWrap.querySelector('.projects-list');
        projectsItems = projectsList.querySelectorAll('.project-item');
        progressNav = projectsContainer.querySelector('.progress-nav');
        bar = progressNav.querySelector('.progress-nav span');

        //calculate the number of projects off screen
        invisibleProjLength = projectsItems.length - 3;
        start = 0;
        //calculate maximum horizontal scrolling offset
        end = invisibleProjLength < 0 ? 0 : parseFloat(getComputedStyle(projectsList).width, 10) * (0.35 * invisibleProjLength + 0.05);
        //calculate maximum horizontal scrolling offset for progress bar
        barEnd = parseFloat(getComputedStyle(progressNav).width, 10) - parseInt(getComputedStyle(bar).width, 10);
        progress = start;
        barProgress = start;

        firstTouch = start;
        lastTouch = firstTouch;
        pressed = false;
        barPressed = false;

        velocity = 1;
        amplitude = 0;
        isEnabled = false;
    }

    function _setup() {
        if (innerWidth > 1023) {
            end = invisibleProjLength < 0 ? 0 : parseFloat(getComputedStyle(projectsList).width, 10) * (0.35 * invisibleProjLength + 0.05);

            barEnd = parseFloat(getComputedStyle(progressNav).width, 10) - parseInt(getComputedStyle(bar).width, 10);
            if (!isEnabled) {
                _enableHorizontalScorlling();
            }
        } else {
            end = 0;
            _disableHorizontalScorlling();
        }
        _scroll(progress);
    }

    function setSelectedProject(target) {
        target.parentElement.id = 'selected';
    }

    function _renderExit() {
        app.timeline.to(projectsItems, 1, { className: '-=shown' })
            .to(progressNav, 0.5, { autoAlpha: '0' }, 0);
    }

    function _renderExitToProjectInfo() {
        var selected = projectsList.querySelector('#selected'),
            selectedCover = selected.querySelector('.cover'),
            selectedContent = selected.querySelector('.content'),
            notSelectedProjs = projectsList.querySelectorAll('.project-item:not(#selected)'),
            projectsContents = projectsList.querySelectorAll('.content');

        app.timeline.set(projectsList, { transition: 'all 0s ease 0s' });

        if (innerWidth <= 1023) {
            //create additional empty item so the last item can be positioned to top
            // of the page when scrolling to it
            var emptyItem = document.createElement('li');
            emptyItem.className = 'project-item';
            emptyItem.style.height = '100vh';
            projectsList.appendChild(emptyItem);

            app.timeline.set(notSelectedProjs, { className: '-=shown' })
                .set(selectedContent, { transition: 'all 0s ease 0s' })
                .to(selectedContent, 0.7, { opacity: 0 })
                .to(selected, 0.7, { height: '60vh' }, 0)
                .to(projectsWrap, 0.7, { scrollTo: selected, ease: Power2.easeInOut }, 0)
                .to(selectedCover, 0.3, { y: '83%' }, 0.5);

        } else {
            var arr = Array.prototype.slice.call(projectsItems);
            var index = arr.indexOf(selected) + 1;

            app.timeline.set(projectsContents, { transition: 'all 0s ease 0s' })
                .to(notSelectedProjs, 1, { className: '-=shown' })
                .to([progressNav, selectedContent], 0.3, { autoAlpha: '0' }, 0)
                .to(projectsWrap, 1, { left: 0, width: '100%', ease: Power1.easeInOut }, 0)
                .to(projectsList, 1, { top: 0, height: '100%', x: (100 - (index * 35 + 20)) + '%', ease: Power1.easeInOut }, 0)
                .to(selected, 1, { paddingTop: '148px', width: '55%', ease: Power1.easeInOut }, 0)
                .to(selectedCover, 0.5, { x: '-95%' }, 0);
        }
    }

    function _exit(resolve, reject) {
        var destination = barbaHandler.getDest();
        app.timeline.clear();
        app.timeline.eventCallback('onComplete', function () { resolve(true); });
        _removeEvents();

        switch (destination) {
            case 'projectInfo':
                _renderExitToProjectInfo();
                break;
            default:
                _renderExit();
        }
    }

    function exiting() {
        var exitPromise = new Promise(_exit);
        return exitPromise;
    }

    function _renderContent() {
        app.timeline.set(progressNav, { autoAlpha: 0 })
            .staggerTo(projectsItems, 1, { className: '+=shown', clearProps: 'all' }, 0.2);

        if (projectsItems.length > 2) {
            app.timeline.to(progressNav, 0.5, { autoAlpha: '1', clearProps: 'all' }, 0);
        }
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

    function _scroll(x) {
        var progressPercentage;
        progress = x > end ? end : x < start ? start : x;
        projectsList.style.transform = 'translateX(' + (-progress) + 'px)';

        progressPercentage = progress / end;
        barProgress = progressPercentage * barEnd;
        bar.style.transform = 'translateX(' + barProgress + 'px)';
    }

    function _scrollByBar(barX) {
        var progressPercentage;
        barProgress = barX > barEnd ? barEnd : barX < 0 ? 0 : barX;
        bar.style.transform = 'translateX(' + (barProgress) + 'px)';

        progressPercentage = barProgress / barEnd;
        progress = progressPercentage * end;
        projectsList.style.transform = 'translateX(' + (-progress) + 'px)';
    }

    function _autoScroll() {
        var elapsed, delta;
        if (amplitude) {
            elapsed = Date.now() - timestamp;
            delta = -amplitude * Math.exp(-elapsed / 325);
            if (delta > 0.5 || delta < -0.5) {
                _scroll(target + delta);
                animationFrameNumber = requestAnimationFrame(_autoScroll);
            } else {
                _scroll(target);
            }
        }
    }

    function _track() {
        var now, elapsed, delta, v;
        now = Date.now();
        elapsed = now - timestamp;
        timestamp = now;
        delta = progress - frame;
        frame = progress;

        v = 500 * delta / elapsed;
        velocity = 0.8 * v + 0.2 * velocity;
    }

    function _tap(event) {
        if (event.target !== bar) {
            pressed = true;
            firstTouch = _xPos(event);
            lastTouch = firstTouch;

            //to calculate velocity
            velocity = amplitude = 0;
            frame = progress;
            timestamp = Date.now();
            //        clearInterval(ticker);
            //        ticker = setInterval(_track, 100);
        } else {
            barPressed = true;
            lastTouch = _xPos(event);
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    function _release(event) {
        if (pressed || barPressed) {
            //        clearInterval(ticker);
            _track();
            if (velocity > 10 || velocity < -10) {
                amplitude = 0.8 * velocity;
                target = Math.round(progress + amplitude);
                timestamp = Date.now();
                animationFrameNumber = requestAnimationFrame(_autoScroll);
            }
        }

        barPressed = false;
        pressed = false;
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    function _drag(event) {
        var x, delta;
        if (pressed) {
            x = _xPos(event); //get latest touch x position
            delta = lastTouch - x;
            // simple threshold of 2px to prevent jittering due to some micromovements
            if (delta > 2 || delta < -2) {
                lastTouch = x;
                _scroll(delta + progress);
            }
        } else if (barPressed) {
            x = _xPos(event);
            delta = x - lastTouch;

            if (delta > 2 || delta < -2) {
                lastTouch = x;
                _scrollByBar(delta + barProgress);
            }
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    function _wheelDrag(event) {
        cancelAnimationFrame(animationFrameNumber);
        var delta = event.deltaY || event.deltaX;
        _scroll(delta + progress);

        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    function _click(event) {
        //if it is a drag
        if (this.firstTouch !== this.lastTouch) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    //binding events
    function _enableHorizontalScorlling() {
        //enable horizontal scrolling
        if (typeof projectsWrap.ontouchstart !== 'undefined') {
            projectsWrap.addEventListener('touchstart', _tap);
            projectsWrap.addEventListener('touchmove', _drag);
            projectsWrap.addEventListener('touchend', _release);
        }
        projectsWrap.addEventListener('mousedown', _tap);
        projectsWrap.addEventListener('mousemove', _drag);
        projectsWrap.addEventListener('mouseup', _release);
        projectsWrap.addEventListener('wheel', _wheelDrag);
        projectsWrap.addEventListener('click', _click, true);

        //progress bar
        bar.addEventListener('mousedown', _tap);
        bar.addEventListener('mousemove', _drag);
        bar.addEventListener('mouseup', _release);

        isEnabled = true;
    }

    function _disableHorizontalScorlling() {
        //disable horizontal scrolling
        if (typeof projectsWrap.ontouchstart !== 'undefined') {
            projectsWrap.removeEventListener('touchstart', _tap);
            projectsWrap.removeEventListener('touchmove', _drag);
            projectsWrap.removeEventListener('touchend', _release);
        }
        projectsWrap.removeEventListener('mousedown', _tap);
        projectsWrap.removeEventListener('mousemove', _drag);
        projectsWrap.removeEventListener('mouseup', _release);
        projectsWrap.removeEventListener('wheel', _wheelDrag);
        projectsWrap.removeEventListener('click', _click, true);

        isEnabled = false;
    }

    function _bindEvents() {
        window.addEventListener('resize', _setup);

        //if all projects are visible and no need to scroll
        if (end <= 0) {
            progressNav.style.display = 'none';
        } else {
            _enableHorizontalScorlling();
        }
    }

    function _removeEvents() {
        window.addEventListener('resize', _setup);
        _disableHorizontalScorlling();
    }

    //init
    function init() {
        _initElements();
        _bindEvents();
        _setup();
        _renderContent();
    }

    return {
        init: init,
        setSelectedProject: setSelectedProject,
        exiting: exiting
    }
})();

//################### project info ###################//
var projectInfo = (function () {
    //elements
    var rightBackground, textWrap, imagesWrap, images, imageNav, bars, nextBtn, prevBtn, previewImages;
    //variables
    var currentIndex;

    //methods
    function _initElements() {
        rightBackground = document.getElementById('right-skewed-background');
        textWrap = document.querySelector('.text-wrapper');
        imagesWrap = document.querySelector('.project-imgs-wrap');
        nextBtn = document.querySelector('.next-button-wrap');
        prevBtn = document.querySelector('.prev-button-wrap');
        images = imagesWrap.querySelectorAll('img');
        imageNav = document.querySelector('.images-nav');
        bars = imageNav.querySelectorAll('.bar');
        bars = Array.prototype.slice.call(bars);
        previewImages = document.getElementsByClassName('preview-img');

        currentIndex = 0;
    }

    function _initPreviewImages() {
        for (var i = 0; i < previewImages.length; i++) {
            previewImages.item(i).src = images.item(i).src;
        }
    }

    function _changeImage(event, index) {
        if (!index) {
            if (event.currentTarget === nextBtn) {
                index = (currentIndex + 1) % images.length;
            } else if (event.currentTarget === prevBtn) {
                index = (currentIndex - 1 + images.length) % images.length;
            } else if (event.target !== imageNav && event.target.classList.contains('bar')) {
                index = bars.indexOf(event.target);
            } else {
                return;
            }
        }

        imagesWrap.querySelector('.shown').classList.remove('shown');
        images.item(index).classList.add('shown');

        imageNav.querySelector('.selected').classList.remove('selected');
        bars[index].classList.add('selected');

        currentIndex = index;
    }

    function _enlargeImage() {
        imagesWrap.parentElement.classList.toggle('modal');
    }

    function _renderContent() {
        app.timeline.to(rightBackground, 0.7, { className: '+=reveal', clearProps: 'all' });
    }

    function _renderContentFromProjects() {
        app.timeline.set(rightBackground, { className: '+=reveal', clearProps: 'all' });
    }

    function _renderContentFromHome() {
        if (innerWidth <= 1023) {
            app.timeline.set(rightBackground, { className: '+=reveal', clearProps: 'all' });
        } else {
            app.timeline.to(rightBackground, 0.7, { x: '105%' })
                .set(rightBackground, { className: '+=reveal', clearProps: 'all' });
        }
    }

    function _load() {
        var origin = barbaHandler.getOrigin();

        switch (origin) {
            case 'home':
                _renderContentFromHome();
                break;
            case 'projects':
                _renderContentFromProjects();
                break;
            default:
                _renderContent();
        }
        app.timeline.to(textWrap, 0.5, { autoAlpha: 1 });
    }

    function _exit(resolve, reject) {
        _removeEvents();
        app.timeline.clear();
        app.timeline.eventCallback('onComplete', function () { resolve(true); });
        app.timeline.to(textWrap, 0.3, { autoAlpha: 0 })
            .to(rightBackground, 0.7, { className: '-=reveal' }, 0);
    }

    function exiting() {
        var exitPromise = new Promise(_exit);
        return exitPromise;
    }

    //binding events
    function _bindEvents() {
        imagesWrap.addEventListener('click', _enlargeImage);
        imageNav.addEventListener('click', _changeImage);
        prevBtn.addEventListener('click', _changeImage);
        nextBtn.addEventListener('click', _changeImage);

    }

    function _removeEvents() {
        imagesWrap.removeEventListener('click', _enlargeImage);
        imageNav.removeEventListener('click', _changeImage);
        prevBtn.removeEventListener('click', _changeImage);
        nextBtn.removeEventListener('click', _changeImage);
    }

    //init
    function init() {
        _initElements();
        _initPreviewImages();
        _bindEvents();
        _load();
    }

    return {
        init: init,
        exiting: exiting
    }
})();


//################### barba handler ###################//
var barbaHandler = (function () {
    //variables
    var currentPage, oldPage, origin, destination;

    //methods

    //listening to any link click listener (except for links to other domains)
    function _linkClickedHandler(target, event) {
        // console.log('link clicked --');

        //see where the user clicked to determine next page loading style
        if (target.classList.contains('section-item')) {
            origin = 'navigation';
        } else if (target.classList.contains('project-wrap')) {
            origin = 'home';
            destination = 'projectInfo';
        } else if (target.parentElement.classList.contains('project-item')) {
            origin = 'projects';
            destination = 'projectInfo';
            projects.setSelectedProject(target);
        }
    }

    function _newPageHandler(currentStatus, oldStatus, newContainer, newRawHtml) {
        //event handler whenever the new content loaded but not yet removed the old container
        // console.log('new content ready');
        var pageClass = newContainer.classList.item(1);

        switch (pageClass) {
            case 'home':
                currentPage = home;
                break;
            case 'about':
                currentPage = about;
                break;
            case 'contact':
                currentPage = contact;
                break;
            case 'project-info':
                currentPage = projectInfo;
                break;
            case 'architecture':
            case 'interior':
            case 'micro-architecture':
            case 'graphic-identities':
            case 'wayfinding':
                currentPage = projects;

        }

        app.setActiveNavItem(newContainer.classList);
    }

    function _initNewPage() {
        // console.log('initializing new page...');
        document.body.style.pointerEvents = 'auto';
        currentPage.init();
        origin = "";
        destination = "";
    };

    function _oldPageTransition() {
        // console.log('exiting the old content...');
        document.body.style.pointerEvents = 'none';
        // console.log(oldPage);
        var exitPromise = oldPage.exiting();
        exitPromise.then(this.finish.bind(this));
    }

    function _start() {
        // console.log('downloading new content...');
        oldPage = currentPage;
        this.newContainerLoading.then(_oldPageTransition.bind(this));
    }

    //binding events
    document.addEventListener('DOMContentLoaded', init);
    Barba.Dispatcher.on('linkClicked', _linkClickedHandler)
    Barba.Dispatcher.on('newPageReady', _newPageHandler);
    //init the new page after the old page removed from DOM
    Barba.Dispatcher.on('transitionCompleted', _initNewPage);

    //declare and initialize exit transition
    var exitTransition = Barba.BaseTransition.extend({
        start: _start,
        finish: function () {
            // console.log('done.');
            app.timeline.eventCallback('onComplete', null);
            this.done();
        }
    });
    //let barba know that we want to use the transition created above
    Barba.Pjax.getTransition = function () {
        return exitTransition;
    };

    //init
    function init() {
        // console.log('barba start ---');
        Barba.Pjax.start();
    }

    return {
        init: init,
        getOrigin: function () {
            return origin;
        },
        getDest: function () {
            return destination;
        }
    }
})();
