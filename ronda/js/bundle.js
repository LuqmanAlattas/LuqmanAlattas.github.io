!function () { "use strict"; function a() { function a() { function a(a, d) { function e(a) { var d = 1 === (f = 1 - f) ? "width" : "height"; return c[d] + Math.floor(Number(a) * b[d]) } var f = 0; j[d].coords = a.split(",").map(e).join(",") } var b = { width: l.width / l.naturalWidth, height: l.height / l.naturalHeight }, c = { width: parseInt(window.getComputedStyle(l, null).getPropertyValue("padding-left"), 10), height: parseInt(window.getComputedStyle(l, null).getPropertyValue("padding-top"), 10) }; k.forEach(a) } function b(a) { return a.coords.replace(/ *, */g, ",").replace(/ +/g, ",") } function c() { clearTimeout(m), m = setTimeout(a, 250) } function d() { l.width === l.naturalWidth && l.height === l.naturalHeight || a() } function e() { l.addEventListener("load", a, !1), window.addEventListener("focus", a, !1), window.addEventListener("resize", c, !1), window.addEventListener("readystatechange", a, !1), document.addEventListener("fullscreenchange", a, !1) } function f() { return "function" == typeof i._resize } function g(a) { return document.querySelector('img[usemap="' + a + '"]') } function h() { j = i.getElementsByTagName("area"), k = Array.prototype.map.call(j, b), l = g("#" + i.name) || g(i.name), i._resize = a } var i = this, j = null, k = null, l = null, m = null; f() ? i._resize() : (h(), e(), d()) } function b() { function b(a) { if (!a.tagName) throw new TypeError("Object is not a valid DOM element"); if ("MAP" !== a.tagName.toUpperCase()) throw new TypeError("Expected <MAP> tag, found <" + a.tagName + ">.") } function c(c) { c && (b(c), a.call(c), d.push(c)) } var d; return function (a) { switch (d = [], typeof a) { case "undefined": case "string": Array.prototype.forEach.call(document.querySelectorAll(a || "map"), c); break; case "object": c(a); break; default: throw new TypeError("Unexpected data type (" + typeof a + ").") }return d } } "function" == typeof define && define.amd ? define([], b) : "object" == typeof module && "object" == typeof module.exports ? module.exports = b() : window.imageMapResize = b(), "jQuery" in window && (jQuery.fn.imageMapResize = function () { return this.filter("map").each(a).end() }) }();

