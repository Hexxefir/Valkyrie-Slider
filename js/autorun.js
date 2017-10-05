$(window).on("load", function() {
    slider({
        id: "carousel",
        interval: 7000, // Default 3500
        duration: 2500, // Default 1000
        effect: "fade", // Default slide left
        banEffect: "flipY", // Default none
        banDuration: 1000, // Default 1000
        pager: true, // Default true
        arrows: true, // Default true
        banner: true // Default true
    });
});