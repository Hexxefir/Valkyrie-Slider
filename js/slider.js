var run;
var posCallback;

function slider(slider) {
    var slideshow = slider.slideshow = $('#' + slider.id);
    var banEff = slider.banEffect, pager = slider.pager, arrows = slider.arrows;
    slider.ACT_COLOR = "#a8a5a5"; // Active dot color
    slider.COLOR = "white"; // Passive color
    slideshow.find('> div:parent').addClass("slide"); // Adding class slide for each slide.
    slideshow.find('.slide > div:last-of-type').addClass("banner");
    var count = slider.count = slideshow.find('.slide').length; // Defines how many slides we have in slideshow.
    var maxWidth = slider.imgWidth = slideshow.find("img:first").prop('naturalWidth'); // Slides max-width
    var maxHeight = slider.imgHeight = slideshow.find("img:first").prop('naturalHeight'); // Slides max-height
    slider.zBack = false;
    slider.page = false;

    // Default parameters value
    if(typeof(slider.interval) === "undefined") // Time slide stay.
        slider.interval = 3500;
    if(typeof(slider.duration) === "undefined") // Transition time between each slide.
        slider.duration = 1000;
    if(typeof(slider.banDuration) === "undefined") // Banner transition time of each slide.
        slider.banDuration = 1000;
    if(typeof(slider.banner) === "undefined")
        slider.banner = true;
    if(typeof(pager) === "undefined")
        pager = true;
    if(typeof(arrows) === "undefined")
        arrows = true;

    console.log(slider.interval + " " + slider.duration + " " + slider.banDuration + " " + slider.banner + " " + pager + " " + arrows);

    if((banEff === "" || banEff === "none" || typeof(banEff) === "undefined") && slider.banner) // console.log(ban);
        slideshow.find('.banner').show();
    else if(!slider.banner)
        slideshow.find('.banner').hide();

    // Previous, next btn construction
    if(arrows)
        ssBtnsConst(slideshow);

    // Pager
    if (pager)
        pagerConst(slider); // Pager construction
    else
        slideshow.find('nav').css("display", "none");

    // We set container dimensions with first image dimensions.
    slideshow.width(slideshow.find('img:first').width()).height(slideshow.find('img:first').height());

    runSlides(slider);

    // Stop slider on hover event if we have arrows, pager or both visible.
    if(slider.arrows !== false && slider.pager !== false) {
        slideshow.hover(function () {
            clearInterval(run);
            slideshow.find('.ssBtn-left').css("background",
                "linear-gradient(to right, rgba(105,105,105,0.65) 0%,rgba(0,0,0,0) 100%)");
            slideshow.find('.ssBtn-right').css("background",
                "linear-gradient(to left, rgba(105,105,105,0.65) 0%,rgba(0,0,0,0) 100%)");
        }, function () {
            slider.callback = true;
            runSlides(slider);
            slideshow.find('.ssBtn-left').css("background", "rgba(0,0,0,0)");
            slideshow.find('.ssBtn-right').css("background", "rgba(0,0,0,0)");
        });
    }

    // Next btn click event
    slideshow.find('.ssBtn-right').click(function() {
        if(typeof(posCallback) === "undefined" || posCallback <= 0)
            slider.j = count;
        else
            slider.j = posCallback;

        next(slider);
    });

    // Previous btn click event
    slideshow.find('.ssBtn-left').click(function() {
        if(typeof(posCallback) === "undefined" || posCallback <= 0)
            posCallback = count;
        else if(posCallback > count)
            posCallback = 1;

        previous(slider);
    });

    // Pager dot click event
    slideshow.find('.pagerDot').click(function() {
        if(typeof(posCallback) === "undefined" || posCallback <= 0)
            posCallback = count;

        clickPagerDot($(this).index() + 1, slider);
    });

    // Make slider responsive.
    $(window).resize(function() {
        if($(window).width() < maxWidth || $(window).height() < maxHeight) {

            slideshow.width(slideshow.find('img:first').width()).height(slideshow.find('img:first').height());

        }

        if($(window).width() >= maxWidth && $(window).height() >= maxHeight)
            slideshow.width(maxWidth).height(maxHeight);
    });
}