!function () { "use strict"; function o() { var o = window, t = document; if (!("scrollBehavior" in t.documentElement.style && !0 !== o.__forceSmoothScrollPolyfill__)) { var l, e = o.HTMLElement || o.Element, r = 468, i = { scroll: o.scroll || o.scrollTo, scrollBy: o.scrollBy, elementScroll: e.prototype.scroll || n, scrollIntoView: e.prototype.scrollIntoView }, s = o.performance && o.performance.now ? o.performance.now.bind(o.performance) : Date.now, c = (l = o.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(l) ? 1 : 0); o.scroll = o.scrollTo = function () { void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? h.call(o, t.body, void 0 !== arguments[0].left ? ~~arguments[0].left : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : o.scrollY || o.pageYOffset) : i.scroll.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : o.scrollY || o.pageYOffset)) }, o.scrollBy = function () { void 0 !== arguments[0] && (f(arguments[0]) ? i.scrollBy.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : h.call(o, t.body, ~~arguments[0].left + (o.scrollX || o.pageXOffset), ~~arguments[0].top + (o.scrollY || o.pageYOffset))) }, e.prototype.scroll = e.prototype.scrollTo = function () { if (void 0 !== arguments[0]) if (!0 !== f(arguments[0])) { var o = arguments[0].left, t = arguments[0].top; h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t) } else { if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted"); i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop) } }, e.prototype.scrollBy = function () { void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior }) : i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop)) }, e.prototype.scrollIntoView = function () { if (!0 !== f(arguments[0])) { var l = function (o) { for (; o !== t.body && !1 === (e = p(l = o, "Y") && a(l, "Y"), r = p(l, "X") && a(l, "X"), e || r);)o = o.parentNode || o.host; var l, e, r; return o }(this), e = l.getBoundingClientRect(), r = this.getBoundingClientRect(); l !== t.body ? (h.call(this, l, l.scrollLeft + r.left - e.left, l.scrollTop + r.top - e.top), "fixed" !== o.getComputedStyle(l).position && o.scrollBy({ left: e.left, top: e.top, behavior: "smooth" })) : o.scrollBy({ left: r.left, top: r.top, behavior: "smooth" }) } else i.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]) } } function n(o, t) { this.scrollLeft = o, this.scrollTop = t } function f(o) { if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0; if ("object" == typeof o && "smooth" === o.behavior) return !1; throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.") } function p(o, t) { return "Y" === t ? o.clientHeight + c < o.scrollHeight : "X" === t ? o.clientWidth + c < o.scrollWidth : void 0 } function a(t, l) { var e = o.getComputedStyle(t, null)["overflow" + l]; return "auto" === e || "scroll" === e } function d(t) { var l, e, i, c, n = (s() - t.startTime) / r; c = n = n > 1 ? 1 : n, l = .5 * (1 - Math.cos(Math.PI * c)), e = t.startX + (t.x - t.startX) * l, i = t.startY + (t.y - t.startY) * l, t.method.call(t.scrollable, e, i), e === t.x && i === t.y || o.requestAnimationFrame(d.bind(o, t)) } function h(l, e, r) { var c, f, p, a, h = s(); l === t.body ? (c = o, f = o.scrollX || o.pageXOffset, p = o.scrollY || o.pageYOffset, a = i.scroll) : (c = l, f = l.scrollLeft, p = l.scrollTop, a = n), d({ scrollable: c, method: a, startTime: h, startX: f, startY: p, x: e, y: r }) } } "object" == typeof exports && "undefined" != typeof module ? module.exports = { polyfill: o } : o() }();

(function (win, doc) {
    var isMPAnimTriggered = false;
    // ------------------- functions ------------------- //

    //--- events handlers ---//
    function mouseOrTouch(e) {
        var body = doc.body,
            masterPlanContent = doc.getElementById('master-plan-content'),
            mpImage = masterPlanContent.querySelector('.master-plan-image img'),
            imageUrl = '';

        e.currentTarget.removeEventListener('mousemove', mouseOrTouch);
        e.currentTarget.removeEventListener('touchstart', mouseOrTouch);

        if (e.type === 'mousemove') {
            imageUrl = 'assets/images/master-plan/00.jpg';
        } else {
            body.classList.add('touch-supported');
            imageUrl = 'assets/images/master-plan/00.jpg';
            document.getElementById('bisak-area').src = 'assets/images/master-plan/mp-mobile-bisak.png';
            document.getElementById('type-a-area').src = 'assets/images/master-plan/mp-mobile-villa.png';
            document.getElementById('type-b-area').src = 'assets/images/master-plan/mp-mobile-2-BA.png';
            document.getElementById('type-d-area').src = 'assets/images/master-plan/mp-mobile-3-BA.png';
        }

        mpImage.src = imageUrl;
    }

    function pageLoaded(e) {
        doc.body.classList.remove('preload');
        win.removeEventListener('load', pageLoaded);
    }

    function isMPVisible(e) {
        var mp = doc.querySelector('#master-plan-image > img');
        var rect = mp.getBoundingClientRect();

        if ((rect.top <= (win.innerHeight / 2 - rect.height / 2) && rect.bottom >= (win.innerHeight / 2)) || (rect.top <= win.innerHeight && rect.bottom <= win.innerHeight)) {
            if (!isMPAnimTriggered) {
                isMPAnimTriggered = true;
                triggerMPAnimation()
            }
        }


    }

    function triggerMPAnimation() {
        if (doc.body.classList.contains('touch-supported')) {
            console.log('mp triggered');
            doc.querySelector('.master-plan-content').classList.add('mp-trigger');
        }
    }

    // --- initialization --- //
    function init() {
        win.addEventListener('mousemove', mouseOrTouch);
        win.addEventListener('touchstart', mouseOrTouch);
        win.addEventListener('load', pageLoaded);
        doc.getElementById('page-content').addEventListener('scroll', isMPVisible);
    }

    init();
})(window, document);

