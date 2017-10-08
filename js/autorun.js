$(window).on("load", function() {
    slider({
        id: "carousel",
        interval: 4000, // Default 3500
        duration: 1500, // Default 1000
        effect: "fade", // Default slide left
        banEffect: "slideRightFade", // Default none
        banDuration: 2000, // Default 1000, can't be longer than interval.
        pager: true, // Default true
        arrows: true, // Default true
        banner: true, // Default true
        hoverStop: true // false
    });
});