/* Next, previous btn construction */
function ssBtnsConst(slideshow) {
    var angleLeft = $('<i/>').attr({"class": "fa fa-angle-left", "aria-hidden": "true"});
    var angleRight = $('<i/>').attr({"class": "fa fa-angle-right", "aria-hidden": "true"});
    var prevBtn = $('<button/>').attr("class", "ssBtn ssBtn-left").css("left", "0").append(angleLeft);
    var nextBtn = $('<button/>').attr("class", "ssBtn ssBtn-right").css("right", "0").append(angleRight);

    slideshow.append(prevBtn).append(nextBtn);
}

/* Pager construction */
function pagerConst(slider) {
    var ACT_COLOR = "#a8a5a5"; // Active dot color
    var COLOR = "white";
    var slideshow = slider.slideshow;
    var count = slider.count;

    var spaces = "&nbsp;&nbsp;";

    for(var i = 0; i < count; i++) {
        var dot = $('<i/>').attr({"role": "button", "class": "fa fa-circle pagerDot", "aria-hidden": "true"});
        slideshow.find('nav').append(dot).css("color", COLOR);

        if(i < count - 1)
            slideshow.find('nav').append(spaces).css("color", COLOR);

    }

    $('.slider nav i:first').css("color", ACT_COLOR);
}

function runSlides(slider) {
    // Slideshow initialization after pause.
    if(slider.callback) {
        if(typeof(posCallback) === "undefined")
            slider.j = slider.count;
        else if(posCallback > slider.count)
            slider.j = 1;
        else
            slider.j = posCallback;

        // Define active dot position after a slide position callback.
        slider.i = slider.j - (slider.count + 1);
        slider.i = Math.abs(slider.i);
    } else {
        slider.i = 1;
        slider.j = slider.count;
    }

    run = setInterval(function () {
        next(slider);
    }, slider.interval);
}

// Go to next slide.
function next(slider) {
    if(slider.j === 1) {
        $('#' + slider.id + ' .slide:nth-child(1)').css("z-index", 3);
        $('#' + slider.id + ' .slide:nth-child(' + slider.count + ')').css("z-index", 2);
    }

    // Set last element as first visible.
    if (slider.j === slider.count)
        $('#' + slider.id + ' .slide:nth-child(' + slider.j + ')').css("z-index", 3);

    // Define slide to animate.
    slider.current = '#' + slider.id + ' .slide:nth-child(' + slider.j + ')';
    slider.pos = slider.j;

    defineEffect(slider);

    // We changing active dot color.
    slider.slideshow.find('.pagerDot:nth-child(' + slider.i + ')').css("color", slider.COLOR);

    slider.j--; // Slide selected
    posCallback = slider.j; // For slides positions callback after slideshow pause.

    slider.i++; // Pager dot selected

    if(slider.i > slider.count) {
        slider.slideshow.find('.pagerDot:nth-child(' + slider.count + ')').css("color", slider.COLOR);
        slider.i = 1;
        slider.slideshow.find('.pagerDot:nth-child(' + slider.i + ')').css("color", slider.ACT_COLOR);
    }

    slider.slideshow.find('.pagerDot:nth-child(' + slider.i + ')').css("color", slider.ACT_COLOR);

    var slide = slider.slideshow.find('.slide:nth-child(' + slider.j + ')');

    // We set visibility order.
    if (slider.j > 1) {
        slide.css("z-index", 3);
        var temp = slider.j - 1;
        $('#' + slider.id + ' .slide:nth-child(' + temp + ')').css("z-index", 2);
    } else if (slider.j === 1) {
        slide.css("z-index", 3);
        $('#' + slider.id + ' .slide:nth-child(' + slider.count + ')').css("z-index", 2);
    } else if (slider.j <= 0) {
        $('#' + slider.id + ' .slide:nth-child(' + slider.count + ')').css("z-index", 2);
        slider.j = slider.count;
    }
}