(function (win, doc) {
    // ------------------- event handlers ------------------- //
    function logoHide(e) {
        var logoWrap = doc.getElementById('logo-wrap');

        if (e.target.scrollTop > 80) {
            logoWrap.classList.add('hidden');
        } else {
            logoWrap.classList.remove('hidden');
        }
    }

    // --- initialization --- //
    function init() {
        var pageContent = doc.getElementById('page-content');
        pageContent.addEventListener('scroll', logoHide);
    }


    init();
})(window, document);

(function (win, doc) {

    // ------------------- functions ------------------- //
    function setOverviewTextsHeight(index) {
        var overviewText = doc.getElementById('overview-text-list'),
            ovTextItems = overviewText.querySelectorAll('.overview-text-item'),
            height = 0;
        //determine the highest overview text item
        ovTextItems.forEach(function (item, key) {
            if (key == index) {
                height = item.querySelector('h3').offsetHeight;
                height += item.querySelector('p').offsetHeight;
                overviewText.style.height = height + 'px';
            } else if (key == 2) {
                overviewText.style.height = height + 'px';
            }
        });
    }

    function showOVTxt(index) {
        var ovTextItems = doc.querySelectorAll('#overview-text-list .overview-text-item');

        ovTextItems.forEach(function (item, key) {
            if (index === key) {
                item.classList.add('shown');
            } else {
                item.classList.remove('shown');
            }
        });
    }

    // ------------------- event handlers ------------------- //
    function ovHovered(e) {
        var ovSelectors = e.currentTarget,
            ovItems = ovSelectors.querySelectorAll('.overview-item'),
            target = e.target,
            index;
        if (target.classList.contains('overview-item')) {
            index = Array.prototype.indexOf.call(ovItems, target);
            setOverviewTextsHeight(index);
            showOVTxt(index);
        }
    }

    function ovLeave(e) {
        showOVTxt(-1);
        setOverviewTextsHeight(-1);
    }

    function ovThumbClicked(e) {
        if (typeof e.target.dataset['scrollTo'] == 'undefined') {
            return;
        }

        var elem = document.getElementById(e.target.dataset['scrollTo']);
        elem.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

    }

    function touchDetected(e) {
        e.currentTarget.removeEventListener('click', ovThumbClicked);
        e.currentTarget.removeEventListener('touchStart', touchDetected);
    }

    // --- initialization --- //
    function init() {
        var ovSelectors = doc.getElementById('overview-selectors');
        //binding events
        ovSelectors.addEventListener('mouseenter', ovHovered, true);
        ovSelectors.addEventListener('mouseleave', ovLeave, true);
        ovSelectors.addEventListener('click', ovThumbClicked);
        ovSelectors.addEventListener('touchstart', touchDetected);
        win.addEventListener('resize', setOverviewTextsHeight);
        win.addEventListener('load', setOverviewTextsHeight);
    }

    init();
})(window, document);

