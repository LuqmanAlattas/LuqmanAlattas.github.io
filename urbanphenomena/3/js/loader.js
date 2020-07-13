(function () {
    TweenLite.set(['.logo', '.sections-list li', '.nav-burger'], {
        autoAlpha: 0
    });

    function initPage() {
        new TimelineLite()
            .to('.logo', 0.5, {
                autoAlpha: 1
            }, '+=1')
            .to('.sections-list li', 0.5, {
                autoAlpha: 1
            })
            .set('.sections-list li:first-child', {
                className: '+=on'
            }, '+=1');
    }
    window.addEventListener('load', initPage);
})();