// Go back to previous slide.
function previous(slider) {
    var j = posCallback;
    var prev = j + 1;
    var secPrev = prev + 1;

    $('#' + slider.id + ' .slide:nth-child(' + j + ')').css("z-index", 3);

    if(prev > slider.count)
        prev = 1;

    if(secPrev > slider.count && prev > slider.count)
        secPrev = 2;
    else if (secPrev > slider.count)
        secPrev = 1;

    $('#' + slider.id + ' .slide:nth-child(' + prev + ')').css("z-index", 2);

    for(var k = 1; k <= slider.count; k++) {
        if(k !== j && k !== prev)
            $('#' + slider.id + ' .slide:nth-child(' + k + ')').css("z-index", 1);
    }

    slider.zBack = true;
    slider.current = '#' + slider.id + ' .slide:nth-child(' + j + ')';
    slider.prev = '#' + slider.id + ' .slide:nth-child(' + prev + ')';
    slider.secPrev = '#' + slider.id + ' .slide:nth-child(' + secPrev + ')';
    slider.pos = j;

    defineEffect(slider); // Slide transition

    j++;
    posCallback = j; // Position of current slide

    // Active dot position calculation
    var i = j - (slider.count + 1);
    i = Math.abs(i);

    if(i <= 0)
        i = slider.count;

    var l = i + 1; // Previous dot position

    if(l > slider.count)
        l = 1;

    slider.slideshow.find('.pagerDot:nth-child(' + l + ')').css("color", slider.COLOR);
    slider.slideshow.find('.pagerDot:nth-child(' + i + ')').css("color", slider.ACT_COLOR);
}

function clickPagerDot(index, slider) {
    // Calculation of active slide position
    var j = index - (slider.count + 1);
    j = Math.abs(j);

    // Define if slider must runs reverse side when is paging (For some effects only).
    if(j > posCallback)
        slider.reverse = true;

    // Calculation of previous pager dot
    var prevDot = posCallback - (slider.count + 1);
    prevDot = Math.abs(prevDot);

    $('#' + slider.id + ' .slide:nth-child(' + posCallback + ')').css("z-index", 3);

    for(var l = 1; l <= slider.count; l++) {
        if(l !== posCallback)
            $('#' + slider.id + ' .slide:nth-child(' + l + ')').css("z-index", 1);
    }

    slider.slideshow.find('.slide:nth-child(' + j + ')').css("z-index", 2);

    // To prevent animation bugs when slider start again.
    slider.current = '#' + slider.id + ' .slide:nth-child(' + posCallback + ')';
    slider.prev = '#' + slider.id + ' .slide:nth-child(' + j + ')';
    slider.secPrev = '#' + slider.id + ' .slide:nth-child(' + (j - 1) + ')';
    slider.zBack = true;
    slider.page = true;

    slider.slideshow.find('.pagerDot:nth-child(' + index + ')').css("color", slider.ACT_COLOR);
    slider.slideshow.find('.pagerDot:nth-child(' + prevDot + ')').css("color", "#ffffff");

    slider.prevPos = posCallback;
    slider.pos = posCallback = j;

    defineEffect(slider);
}

// Modify z-index on previous button and dot click event.
function zIndexCall(slider) {
    var slideshow = slider.slideshow;

    if((slider.pos === 1 && !slider.zBack) || (slider.pos === slider.count && slider.page)) {
        slideshow.find('.slide:nth-child(' + slider.count + ')').css("z-index", 3);
        slideshow.find('.slide:nth-child(' + (slider.count - 1) + ')').css("z-index", 2);
    } else if(slider.pos === 1 && slider.page) {
        slideshow.find('.slide:nth-child(1)').css("z-index", 3);
        slideshow.find('.slide:nth-child(' + slider.count + ')').css("z-index", 2);
    } else if(slider.pos === slider.count && slider.zBack && !slider.page) {
        slideshow.find('.slide:nth-child(1)').css("z-index", 3);
        slideshow.find('.slide:nth-child(2)').css("z-index", 2);
    } else if(slider.zBack) {
        $(slider.prev).css("z-index", 3);
        $(slider.secPrev).css("z-index", 2);
    }

    slider.reverse = slider.page = slider.zBack = false;
}

