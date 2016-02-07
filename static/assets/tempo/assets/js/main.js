$(document).ready(function () {

    /* ======= jQuery Placeholder ======= */
    $('input, textarea').placeholder();

    /* ======= jQuery FitVids - Responsive Video ======= */
    $(".video-container").fitVids();

    /* ======= Header Background Slideshow - Flexslider ======= */

    $('#bg-slider').flexslider({
        animation: "fade",
        directionNav: false, //remove the default direction-nav - https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
        controlNav: false, //remove the default control-nav
        slideshowSpeed: 6000
    });

    /* ======= FAQ accordion ======= */

    function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find('.panel-title a')
            .toggleClass('active')
            .find("i.fa")
            .toggleClass('fa-plus-square fa-minus-square');
    }

    $('.panel').on('hidden.bs.collapse', toggleIcon);
    $('.panel').on('shown.bs.collapse', toggleIcon);
});