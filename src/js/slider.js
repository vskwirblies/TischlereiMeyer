/* 
Anzeigensteuerung für die Slideshow, eingesetzt im Bereich Kundenstimmen.
Autor: Valentin Skwirblies
Inspiration: https://www.mediaevent.de/javascript/simple-lightbox.html
*/

(function() {
    const createSlider = function(options) {
        const slider = {
            init: function(options) {
                this.currentSlide = options.startingSlide;
                this.container = options.container;
                this.slides = this.container.querySelectorAll(".slide");
                this.slideshow = options.slideshow;
                
                this.prepareContainer(options);
                this.createControlpanel();
                this.gotoSlide(this.currentSlide);

                const that = this;
                setTimeout(function() {
                    that.setSlideTransitionsActive(options.slideTransitionsOn);
                }, 500);

                setInterval(function() {
                    if (that.slideshow) {
                        that.nextSlide();
                    }
                }, 5000);
            },

            /**
             * Setzt die Styles und das Verhalten des Containers, der die Slideshow beinhalten soll.
             */
            prepareContainer: function(options) {
                this.container.classList.add("slider");
                this.container.style.height = options.height + "px";
                const that = this;
                this.container.onmouseover = function() {
                    that.slideshow = false;
                }
                this.container.onmouseleave = function() {
                    that.slideshow = options.slideshow;
                }
            },

            /**
             * Erstellt ein Controlpanel zur Steuerung der anzuzeigenden Slides.
             */
            createControlpanel: function() {
                const that = this;
                const controlpanel = document.createElement("div");
                controlpanel.classList.add("controlpanel");

                const prevButton = document.createElement("button");
                prevButton.classList.add("prevbutton");
                prevButton.onclick = function() {
                    that.previousSlide();
                };
                controlpanel.appendChild(prevButton);

                const dots = [];

                for (let i = 0; i < this.slides.length; i++) {
                    const button = document.createElement("button");
                    button.classList.add("dot");
                    if (i === this.currentSlide) {
                        button.classList.add("active");
                    }
                    dots.push(button);

                    button.onclick = function() {
                        that.gotoSlide(i);
                        dots.forEach(function(dot) {
                            dot.classList.remove("active");
                        });
                        this.classList.add("active");
                    };
                    
                    controlpanel.appendChild(button);
                }

                const nextButton = document.createElement("button");
                nextButton.classList.add("nextbutton");
                nextButton.onclick = function() {
                    that.nextSlide();
                };
                controlpanel.appendChild(nextButton);

                this.container.appendChild(controlpanel);
            },

            /**
             * Lässt die Slides sich mit einer Transition bewegen (stellt den Slideshow-Effekt an oder aus).
             * @param {boolean} bool true für Slideshow-Effekt an, false für Slideshow-Effekt aus.
             */
            setSlideTransitionsActive: function(bool) {
                for (let i = 0; i < this.slides.length; i++) {
                    this.slides[i].style.transition = bool ? "transform 1s" : "none";
                }
            },

            /**
             * Wechselt die Ansicht zur nächsten Slide.
             */
            nextSlide: function() {
                const pendingSlide = (((this.currentSlide + 1) % this.slides.length) + this.slides.length) % this.slides.length;
                this.gotoSlide(pendingSlide);
            },
            
            /**
             * Wechselt die Ansicht zur vorherigen Slide.
             */
            previousSlide: function() {
                const pendingSlide = (((this.currentSlide - 1) % this.slides.length) + this.slides.length) % this.slides.length;
                this.gotoSlide(pendingSlide);
            },
            
            /**
             * Wechselt die Ansicht zur gegebenen Slide.
             * @param {Number} slideNumber 
             */
            gotoSlide: function(slideNumber) {
                const fromLastToFirst = (this.currentSlide === this.slides.length - 1 && slideNumber === 0);
                const fromFirstToLast = (this.currentSlide === 0 && slideNumber === this.slides.length - 1);
                const isSpinningRequired = (fromFirstToLast || fromLastToFirst);

                for (let i = 0; i < this.slides.length; i++) {
                    let transformValue = "translateX(-50%)";
                    let opacityValue = 1;

                    if (i < slideNumber) {
                        if (isSpinningRequired) {
                            opacityValue = 0;
                        }
                        transformValue = "translateX(-500%)";
                    }
                    else if (i > slideNumber) {
                        if (isSpinningRequired) {
                            opacityValue = 0;
                        }
                        transformValue = "translateX(500%)";
                    }
                    this.slides[i].style.transform = transformValue;
                    this.slides[i].style.opacity = opacityValue;
                }

                const dots = this.container.querySelectorAll(".dot");
                for (let i = 0; i < dots.length; i++) {
                    dots[i].classList.remove("active");
                    if (i === slideNumber) {
                        dots[i].classList.add("active");
                    }
                }

                this.currentSlide = slideNumber;
            }

        };
        const mySlider = Object.create(slider);
        mySlider.init(options);
        return mySlider;
    }

    // Einsatz der Funktionalität des Sliders auf der Startseite im Bereich Kundenstimmen (siehe index.html).
    const container = document.getElementById("idSlider");
    const options = {container: container, height: 250, slideTransitionsOn: true, startingSlide: 0, slideshow: true};
    createSlider(options);
})();