// Define slides transition effect.
function defineEffect(slider) {
    var effect = slider.effect;
    var duration = slider.duration;
    var width = slider.imgWidth;
    var height = slider.imgHeight;
    var current = $(slider.current);
    var zBack = slider.zBack;
    var page = slider.page;
    var ban = slider.banner;
    var hiddenBan, pos;

    if(zBack && !page)
        pos = slider.pos;
    else if(page)
        pos = slider.prevPos;
    else
        pos = slider.pos;

    hiddenBan = slider.slideshow.find('.slide:nth-child(' + pos + ') > .banner');

    // Reverse side, when reaching a previous slide.
    if((zBack && !page) || slider.reverse) {
        switch(effect) {
            case 'slideRight':
                effect = 'slideLeft';
                break;
            case 'slideUp':
                effect = 'slideDown';
                break;
            case 'slideDown':
                effect = 'slideUp';
                break;
            case 'slideLeftFade':
                effect = 'slideRightFade';
                break;
            case 'slideRightFade':
                effect = 'slideLeftFade';
                break;
            case 'slideUpFade':
                effect = 'slideDownFade';
                break;
            case 'slideDownFade':
                effect = 'slideUpFade';
                break;
            case 'bounceLeft':
                effect = 'bounceRight';
                break;
            case 'bounceRight':
                effect = 'bounceLeft';
                break;
            case 'bounceUp':
                effect = 'bounceDown';
                break;
            case 'bounceDown':
                effect = 'bounceUp';
                break;
            case 'perspectiveLeft':
                effect = 'perspectiveRight';
                break;
            case 'perspectiveRight':
                effect = 'perspectiveLeft';
                break;
            case 'perspectiveUp':
                effect = 'perspectiveDown';
                break;
            case 'perspectiveDown':
                effect = 'perspectiveUp';
                break;
            default:
                if(effect === "" || typeof(effect) === "undefined" || effect === "slideLeft")
                    effect = 'slideRight';
                break;
        }
    }

    switch(effect) {
        case 'slideRight':
            current.velocity({translateX: width + "px"}, {duration: duration}).velocity({zIndex: "1"}, function() {
                current.velocity({translateX: "0px"}, 0);

                if(slider.banEffect !== "" && typeof(slider.banEffect) !== "undefined" && ban) {
                    hiddenBan.hide();
                    defineBanEffect(slider);
                }

                zIndexCall(slider);
            });
            break;
        case 'slideUp':
            current.velocity({translateY: "-" + height + "px"}, {duration: duration}).velocity({zIndex: "1"},
                function() {
                    current.velocity({translateY: "0px"}, 0);

                    if(slider.banEffect !== "" && typeof(slider.banEffect) !== "undefined" && ban) {
                        hiddenBan.hide();
                        defineBanEffect(slider);
                    }

                    zIndexCall(slider);
                });
            break;
        case 'slideDown':
            current.velocity({translateY: height + "px"}, {duration: duration}).velocity({zIndex: "1"}, function() {
                current.velocity({translateY: "0px"}, 0);

                if(slider.banEffect !== "" && typeof(slider.banEffect) !== "undefined" && ban) {
                    hiddenBan.hide();
                    defineBanEffect(slider);
                }

                zIndexCall(slider);
            });
            break;
        case 'slideLeftFade':
            current.velocity('transition.slideLeftBigOut', duration).velocity({zIndex: "1"}, function() {
                current.velocity('transition.slideLeftBigIn', 0);

                if(slider.banEffect !== "" && typeof(slider.banEffect) !== "undefined" && ban) {
                    hiddenBan.hide();
                    defineBanEffect(slider);
                }

                zIndexCall(slider);
            });
            break;
        case 'slideRightFade':
            current.velocity('transition.slideRightBigOut', duration).velocity({zIndex: "1"}, function() {
                current.velocity('transition.slideRightBigIn', 0);

                if(slider.banEffect !== "" && typeof(slider.banEffect) !== "undefined" && ban) {
                    hiddenBan.hide();
                    defineBanEffect(slider);
                }

                zIndexCall(slider);
            });
            break;
        case 'slideUpFade':
            current.velocity('transition.slideUpBigOut', duration).velocity({zIndex: "1"}, function() {
                current.velocity('transition.slideUpBigIn', 0);

                if(slider.banEffect !== "" && typeof(slider.banEffect) !== "undefined" && ban) {
                    hiddenBan.hide();
                    defineBanEffect(slider);
                }

                zIndexCall(slider);
            });
            break;
        case 'slideDownFade':
            current.velocity('transition.slideDownBigOut', duration).velocity({zIndex: "1"}, function() {
                current.velocity('transition.slideDownBigIn', 0);

                if(slider.banEffect !== "" && typeof(slider.banEffect) !== "undefined" && ban) {
                    hiddenBan.hide();
                    defineBanEffect(slider);
                }

                zIndexCall(slider);
            });
            break;
        case 'fade':
        case 'flipX':
        case 'flipY':
        case 'flipBounceX':
        case 'flipBounceY':
        case 'swoop':
        case 'whirl':
        case 'shrink':
        case 'expand':
        case 'bounce':
        case 'bounceLeft':
        case 'bounceRight':
        case 'bounceUp':
        case 'bounceDown':
        case 'perspectiveLeft':
        case 'perspectiveRight':
        case 'perspectiveUp':
        case 'perspectiveDown':
            var transitionOut = 'transition.' + effect + 'Out';
            var transitionIn = 'transition.' + effect + 'In';

            current.velocity(transitionOut, 1000).velocity({zIndex: "1"}, function() {
                current.velocity(transitionIn, 0);
                ifBan(hiddenBan, slider);
                zIndexCall(slider);
            });
            break;
        default:
            current.velocity({translateX: "-" + width + "px"}, {duration: duration}).velocity({zIndex: "1"},
                function() {
                    current.velocity({translateX: "0px"}, 0);

                    if(slider.banEffect !== "" && typeof(slider.banEffect) !== "undefined" && ban) {
                        hiddenBan.hide();
                        defineBanEffect(slider);
                    }
                    zIndexCall(slider);
                }
            );
            break;
    }
}

