$(window).on("load", function() {
    slider({
        id: "carousel",
        interval: 2000, // Default 3500
        duration: 1000, // Default 1000
        //effect: "fade", // Default slide left
        banEffect: "fade", // Default none
        banDuration: 1000, // Default 1000
        pager: true, // Default true
        arrows: true, // Default true
        banner: true // Default true
    });
});