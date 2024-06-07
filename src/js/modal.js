/*
Anzeigensteuerung für die vergößerte Bildansicht. 
Inspiration: https://www.w3schools.com/howto/howto_css_modal_images.asp 
*/

(function() {
    const createModal = function(options) {
        const modal = {
            init: function(options) {
                this.openers = document.querySelectorAll(".modal-opener"); 
                this.setOpenerOnclicks();
                this.closer = document.querySelectorAll(".modal-closer");
                this.setCloserOnclicks();
            },

            /**
             * Fügt den Modal-Öffnern einen Onclick-Listener hinzu.
             */
            setOpenerOnclicks: function() {
                const that = this;
                this.openers.forEach(opener => {
                    opener.addEventListener("click", function() {
                        const arrayContainingNumber = this.dataset.imgsrc;
                        that.openModal();
                        that.displayModalImg(arrayContainingNumber);
                    });
                });
            },

            /**
             * Fügt den Modal-Schließern einen Onclick-Listener hinzu.
             */
            setCloserOnclicks: function() {
                const that = this;
                this.closer.forEach(closer => {
                    closer.addEventListener("click", () => that.closeModal());
                });
            },

            /**
             * Öffnet das Modal (Den Hintergrund der Bildanzeige).
             */
            openModal: function() {
                options.container.style.display = "block";
            },

            /**
             * Schließt das Modal.
             */
            closeModal: function() {
                options.container.style.display = "none";
            },

            /**
             * Zeigt das gegebene Bild im Modal an.
             * @param {Number} imageSource Dateipfad des anzuzeigenden Bildes.
             */
            displayModalImg: function(imageSource) {
                options.container.querySelector("#img01").src = imageSource;
                modalImg.src = this.src;
            }
        }
        const myModal = Object.create(modal);
        myModal.init(options);
        return myModal;
    }

    // Einsatz der Funktionalität des Modals auf der Möbel-Unterseite im Bereich der Galerie (siehe moebel.html).
    const container = document.getElementById("idModal");
    const options = {container: container};
    createModal(options);
})();