// Control if banner animations must be started.
function ifBan(hiddenBan, slider) {
    var ban = slider.banner;
    var banEffect = slider.banEffect;

    if(ban && banEffect && banEffect !== "none") {
        switch(banEffect) {
            case 'slideLeftFade':
            case 'slideRightFade':
            case 'slideUpFade':
            case 'slideDownFade':
            case 'fade':
            case 'flipX':
            case 'flipY':
            case 'flipBounceX':
            case 'flipBounceY':
            case 'swoop':
            case 'whirl':
            case 'shrink':
            case 'expand':
            case 'bounce':
            case 'bounceLeft':
            case 'bounceRight':
            case 'bounceUp':
            case 'bounceDown':
            case 'perspectiveLeft':
            case 'perspectiveRight':
            case 'perspectiveUp':
            case 'perspectiveDown':
                hiddenBan.hide();
                defineBanEffect(slider);
                break;
        }
    }
}

function defineBanEffect(slider) {
    var banDuration = slider.banDuration;
    var effect = slider.banEffect;
    var banner, pos;

    // Define which banner to animate.
    if(slider.zBack && !slider.page) {
        pos = slider.pos + 1;

        if(pos === slider.count + 1)
            pos = 1;
    } else if(slider.pos === 1 && !slider.page)
        pos = slider.count;
    else if(slider.page)
        pos = slider.pos;
    else
        pos = slider.pos - 1;

    banner = slider.slideshow.find('.slide:nth-child(' + pos + ') > .banner');

    // We apply a default banner transition duration.
    if(banDuration > slider.interval)
        banDuration = slider.interval;

    if(typeof(banDuration) === "undefined" || banDuration === "")
        banDuration = slider.interval / 2;

    switch(slider.banEffect) {
        case 'slideLeftFade':
            banner.velocity('transition.slideLeftBigIn', banDuration);
            break;
        case 'slideRightFade':
            banner.velocity('transition.slideRightBigIn', banDuration);
            break;
        case 'slideUpFade':
            banner.velocity('transition.slideUpBigIn', banDuration);
            break;
        case 'slideDownFade':
            banner.velocity('transition.slideDownBigIn', banDuration);
            break;
        case 'fade':
        case 'flipX':
        case 'flipY':
        case 'flipBounceX':
        case 'flipBounceY':
        case 'swoop':
        case 'whirl':
        case 'shrink':
        case 'expand':
        case 'bounce':
        case 'bounceLeft':
        case 'bounceRight':
        case 'bounceUp':
        case 'bounceDown':
        case 'perspectiveLeft':
        case 'perspectiveRight':
        case 'perspectiveUp':
        case 'perspectiveDown':
            var transitionIn = 'transition.' + effect + 'In';
            banner.velocity(transitionIn, {duration: slider.banDuration, display: "block"});
            break;
    }
}