!function () { "use strict"; function n() { function e() { var n = { width: l.width / l.naturalWidth, height: l.height / l.naturalHeight }, i = { width: parseInt(window.getComputedStyle(l, null).getPropertyValue("padding-left"), 10), height: parseInt(window.getComputedStyle(l, null).getPropertyValue("padding-top"), 10) }; a.forEach(function (e, t) { var o = 0; s[t].coords = e.split(",").map(function (e) { var t = 1 == (o = 1 - o) ? "width" : "height"; return i[t] + Math.floor(Number(e) * n[t]) }).join(",") }) } function t(e) { return e.coords.replace(/ *, */g, ",").replace(/ +/g, ",") } function o() { clearTimeout(r), r = setTimeout(e, 250) } function n(e) { return document.querySelector('img[usemap="' + e + '"]') } var i = this, s = null, a = null, l = null, r = null; "function" == typeof i._resize ? i._resize() : (s = i.getElementsByTagName("area"), a = Array.prototype.map.call(s, t), l = n("#" + i.name) || n(i.name), i._resize = e, l.addEventListener("load", e, !1), window.addEventListener("focus", e, !1), window.addEventListener("resize", o, !1), window.addEventListener("readystatechange", e, !1), document.addEventListener("fullscreenchange", e, !1), l.width === l.naturalWidth && l.height === l.naturalHeight || e()) } function e() { function t(e) { e && (function (e) { if (!e.tagName) throw new TypeError("Object is not a valid DOM element"); if ("MAP" !== e.tagName.toUpperCase()) throw new TypeError("Expected <MAP> tag, found <" + e.tagName + ">.") }(e), n.call(e), o.push(e)) } var o; return function (e) { switch (o = [], typeof e) { case "undefined": case "string": Array.prototype.forEach.call(document.querySelectorAll(e || "map"), t); break; case "object": t(e); break; default: throw new TypeError("Unexpected data type (" + typeof e + ").") }return o } } "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : window.imageMapResize = e(), "jQuery" in window && (jQuery.fn.imageMapResize = function () { return this.filter("map").each(n).end() }) }(), function () { "use strict"; function e() { var r = window, c = document; if (!("scrollBehavior" in c.documentElement.style && !0 !== r.__forceSmoothScrollPolyfill__)) { var e, t = r.HTMLElement || r.Element, d = 468, m = { scroll: r.scroll || r.scrollTo, scrollBy: r.scrollBy, elementScroll: t.prototype.scroll || u, scrollIntoView: t.prototype.scrollIntoView }, f = r.performance && r.performance.now ? r.performance.now.bind(r.performance) : Date.now, o = (e = r.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(e) ? 1 : 0); r.scroll = r.scrollTo = function () { void 0 !== arguments[0] && (!0 !== n(arguments[0]) ? a.call(r, c.body, void 0 !== arguments[0].left ? ~~arguments[0].left : r.scrollX || r.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : r.scrollY || r.pageYOffset) : m.scroll.call(r, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : r.scrollX || r.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : r.scrollY || r.pageYOffset)) }, r.scrollBy = function () { void 0 !== arguments[0] && (n(arguments[0]) ? m.scrollBy.call(r, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : a.call(r, c.body, ~~arguments[0].left + (r.scrollX || r.pageXOffset), ~~arguments[0].top + (r.scrollY || r.pageYOffset))) }, t.prototype.scroll = t.prototype.scrollTo = function () { if (void 0 !== arguments[0]) if (!0 !== n(arguments[0])) { var e = arguments[0].left, t = arguments[0].top; a.call(this, this, void 0 === e ? this.scrollLeft : ~~e, void 0 === t ? this.scrollTop : ~~t) } else { if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted"); m.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop) } }, t.prototype.scrollBy = function () { void 0 !== arguments[0] && (!0 !== n(arguments[0]) ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior }) : m.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop)) }, t.prototype.scrollIntoView = function () { if (!0 !== n(arguments[0])) { var e = function (e) { for (; e !== c.body && !1 === (o = i(t = e, "Y") && s(t, "Y"), n = i(t, "X") && s(t, "X"), o || n);)e = e.parentNode || e.host; var t, o, n; return e }(this), t = e.getBoundingClientRect(), o = this.getBoundingClientRect(); e !== c.body ? (a.call(this, e, e.scrollLeft + o.left - t.left, e.scrollTop + o.top - t.top), "fixed" !== r.getComputedStyle(e).position && r.scrollBy({ left: t.left, top: t.top, behavior: "smooth" })) : r.scrollBy({ left: o.left, top: o.top, behavior: "smooth" }) } else m.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]) } } function u(e, t) { this.scrollLeft = e, this.scrollTop = t } function n(e) { if (null === e || "object" != typeof e || void 0 === e.behavior || "auto" === e.behavior || "instant" === e.behavior) return !0; if ("object" == typeof e && "smooth" === e.behavior) return !1; throw new TypeError("behavior member of ScrollOptions " + e.behavior + " is not a valid value for enumeration ScrollBehavior.") } function i(e, t) { return "Y" === t ? e.clientHeight + o < e.scrollHeight : "X" === t ? e.clientWidth + o < e.scrollWidth : void 0 } function s(e, t) { var o = r.getComputedStyle(e, null)["overflow" + t]; return "auto" === o || "scroll" === o } function a(e, t, o) { var n, i, s, a, l = f(); a = e === c.body ? (i = (n = r).scrollX || r.pageXOffset, s = r.scrollY || r.pageYOffset, m.scroll) : (i = (n = e).scrollLeft, s = e.scrollTop, u), function e(t) { var o, n, i, s, a = (f() - t.startTime) / d; s = a = 1 < a ? 1 : a, o = .5 * (1 - Math.cos(Math.PI * s)), n = t.startX + (t.x - t.startX) * o, i = t.startY + (t.y - t.startY) * o, t.method.call(t.scrollable, n, i), n === t.x && i === t.y || r.requestAnimationFrame(e.bind(r, t)) }({ scrollable: n, method: a, startTime: l, startX: i, startY: s, x: t, y: o }) } } "object" == typeof exports && "undefined" != typeof module ? module.exports = { polyfill: e } : e() }(), function (o, i) { var n = !1; function s(e) { var t = i.body, o = i.getElementById("master-plan-content").querySelector(".master-plan-image img"), n = ""; e.currentTarget.removeEventListener("mousemove", s), e.currentTarget.removeEventListener("touchstart", s), "mousemove" === e.type ? n = "assets/images/master-plan/00.jpg" : (t.classList.add("touch-supported"), n = "assets/images/master-plan/00.jpg", document.getElementById("bisak-area").src = "assets/images/master-plan/mp-mobile-bisak.png", document.getElementById("type-a-area").src = "assets/images/master-plan/mp-mobile-villa.png", document.getElementById("type-b-area").src = "assets/images/master-plan/mp-mobile-2-BA.png", document.getElementById("type-d-area").src = "assets/images/master-plan/mp-mobile-3-BA.png"), o.src = n } function t(e) { i.body.classList.remove("preload"), o.removeEventListener("load", t) } function e(e) { var t = i.querySelector("#master-plan-image > img").getBoundingClientRect(); (t.top <= o.innerHeight / 2 - t.height / 2 && t.bottom >= o.innerHeight / 2 || t.top <= o.innerHeight && t.bottom <= o.innerHeight) && (n || (n = !0, i.body.classList.contains("touch-supported") && (console.log("mp triggered"), i.querySelector(".master-plan-content").classList.add("mp-trigger")))) } o.addEventListener("mousemove", s), o.addEventListener("touchstart", s), o.addEventListener("load", t), i.getElementById("page-content").addEventListener("scroll", e) }(window, document), function (o) { function e(e) { var t = o.getElementById("logo-wrap"); 80 < e.target.scrollTop ? t.classList.add("hidden") : t.classList.remove("hidden") } o.getElementById("page-content").addEventListener("scroll", e) }((window, document)), function (e, t) { function i(o) { var n = t.getElementById("overview-text-list"), e = n.querySelectorAll(".overview-text-item"), i = 0; e.forEach(function (e, t) { t == o ? (i = e.querySelector("h3").offsetHeight, i += e.querySelector("p").offsetHeight, n.style.height = i + "px") : 2 == t && (n.style.height = i + "px") }) } function s(o) { t.querySelectorAll("#overview-text-list .overview-text-item").forEach(function (e, t) { o === t ? e.classList.add("shown") : e.classList.remove("shown") }) } function o(e) { var t, o = e.currentTarget.querySelectorAll(".overview-item"), n = e.target; n.classList.contains("overview-item") && (i(t = Array.prototype.indexOf.call(o, n)), s(t)) } function n(e) { s(-1), i(-1) } function a(e) { void 0 !== e.target.dataset.scrollTo && document.getElementById(e.target.dataset.scrollTo).scrollIntoView({ behavior: "smooth", block: "center" }) } function l(e) { e.currentTarget.removeEventListener("click", a), e.currentTarget.removeEventListener("touchStart", l) } var r; (r = t.getElementById("overview-selectors")).addEventListener("mouseenter", o, !0), r.addEventListener("mouseleave", n, !0), r.addEventListener("click", a), r.addEventListener("touchstart", l), e.addEventListener("resize", i), e.addEventListener("load", i) }(window, document); var infoModal = function () { function a(e) { for (var t = document.createElement("div"), o = null, n = 0; n < e.length; ++n)if (void 0 !== t.style[e[n]]) { o = e[n]; break } return o } function l(e, t) { for (var o, n, i, s, a, l, r, c, d, m = g[t], f = 0; f < m.length; f++)if (m[f].key === e) { o = m[f].value, y.infoIndex = f; break } i = (n = o).imagesDir, s = document.getElementById("info-thumbs-section"), a = n.plansDir, l = document.getElementById("info-plans-section"), r = document.getElementById("info-header"), c = document.getElementById("info-description"), d = document.createDocumentFragment(), y.numberOfImgs = n.images.length + n.plans.length, n.images.forEach(function (e, t) { var o = document.createElement("div"), n = document.createElement("img"); o.className = "thumbnail thumbnail-safari_only", n.className = "thumb-img", n.alt = "thumbnail image " + (t + 1), n.src = i + e, o.appendChild(n), s.insertBefore(o, s.firstChild), n.addEventListener("load", function () { p(u) }) }), r.innerHTML = n.title, c.innerHTML = n.description, d = document.createDocumentFragment(), n.plans.forEach(function (e, t) { var o = document.createElement("div"), n = document.createElement("img"); o.className = "thumbnail thumbnail-safari_only", n.className = "plans-img", n.alt = "thumbnail plan " + (t + 1), n.src = a + e, o.appendChild(n), d.appendChild(o), n.addEventListener("load", function () { p(u) }) }), l.insertBefore(d, l.firstChild) } function u() { var e = document.getElementById("info-box"), t = document.getElementById("info-box-close"); e.classList.add("info-box-shown"), t.classList.remove("info-close-show") } function e() { var e = document.getElementById("page-content"), t = document.getElementById("info-box"), o = document.getElementById("info-wrap"), n = document.getElementById("info-box-close"); (t = document.getElementById("info-box")).classList.remove("info-box-shown"), o.classList.remove("info-shown"), n.classList.remove("info-close-show"), e.classList.remove("no-scroll"), t.classList.remove("villa-info", "bc-info", "d-info") } function r(e) { var t = document.querySelector("#info-box-content .focused"); t != e && (t.classList.remove("focused"), e.classList.add("focused")) } function p(e) { var t = document.querySelector("#loading-bar span"), o = a(["transform", "webkitTransform", "MozTransfom", "msTransform", "OTransform"]); y.imgsLoadedCount += 1, t.style[o] = "translateX(" + y.imgsLoadedCount / y.numberOfImgs * 100 + "%)", y.imgsLoadedCount >= y.numberOfImgs && (e(), t.style[o] = "", y.imgsLoadedCount = 0) } function t(e) { r(e.currentTarget) } function o(e) { var t = document.getElementById("info-box"); t.classList.contains("info-box-shown") || e.target !== t || (t.classList.remove("facilities-info"), function () { for (var e = document.getElementById("info-thumbs-section"), t = document.getElementById("info-plans-section"), o = document.getElementById("info-header"), n = document.getElementById("info-description"); e.children && !e.children[0].classList.contains("info-section-button");)e.removeChild(e.children[0]); for (; t.children && !t.children[0].classList.contains("info-section-button");)t.removeChild(t.children[0]); o.innerText = "", n.innerText = "", y.numberOfInfoImgs = 0, y.numberOfPlansImgs = 0, y.imgsLoadedCount = 0, y.plansLoadedCount = 0; var i = document.querySelector("#loading-bar span"), s = a(["transform", "webkitTransform", "MozTransfom", "msTransform", "OTransform"]); i.style[s] = "", r(document.getElementById("info-text-section")) }()) } var n, i, s, c, d, m, g = { units: [{ key: "type-a", value: { title: "VILLA", description: "The <b>three-bedroom villa</b> offers the peace and tranquility of modern urban living. These units provide spacious and expansive home for socializing and family gatherings.", imagesDir: "assets/images/master-plan/villa/", images: ["1.jpg", "2.jpg"], plansDir: "assets/images/master-plan/villa/plans/", plans: ["ground-floor.jpg", "1st-floor.jpg", "2nd-floor.jpg"] } }, { key: "type-b", value: { title: "STUDIO AND TWO BEDROOM APARTMENTS", description: "With the idea of ease at mind, these <b>studio & two-bedroom apartment</b> were created to offer a unique high-quality housing standard for the Ronda residents.", imagesDir: "assets/images/master-plan/2-ba/", images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"], plansDir: "assets/images/master-plan/2-ba/plans/", plans: ["studio.jpg", "1st-floor.jpg", "1st-floor-middle-apt.jpg", "penthouse.jpg"] } }, { key: "type-d", value: { title: "THREE BEDROOM APARTMENTS", description: "The <b>three-bedroom apartments</b> at Ronda offer spacious living and dining areas, kitchens, and modern furnishings. Along with subtle colors and luxury touches, these units ensure a premium finish.", imagesDir: "assets/images/master-plan/3-ba/", images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"], plansDir: "assets/images/master-plan/3-ba/plans/", plans: ["ground-floor.jpg", "ground-1st-floor.jpg", "penthouse.jpg"] } }] }, y = { jsonObj: {}, numberOfImgs: 0, imgsLoadedCount: 0, numberOfInfoImgs: 0, numberOfPlansImgs: 0, plansLoadedCount: 0, infoIndex: -1 }; return n = document.getElementById("info-box"), i = document.getElementById("info-text-section"), s = document.getElementById("info-thumbs-section"), c = document.getElementById("info-plans-section"), d = document.getElementById("info-box-close"), m = document.getElementById("box-close"), n.addEventListener("transitionend", o), i.addEventListener("click", t), s.addEventListener("click", t), c.addEventListener("click", t), d.addEventListener("click", e), m.addEventListener("click", e), { infoInit: function (e) { var t = e.target; "AREA" === t.tagName && "bisak" != t.dataset.id && (e.preventDefault(), function (e, t) { var o = document.getElementById("page-content"), n = document.getElementById("info-wrap"), i = document.getElementById("info-box-close"), s = document.getElementById("info-box"); switch (n.classList.add("info-shown"), i.classList.add("info-close-show"), o.classList.add("no-scroll"), e) { case "type-a": s.classList.add("villa-info"); break; case "type-b": s.classList.add("bc-info"); break; case "type-d": s.classList.add("d-info"); break; default: s.classList.add("villa-info") }l(e, t) }(t.dataset.id, "units")) } } }(); function initMap() { var e = new google.maps.LatLng(26.373028, 50.217028), t = { zoom: 14, center: e, mapTypeId: google.maps.MapTypeId.ROADMAP, disableDefaultUI: !0 }, o = new google.maps.Map(document.getElementById("map"), t), n = new google.maps.Marker({ position: e, map: o, url: "https://goo.gl/maps/L6TRDZsJ6PgwjL9a8", title: "Click to open google maps", icon: "assets/ronda-logo.png" }); google.maps.event.addListener(n, "click", function () { window.open(n.url) }); o.setOptions({ styles: [{ featureType: "administrative", stylers: [{ saturation: -100 }, { visibility: "off" }] }, { featureType: "administrative.province", stylers: [{ visibility: "off" }] }, { featureType: "landscape", stylers: [{ saturation: -100 }, { lightness: 65 }, { visibility: "on" }] }, { featureType: "poi", stylers: [{ saturation: -100 }, { lightness: 50 }, { visibility: "simplified" }] }, { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }, { featureType: "poi.business", elementType: "labels", stylers: [{ color: "#971b2f" }, { visibility: "simplified" }] }, { featureType: "road", stylers: [{ saturation: "-100" }] }, { featureType: "road.arterial", stylers: [{ lightness: 30 }] }, { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { featureType: "road.highway", stylers: [{ visibility: "simplified" }] }, { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#53565a" }] }, { featureType: "road.highway", elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { featureType: "road.highway", elementType: "labels.text", stylers: [{ color: "#ffffff" }] }, { featureType: "road.local", stylers: [{ lightness: 40 }] }, { featureType: "road.local", elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { featureType: "transit", stylers: [{ saturation: -100 }, { visibility: "simplified" }] }, { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { featureType: "water", elementType: "geometry", stylers: [{ hue: "#ffff00" }, { saturation: -97 }, { lightness: -25 }] }, { featureType: "water", elementType: "labels", stylers: [{ saturation: -100 }, { lightness: -25 }] }] }) } !function (s, e) { function t(e) { var t, o, n = e.target; if ("AREA" === n.tagName) { n.classList.toggle("selected"); var i = function (e) { switch (e) { case "type-a": case "type-b": case "type-d": case "bisak": return { mpImageId: e + "-area", detailId: e + "-detail" }; default: return null } }(n.dataset.id); i && (o = i.mpImageId, s.getElementById(o).classList.toggle("hovered"), t = i.detailId, s.getElementById(t).classList.toggle("detail-shown")) } } var o; (o = s.getElementById("image-map")).addEventListener("mouseover", t), o.addEventListener("mouseout", t), o.addEventListener("click", e.infoInit, !0), imageMapResize(o) }((window, document), infoModal), window.addEventListener("load", initMap);