var infoModal = function () {
    // ------------------- functions ------------------- //

    //helper function to get the the right vendor prefix if any of a css property like msTransform, webkitTransform ... etc. 
    function getVendorPrefix(arrayOfPrefixes) {
        var tmp = document.createElement("div");
        var result = null;

        for (var i = 0; i < arrayOfPrefixes.length; ++i) {
            if (typeof tmp.style[arrayOfPrefixes[i]] != 'undefined') {
                result = arrayOfPrefixes[i];
                break;
            }
        }
        return result;
    }

    function setUnitInfo(unitData) {
        var imagesDir = unitData.imagesDir,
            infoThumbsSection = document.getElementById('info-thumbs-section'),
            plansDir = unitData.plansDir,
            infoPlansSection = document.getElementById('info-plans-section'),
            infoHeader = document.getElementById('info-header'),
            infoDescription = document.getElementById('info-description');

        //this is like buffer for elements to be created. Then,
        //insert them into document all at once for minimal number of reflows
        var fragment = document.createDocumentFragment();

        // set images and number of images
        state.numberOfImgs = unitData.images.length + unitData.plans.length;
        unitData.images.forEach(function (item, index) {
            var divEl = document.createElement('div'),
                imgEl = document.createElement('img');

            divEl.className = 'thumbnail thumbnail-safari_only';
            imgEl.className = 'thumb-img';
            imgEl.alt = 'thumbnail image ' + (index + 1);
            imgEl.src = imagesDir + item;

            divEl.appendChild(imgEl);
            // fragment.appendChild(divEl);
            infoThumbsSection.insertBefore(divEl, infoThumbsSection.firstChild);
            imgEl.addEventListener('load', function () {
                imgLoaded(showInfoBox);
            });
        });

        //set the header
        infoHeader.innerHTML = unitData.title;

        //set the description
        infoDescription.innerHTML = unitData.description;


        //repeat the same process for plans
        fragment = document.createDocumentFragment();
        unitData.plans.forEach(function (item, index) {
            var divEl = document.createElement('div'),
                imgEl = document.createElement('img');

            divEl.className = 'thumbnail thumbnail-safari_only';
            imgEl.className = 'plans-img';
            imgEl.alt = 'thumbnail plan ' + (index + 1);
            imgEl.src = plansDir + item;

            divEl.appendChild(imgEl);
            fragment.appendChild(divEl);
            imgEl.addEventListener('load', function () {
                imgLoaded(showInfoBox);
            });
        });

        infoPlansSection.insertBefore(fragment, infoPlansSection.firstChild);

    }

    function setInfoContent(name, type) {
        var infoArray = infoData[type],
            infoObj;

        //get unit data and its index
        for (var index = 0; index < infoArray.length; index++) {
            if (infoArray[index].key === name) {
                infoObj = infoArray[index].value;
                state.infoIndex = index;
                break;
            }
        }

        setUnitInfo(infoObj);
    }

    function clearInfoContent() {
        var infoThumbsSection = document.getElementById('info-thumbs-section'),
            infoPlansSection = document.getElementById('info-plans-section'),
            infoHeader = document.getElementById('info-header'),
            infoDescription = document.getElementById('info-description');

        //clear gallery
        while (infoThumbsSection.children) {
            if (infoThumbsSection.children[0].classList.contains('info-section-button')) {
                break;
            }
            infoThumbsSection.removeChild(infoThumbsSection.children[0]);
        }

        //clear plans if any
        while (infoPlansSection.children) {
            if (infoPlansSection.children[0].classList.contains('info-section-button')) {
                break;
            }
            infoPlansSection.removeChild(infoPlansSection.children[0]);
        }

        //clear the header
        infoHeader.innerText = '';

        //clear the description
        infoDescription.innerText = '';

        //clear state
        state.numberOfInfoImgs = 0;
        state.numberOfPlansImgs = 0;
        state.imgsLoadedCount = 0;
        state.plansLoadedCount = 0;

        //reset loading bar
        var loadingBar = document.querySelector('#loading-bar span'),
            transform = getVendorPrefix(['transform', 'webkitTransform', 'MozTransfom', 'msTransform', 'OTransform']);

        loadingBar.style[transform] = '';

        //reset focused section to text
        var infoTextSection = document.getElementById('info-text-section');
        infoSectionFocus(infoTextSection);

    }

    function showInfoBox() {
        var infoBox = document.getElementById('info-box'),
            infoClose = document.getElementById('info-box-close');
        infoBox.classList.add('info-box-shown');
        infoClose.classList.remove('info-close-show');
    }

    function showInfo(name, type) {
        var pageContent = document.getElementById('page-content'),
            infoWrap = document.getElementById('info-wrap'),
            infoClose = document.getElementById('info-box-close'),
            infoBox = document.getElementById('info-box');

        infoWrap.classList.add('info-shown');
        infoClose.classList.add('info-close-show');
        pageContent.classList.add('no-scroll');
        switch (name) {
            case 'type-a':
                infoBox.classList.add('villa-info')
                break;
            case 'type-b':
                infoBox.classList.add('bc-info')
                break;
            case 'type-d':
                infoBox.classList.add('d-info')
                break;

            default:
                infoBox.classList.add('villa-info')
                break;
        }

        // set images and texts
        setInfoContent(name, type);
    }

    function closeInfo() {
        var pageContent = document.getElementById('page-content'),
            infoBox = document.getElementById('info-box'),
            infoWrap = document.getElementById('info-wrap'),
            infoClose = document.getElementById('info-box-close'),
            infoBox = document.getElementById('info-box');


        infoBox.classList.remove('info-box-shown');
        infoWrap.classList.remove('info-shown');
        infoClose.classList.remove('info-close-show');
        pageContent.classList.remove('no-scroll');
        infoBox.classList.remove('villa-info', 'bc-info', 'd-info');
    }

    function infoSectionFocus(el) {
        var focusedEl = document.querySelector('#info-box-content .focused');
        if (focusedEl == el) {
            return;
        }

        focusedEl.classList.remove('focused');
        el.classList.add('focused');
    }

    // ------------------- events handlers ------------------- //
    function imgLoaded(callback) {
        var loadingBar = document.querySelector('#loading-bar span'),
            transform = getVendorPrefix(['transform', 'webkitTransform', 'MozTransfom', 'msTransform', 'OTransform']);

        state.imgsLoadedCount += 1;
        loadingBar.style[transform] = 'translateX(' + (state.imgsLoadedCount / state.numberOfImgs * 100) + '%)';

        if (state.imgsLoadedCount >= state.numberOfImgs) {
            callback();
            loadingBar.style[transform] = '';
            state.imgsLoadedCount = 0;
        }

    }

    function infoSectionClickHandler(e) {
        var targetEl = e.currentTarget;
        infoSectionFocus(targetEl);
    }

    //clear content after exit tarnsition end only
    function infoBoxTransitionEnded(e) {
        var infoBox = document.getElementById('info-box');

        if (!infoBox.classList.contains('info-box-shown') && e.target === infoBox) {
            //remove this class after closing the info box and clear content
            infoBox.classList.remove('facilities-info');
            clearInfoContent();
        }
    }

    function infoInit(e) {
        var target = e.target,
            type, name;

        if (target.tagName === 'AREA' && target.dataset.id != 'bisak') {
            e.preventDefault();
            type = 'units';
            name = target.dataset.id;
            showInfo(name, type);
        }
    }

    // --- initialization --- //
    function init() {
        var infoBox = document.getElementById('info-box'),
            infoTextWrap = document.getElementById('info-text-section'),
            infoThumbsWrap = document.getElementById('info-thumbs-section'),
            infoPlansWrap = document.getElementById('info-plans-section'),
            infoClose = document.getElementById('info-box-close'),
            infoBoxClose = document.getElementById('box-close');

        //event binding
        infoBox.addEventListener('transitionend', infoBoxTransitionEnded);
        infoTextWrap.addEventListener('click', infoSectionClickHandler);
        infoThumbsWrap.addEventListener('click', infoSectionClickHandler);
        infoPlansWrap.addEventListener('click', infoSectionClickHandler);
        infoClose.addEventListener('click', closeInfo);
        infoBoxClose.addEventListener('click', closeInfo);
    }

    // ------------------- data ------------------- //
    var infoData = {
        "units": [{
            key: "type-a",
            value: {
                "title": "VILLA",
                "description": "The <b>three-bedroom villa</b> offers the peace and tranquility of modern urban living. These units provide spacious and expansive home for socializing and family gatherings.",
                "imagesDir": "assets/images/master-plan/villa/",
                "images": ["1.jpg", "2.jpg"],
                "plansDir": "assets/images/master-plan/villa/plans/",
                "plans": ["ground-floor.jpg", "1st-floor.jpg", "2nd-floor.jpg"]
            }
        },
        {
            key: "type-b",
            value: {
                "title": "STUDIO AND TWO BEDROOM APARTMENTS",
                "description": "With the idea of ease at mind, these <b>studio & two-bedroom apartment</b> were created to offer a unique high-quality housing standard for the Ronda residents.",
                "imagesDir": "assets/images/master-plan/2-ba/",
                "images": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
                "plansDir": "assets/images/master-plan/2-ba/plans/",
                "plans": ["studio.jpg", "1st-floor.jpg", "1st-floor-middle-apt.jpg", "penthouse.jpg"]
            }
        },
        {
            key: "type-d",
            value: {
                "title": "THREE BEDROOM APARTMENTS",
                "description": "The <b>three-bedroom apartments</b> at Ronda offer spacious living and dining areas, kitchens, and modern furnishings. Along with subtle colors and luxury touches, these units ensure a premium finish.",
                "imagesDir": "assets/images/master-plan/3-ba/",
                "images": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
                "plansDir": "assets/images/master-plan/3-ba/plans/",
                "plans": ["ground-floor.jpg", "ground-1st-floor.jpg", "penthouse.jpg"]
            }
        }
        ]
    };

    var state = {
        jsonObj: {},
        numberOfImgs: 0,
        imgsLoadedCount: 0,
        numberOfInfoImgs: 0,
        numberOfPlansImgs: 0,
        imgsLoadedCount: 0,
        plansLoadedCount: 0,
        infoIndex: -1
    };

    init();

    //return variables that you want to be made public
    return {
        infoInit: infoInit
    };
}();

