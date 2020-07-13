(function (window, document) {
    var currentSection = document.getElementById("home");
    var logo = document.getElementById("logo");
    var i = 0; //for loop


    //site's main sections
    var home = currentSection;
    var aboutUs = document.getElementById("about-us");
    var projects = document.getElementById("projects");
    //            var clients = document.getElementById("clients");
    var contact = document.getElementById("contact");
    //navigation menu
    var navContainer = document.getElementById("nav-container");
    var navMenu = document.getElementById("nav-menu");
    var sectionNames = ['home', 'about-us', 'projects', 'contact'];
    var hamburgerContainer = document.getElementById("hamburger-container");
    var hamburger = document.getElementById("hamburger");
    /* home related variables and elements */
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var homeSlideDots = document.getElementsByClassName("home-slide-dot");
    var projectDetailsLinks = document.getElementsByClassName("project-details-link");
    var currentSlide = 0;
    var isMoving = false;
    var touchStartPosition = 0;
    var deltaY = 0;
    /* projects related variables and elements */
    //viewed as tabs on desktops and as menu in mobile devices
    var projectsTabsContainer = document.getElementById("menu-inner");
    var projectsGrid = document.getElementById("projects-grid");
    var projectsInfo = {};
    /* project details (projects sub section) related variable and elements */
    var projectDetails = document.getElementById("project-details");
    var projectContentContainer = document.getElementById("project-content-container");
    var imageContainer = document.getElementById("project-image-container");
    var projectImages = document.getElementsByClassName("project-image");
    var projectDescription = document.getElementById("project-description");
    var descriptionHeader = document.getElementById("description-header");
    var descriptionText = document.getElementById("text");
    var fullImageButton = document.getElementById('full-image-button');
    var numberOfImages = 5;
    var topImageIndex = 0;
    //get projects JSON object (ajax)
    var isLoaded = false;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            projectsInfo = JSON.parse(xmlHttp.responseText);
            isLoaded = true;
        }
    };
    xmlHttp.open("GET", "projects.json", true);
    xmlHttp.send();


    var contentLoaded = 0;
    var imageIsLoaded = function () {
        contentLoaded += 1;
    };

    //chrome bug fix for opacity transition from 1 to 0 when page is ready.
    home.classList.add("opacity-animated");
    aboutUs.classList.add("opacity-animated");
    projects.classList.add("opacity-animated");
    //            clients.classList.add("opacity-animated");
    contact.classList.add("opacity-animated");
    projectDetails.classList.add("opacity-animated");
    navContainer.classList.add("opacity-animated");

    //navigation functions
    function openCloseNav() {
        navContainer.classList.toggle("show");
        navMenu.classList.toggle("nav-menu-visible");
        hamburger.classList.toggle("hamburger-x");
    }

    function changeSectionTo(sectionName) {
        currentSection.classList.remove("active");
        currentSection = document.getElementById(sectionName);
        window.setTimeout(function () {
            logo.className = currentSection === projectDetails ? "logo hidden" : "logo";
            currentSection.classList.add("active");
        }, 1500);

    }

    function navAddEventListeners(index) {
        var childElement = navMenu.children[index];
        var sectionName = sectionNames[index]; // this variable's value will not be lost inside closure
        childElement.addEventListener("click", function () {
            changeSectionTo(sectionName);
            openCloseNav();
        }, false);
    }

    //navigation event listeners
    hamburgerContainer.addEventListener("click", openCloseNav);
    for (i = 0; i < 4; i++) {
        navAddEventListeners(i);

    }

    //show home section when the page is loaded
    window.addEventListener("load", function () {
        changeSectionTo("home");
    });

    /* home initialization */
    function changeHomeSlide(index) {
        isMoving = true; //block scrolling temporarily

        //update selected slider dot
        homeSlideDots[currentSlide].classList.remove("selected");
        currentSlide = index; //update current slide
        homeSlideDots[currentSlide].classList.add("selected");


        //change slide
        var scrollOffset = currentSlide * 100;
        left.style.transform = "translateY(" + -scrollOffset + "%)";
        right.style.transform = "translateY(" + scrollOffset + "%)";
    }

    //read scrolling offset (up or down)
    function readScrollDirection(event) {
        if (isMoving) {
            //if the wheel is still moving, ignore (to reduce scrolling sensitivity)
            return;
        }
        var deltaOffset = event.deltaY || deltaY;
        if (deltaOffset > 0) { //scroll down
            if (currentSlide === 2) {
                isMoving = false;
                return;
            }
            changeHomeSlide(currentSlide + 1); //increment
        } else { //scroll up
            if (currentSlide === 0) {
                isMoving = false;
                return;
            }
            changeHomeSlide(currentSlide - 1); //decrement
        }
    }

    function homeAddEventListeners(index) {
        homeSlideDots[i].addEventListener("click", function () {
            changeHomeSlide(index);
        }, false);

        projectDetailsLinks[i].addEventListener("click", function () {
            var projectName = this.id.split("-")[0];
            projectInitialize(projectName);
        }, false);
    }

    /* home event listeners */
    right.addEventListener("transitionend", function () {
        //delay to ensure the mouse wheel is eventually stopped
        window.setTimeout(function () {
            isMoving = false;
        }, 700);

    });

    //event listener for scrolling using mouse wheel
    home.addEventListener("wheel", readScrollDirection);

    //event listeners for scrolling using touch screen
    home.addEventListener("touchstart", function (event) {
        touchStartPosition = event.touches[0].clientY;
    });
    home.addEventListener("touchmove", function (event) {
        event.preventDefault();
        deltaY = touchStartPosition - event.changedTouches[0].clientY;
        readScrollDirection(event);
    });

    //event listeners for slider dots and projects details links
    for (i = 0; i < 3; i++) {
        homeAddEventListeners(i);
    }

    /*** projects ***/

    //isotope initialization with filter function
    var filter = (function () {
        var iso = new window.Isotope('.projects-grid', {
            itemSelector: ".grid-cell"
        });
        return function (className) {
            iso.arrange({
                filter: className
            });
        };
    })();

    var filterProjects = (function () {
        var currentTab = document.getElementsByClassName("tab-selected")[0];
        var menuHeader = document.getElementById("menu-label").firstElementChild;

        return function (event) {
            if (event.target !== event.currentTarget) {
                var target = event.target;
                currentTab.classList.toggle("tab-selected");
                target.classList.toggle("tab-selected");
                currentTab = target;
                //this change is viewable on mobile devices
                menuHeader.innerHTML = target.innerHTML.toUpperCase(); //update tab menu header

                //apply filter
                filter(target.dataset.filter);
            }
        };
    })();

    //projects tabs/menu event listener
    projectsTabsContainer.addEventListener("click", filterProjects, false);
    projectsGrid.addEventListener("click", function (event) {
        if (event.target !== event.currentTarget) {
            var projectName = event.target.id;
            projectInitialize(projectName);
        }
        event.stopPropagation();
    }, false);

    /*** project details ***/

    //add onload event listener to images
    for (i = 0; i < 5; i++) {
        projectImages[i].addEventListener("load", imageIsLoaded);
    }

    /* project details functions */
    function projectInitialize(projectName) {
        if(!isLoaded) {
            window.alert("project's did not load properly, please refresh the page");
            return;
        }
        var info = projectsInfo[projectName];
        for (var i = 0; i < info.images.length; i++) {
            projectImages[i].src = info.images[i];
        }
        numberOfImages = info.images.length;
        contentLoadedCheck();

        descriptionHeader.innerHTML = info.name;
        if (info["description"] === "") {
            descriptionText.innerHTML = "";
        } else {
            descriptionText.innerHTML = info["description"];
        }

    }

    function contentLoadedCheck() {
        //hide current section immediately after selecting project
        currentSection.classList.remove("active");

        var check = window.setInterval(function () {
            if (contentLoaded === numberOfImages) {
                changeSectionTo('project-details');

                //reset
                contentLoaded = 0;
                window.clearInterval(check);
            }
        }, 1000);
    }

    function showDescription() {
        projectDescription.classList.add("top");
    }

    function hideDescription() {
        projectDescription.classList.remove("top");
    }

    function toggleDescription() {
        projectDescription.classList.toggle("top");
    }

    function changeImage(index) {
        projectImages[index].classList.toggle('top');
        topImageIndex = index;
    }

    function changeSlide(offset, index) {
        if (isMoving || offset === -1) {
            return;
        }
        isMoving = true;
        index = index || 0;

        // 0: change image to selected index, 1: scroll down, 2: scroll up
        // 3: toggle description, 4: hide description
        switch (offset) {
            case 0:
                changeImage(index);
                return;
            case 1:
                changeImage(topImageIndex + 1);
                break;
            case 2:
                changeImage(topImageIndex);
                topImageIndex--;
                break;
            case 3:
                toggleDescription();
                break;
        }

    }

    function readScrollOffset(event) {
        var deltaOffset = event.deltaY || deltaY;

        if (deltaOffset > 0) { //mouse scroll down
            if (topImageIndex === projectImages.length - 1) {
                return -1;
            }
            return 1;

        } else { //mouse scroll up
//                if (description.classList.contains('top')) {
//                    return -3;
//                } else
            if (topImageIndex === 0) {
                return -1;
            }
            return 2;
        }
    }

    function processScrolling(event) {
        if (projectDescription.classList.contains('top') || topImageIndex === numberOfImages - 1) {
            return;
        }
        var offset = readScrollOffset(event);
        changeSlide(offset);
    }

    function enableScrolling(scrollDelay) {
        window.setTimeout(function() {
            isMoving = false;
        }, scrollDelay);
    }

    function showFullImage() {
        hideDescription();
        projectContentContainer.classList.toggle('full-image');
    }

    /* project details event listeners */
    for(i = 0; i < projectImages.length; i++) {
        projectImages[i].addEventListener("transitionend", function () {
        //delay to ensure the mouse wheel is eventually stopped
        window.setTimeout(function () {
            isMoving = false;
        }, 700);

    });
    }

    //event listener for scrolling using mouse wheel
    projectContentContainer.addEventListener("wheel", processScrolling);

    //event listeners for scrolling using touch screen
    projectContentContainer.addEventListener("touchstart", function (event) {
        touchStartPosition = event.touches[0].clientY;
    });
    projectContentContainer.addEventListener("touchmove", function (event) {
        event.preventDefault();
        deltaY = touchStartPosition - event.changedTouches[0].clientY;
        processScrolling(event);
    });

    fullImageButton.addEventListener('click', showFullImage);
    for (i = 0; i < 5; i++) {
        projectImages[i].addEventListener('transitionend', function(){
            enableScrolling(700);
        });
    }
    projectDescription.addEventListener('transitionend', function(){
        enableScrolling(0);
    });
    descriptionHeader.addEventListener('click', function(){
        changeSlide(3);
    });


})(window, document);

