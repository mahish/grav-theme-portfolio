export default class LightboxPresentation {
  constructor($toggles) {
    this.$lightbox = document.querySelector('[data-lightbox="lightbox"]');
    if (!this.$lightbox) return console.warn('No lightbox to toggle!');
    this.$image = this.$lightbox.querySelector('[data-lightbox="item"] img');
    this.$closes = this.$lightbox.querySelectorAll('[data-lightbox="close"]');
    this.$previous = this.$lightbox.querySelector('[data-lightbox="<"]');
    this.$next = this.$lightbox.querySelector('[data-lightbox=">"]');
    this.$loading = this.$lightbox.querySelector('[data-lightbox="loading"]')

    this.$body = document.body;
    this.$toggles = $toggles;

    this.images = [];
    this.isActive = false;
    this.currentIndex = 0;

    this.loopToggles();
    this.addEventListeners();
  }

  loopToggles() {
    this.$toggles.forEach(($toggle, index) => {
      this.addToggleImageToImagesArray($toggle);
      this.addEventListenerToToggle($toggle, index);
    });
  }

  addToggleImageToImagesArray($toggle) {
    const image = $toggle.querySelector('img');

    this.images.push({
      src: image.getAttribute('data-src') || image.getAttribute('src'),
      srcset: image.getAttribute('data-srcset') || image.getAttribute('srcset'),
    });
  }

  toggleLoading(img = false) {
    this.$lightbox.classList.toggle('is-loading', !img);
  }

  addImageProcess(src) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    })
  }

  // inspired by https://github.com/fregante/image-promise
  checkImage(input) {
    return new Promise((resolve, reject) => {
      let image;

      if (typeof input === 'string') {
        image = new Image();
        // image.onload = () => resolve({src, status: 'ok'});
        // image.onerror = () => resolve({src, status: 'error'});
        image.src = input;
      } else if (input instanceof HTMLImageElement) {
        image = input;
      }

        if (image.naturalWidth) {
          resolve(image);

        } else if (image.complete) {
          reject(image);

        } else {

          image.onload = () => {
            if (image.naturalWidth) {
              resolve(image);
            } else {
              reject(image);
            }
          };

          image.onerror = () => {
            if (image.naturalWidth) {
              resolve(image);
            } else {
              reject(image);
            }
          };
        }
    });
  }

  getImages() {
    this.toggleLoading(false);

    const image = {
      current: this.images[this.currentIndex],
      previous: this.images[this.currentIndex - 1],
      next: this.images[this.currentIndex + 1],
    };

    this.$image.setAttribute('sizes', '100vw');
    this.$image.setAttribute('srcset', image.current.srcset);
    this.$image.setAttribute('src', image.current.src);

    this.$previous.style.display = image.previous ? '' : 'none';
    this.$next.style.display = image.next ? '' : 'none';

    setTimeout(() => {
      this.checkImage(this.$image)
        .then(image => this.toggleLoading(image))
        .catch(image => console.error(image.src, 'Image failed to load :('));
    }, 10);
  }

  addEventListenerToToggle($toggle, index){
    $toggle.addEventListener('click', (event) => {
      this.currentIndex = index;
      this.isActive = true;

      // this.$title.innerHTML = this.title;

      // this.$lightbox.style.display = 'block';

      this.getImages();

      // setTimeout(() => {
      this.$body.classList.toggle('lightbox-is-open');
      this.$lightbox.classList.toggle('is-active');
      // this.$lightbox.style.opacity = '1';
      this.$lightbox.style.pointerEvents = '';
        // if (this.carousel.disabled) {
        //   this.carousel.enable();
        // } else {
        //   // first time
        //   this.carousel.mount();
        // }

      // }, 30);

      event.preventDefault();
    });
  }

  closeLightbox() {
    this.isActive = false;
    this.$body.classList.remove('lightbox-is-open');
    this.$lightbox.classList.remove('is-active');
    // this.$lightbox.style.opacity = '0';
    this.$lightbox.style.pointerEvents = 'none';

    // clear the last shown image
    this.$image.setAttribute('srcset', '');
    this.$image.setAttribute('src', '');

    // this.carousel.disable();
  }

  addEventListeners() {
    this.$next.addEventListener('click', event => {
      this.currentIndex += 1;
      this.getImages(this.currentIndex);
      event.preventDefault();
    });
    this.$previous.addEventListener('click', event => {
      this.currentIndex -= 1;
      this.getImages(this.currentIndex);
      event.preventDefault();
    });

    this.$closes.forEach($close => {
      $close.addEventListener('click', (event) => {
        // this.$backdrop.addEventListener('transitionend', this.hide, true);
        this.closeLightbox();
        event.preventDefault();
      });
    });

    document.addEventListener('keydown', (event) => {

      if (this.isActive) {
        switch (event.key) {
          case 'Escape':
            this.closeLightbox();
            break;

          case 'ArrowLeft':
            this.currentIndex -= 1;
            if (this.images[this.currentIndex]) {
              this.getImages(this.currentIndex);
            } else {
              this.currentIndex += 1;
            }
            break;

          case 'ArrowRight':
            this.currentIndex += 1;
            if (this.images[this.currentIndex]) {
              this.getImages(this.currentIndex);
            } else {
              this.currentIndex -= 1;
            }
            break;

          default:
            break;
        }
      }

    });
  }
}