// ------------------- requires info-modal.js ------------------- //
// ------------------- requires imageMapResizer.min.js ------------------- //
(function (win, doc, im) {

    // ------------------- functions ------------------- //

    function toggleImage(id) {
        doc.getElementById(id).classList.toggle('hovered');
    }

    function showDetail(id) {
        doc.getElementById(id).classList.toggle('detail-shown');
    }

    function getAreaInfo(id) {
        switch (id) {
            case 'type-a':
            case 'type-b':
            case 'type-d':
            case 'bisak':
                return {
                    mpImageId: id + '-area', detailId: id + '-detail'
                };
            default:
                return null;
        }
    }

    // ------------------- event handlers ------------------- //

    function areaHighlight(e) {
        var target = e.target;
        if (target.tagName === 'AREA') {
            target.classList.toggle('selected');
            var id = target.dataset.id;
            var targetInfo = getAreaInfo(id);

            if (targetInfo) {
                //change master plan image and show header box over the image
                toggleImage(targetInfo.mpImageId);
                showDetail(targetInfo.detailId);
            }
        }
    }

    // --- initialization --- //
    function init() {
        var imageMap = doc.getElementById('image-map');
        //binding events
        imageMap.addEventListener('mouseover', areaHighlight);
        imageMap.addEventListener('mouseout', areaHighlight);
        imageMap.addEventListener('click', im.infoInit, true);

        // initialze image map resizer api
        imageMapResize(imageMap);
    }

    init();
})(window, document, infoModal);