//Projects filter menu initialization for mobile devices
(function () {

    function SVGDDMenu(el, options) {
        this.el = el;
        this.init();
    }

    SVGDDMenu.prototype.init = function () {
        this.shapeEl = this.el.querySelector('div.morph-shape');

        var s = Snap(this.shapeEl.querySelector('svg'));
        this.pathEl = s.select('path');
        this.paths = {
            reset: this.pathEl.attr('d'),
            trans: this.shapeEl.getAttribute('data-morph-trans'),
            open: this.shapeEl.getAttribute('data-morph-open')
        };

        this.isOpen = false;

        this.initEvents();
    };

    SVGDDMenu.prototype.initEvents = function () {
        this.el.addEventListener('click', this.toggle.bind(this));
    };

    SVGDDMenu.prototype.toggle = function () {
        var self = this;

        if (this.isOpen) {
            classie.remove(self.el, 'menu--open');

            self.pathEl.stop().animate({
                'path': this.paths.reset
            }, 3000, mina.elastic);

        } else {
            classie.add(self.el, 'menu--open');

            this.pathEl.stop().animate({
                'path': this.paths.trans
            }, 320, mina.easeinout, function () {
                self.pathEl.stop().animate({
                    'path': self.paths.open
                }, 2500, mina.elastic);
            });

        }

        document.getElementsByClassName("tab-arrow")[0].classList.toggle("arrow-up");
        this.isOpen = !this.isOpen;
    };

    new SVGDDMenu(document.getElementById('menu'));

})();
