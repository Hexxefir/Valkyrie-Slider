# Valkyrie-Slider
Slider powered by velocity.js motion engine for you websites. Very customizable slider, highly responsive, with many effects and perfect smooth transitions.

## Dependency
- jQuery 3.2.1
- Velocity 1.5.0
- Velocity UI 5.2.0
- Font Awesome 4.7.0
All of these come with Valkyrie-Slider package, but you can delete them and use CDN links too.

## Get Started
In .html file
```
<div id="carousel" class="slider">
        <div> // Slide div 5
            <img src="./img/Slideshow/slide5.jpg"/>
            <div>
                <span>Incredible Beauty</span>
            </div>
        </div>
        
        <div> // Slide div 4
            <img src="./img/Slideshow/slide4.jpg"/>
            <div>
                <span>Elephant</span>
            </div>
        </div>
        
        <div> // Slide div 3
            <img src="./img/Slideshow/slide3.jpg" alt="Swimming"/>
            <div>
                <i class="fa fa-heartbeat fa-3x" aria-hidden="true"></i>
                <span>Swimming</span>
                <i class="fa fa-heartbeat fa-3x" aria-hidden="true"></i>

            </div>
        </div>
        
        <div> // Slide div 2
            <img src="./img/Slideshow/slide2.jpg" alt="Healthy Woman"/>
            <div>
                <span>Healthy Woman</span>
            </div>
        </div>
        
        <div> // Slide div 1
            <img src="./img/Slideshow/slide1.jpg" alt="City by Night"/>
            <div>
                <img src="./img/Slideshow/cityIcon.png" alt="City by Night Icon"/>
                <span>City by Night</span>
            </div>
        </div>
    </div>
```
**Class slider and a id are required.** The order of slides start by last one as comments show you. Last div inside each slide are 
banners. If you want insert more divs for more images or text, insert them before. **The background image or biggest one must be 
inserted as first child in a slide.**

In .js file
...
$(window).on("load", function() { // .ready() is deprecated in jQuery 3, this is the right syntax now.
    slider({
        id: "carousel",
        interval: 4000, // Default 3500
        duration: 1500, // Default 1000
        effect: "fade", // Default slideLeft
        banEffect: "slideRightFade", // Default none
        banDuration: 2000, // Default 1000, can't be longer than interval.
        pager: true, // Default true
        arrows: true, // Default true
        banner: true, // Default true
        hoverStop: true // Default false
    });
});
...
The only parameter required is id. Default value will be apply for all other missing parameters.

## Parameters
* interval - How many time in ms, a slide stays before changing to another.
* duration - How many time in ms, a slide takes for is transition.
* effect - Slides transition effect
* banEffect - Banners transition effect
* banDuration - How many time in ms, a banner takes for is transition. (Must have banEffect to be effective.)
* pager - Set pager visible or not.
* arrows - Set arrows visible or not.
* Set banners visible or not.
* hoverStop - Slider stop when mouse is over.

## Slide Effects
* slideLeft (default)
* slideRight
* slideUp
* slideDown
* slideLeftFade
* slideRightFade
* slideUpFade
* slideDownFade
* fade
* flipX
* flipY
* flipBounceX
* flipBounceY
* swoop
* whirl
* shrink
* expand
* bounce
* bounceLeft
* bounceRight
* bounceUp
* bounceDown
* perspectiveLeft
* perspectiveRight
* perspectiveUp
* perspectiveDown

## Banner Effects
Same as slide exept slideLeft, slideRight, slideUp, slideDown.

## Files not required
Autorun.js, slider.html, img directory and lib directory. Autorun.js, slider.html and img directory are useful only as exemple
to make some tests before embeded Valkyrie-Slider into your project. Lib directory can be deleted too, if you using CDN version
of these librairies or other sources.

## CDN Links
* Velocity - https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.js or 
https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.min.js
* Velocity UI - https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.ui.js or
https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.ui.min.js
* jQuery - https://code.jquery.com/jquery-3.2.1.js or https://code.jquery.com/jquery-3.2.1.min.js
* Font Awesome - https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css or
https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css