window.addEventListener('load', initMap);

function initMap() {
    //setting latitude and langtiude
    var latLng = new google.maps.LatLng(26.373028, 50.217028);

    //setting map properties/options
    var mapOptions = {
        zoom: 14,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    //creating the map
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //creating and setting map marker
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        url: 'https://goo.gl/maps/L6TRDZsJ6PgwjL9a8',
        title: "Click to open google maps",
        icon: 'assets/ronda-logo.png'
    });

    //create event listener for marker
    google.maps.event.addListener(marker, 'click', function () {
        window.open(marker.url);
    });

    //styles for the map
    var styles = [{
        "featureType": "administrative",
        "stylers": [{
            "saturation": -100
        },
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "landscape",
        "stylers": [{
            "saturation": -100
        },
        {
            "lightness": 65
        },
        {
            "visibility": "on"
        }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [{
            "saturation": -100
        },
        {
            "lightness": 50
        },
        {
            "visibility": "simplified"
        }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [{
            "color": "#971b2f"
        },
        {
            "visibility": "simplified"
        }
        ]
    },
    {
        "featureType": "road",
        "stylers": [{
            "saturation": "-100"
        }]
    },
    {
        "featureType": "road.arterial",
        "stylers": [{
            "lightness": 30
        }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "road.highway",
        "stylers": [{
            "visibility": "simplified"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#53565a"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [{
            "color": "#ffffff"
        }]
    },
    {
        "featureType": "road.local",
        "stylers": [{
            "lightness": 40
        }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "transit",
        "stylers": [{
            "saturation": -100
        },
        {
            "visibility": "simplified"
        }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "hue": "#ffff00"
        },
        {
            "saturation": -97
        },
        {
            "lightness": -25
        }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [{
            "saturation": -100
        },
        {
            "lightness": -25
        }
        ]
    }
    ];


    map.setOptions({
        styles: styles
    });
};

