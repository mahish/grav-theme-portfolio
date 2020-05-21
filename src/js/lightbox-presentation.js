// import Glide from '@glidejs/glide';

export default class LightboxPresentation {
  constructor($toggles) {
    // this.lightbox = this.$toggle.getAttribute('data-lightbox__toggle');
    // this.$lightbox = document.getElementById(this.lightbox);
    this.$lightbox = document.querySelector('[data-lightbox="lightbox"]');
    if (!this.$lightbox) return console.warn('No lightbox to toggle!');
    this.$body = document.body;
    this.$toggles = $toggles;
    this.$items = this.$lightbox.querySelectorAll('[data-lightbox="item"]');
    this.$image = this.$lightbox.querySelector('[data-lightbox="item"] img');
    // this.$backdrop = this.$lightbox.querySelector('.lightbox__backdrop');
    this.$closes = this.$lightbox.querySelectorAll('[data-lightbox="close"]');
    this.$previous = this.$lightbox.querySelector('[data-lightbox="<"]');
    this.$next = this.$lightbox.querySelector('[data-lightbox=">"]');

    this.images = [];
    this.isActive = false;
    this.currentIndex = 0;
    // this.isPrevious = false;
    // this.isNext = false;
    // this.$carousel = this.$lightbox.querySelector('[data-lightbox="item"]');
    // this.$carouselItems = null;
    // this.carousel = null;
    // this.$title = this.$lightbox.querySelector('.lightbox__title');

    // this.title = this.$toggle.getAttribute('data-lightbox__title');

    // this.hide = this.hide.bind(this);

    // this.initCarousel();
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

  toggleLoading(img = {}) {
    // TODO
    console.log('loading', img.width)
  }

  addImageProcess(src){
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    })
  }

  getImages() {

    this.toggleLoading();

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

    // if (image.previous) {
    //   // this.isPrevious = true;
    //   this.$items[0].innerHTML = image.previous.outerHTML;
    //   this.$previous.style.display = '';
    // } else {
    //   // this.isPrevious = false;
    //   this.$items[0].innerHTML = '';
    //   this.$previous.style.display = 'none';
    // }

    // if (image.next) {
    //   // this.isNext = true;
    //   this.$items[2].innerHTML = image.next.outerHTML;
    //   this.$next.style.display = '';
    // } else {
    //   // this.isNext = false;
    //   this.$items[2].innerHTML = '';
    //   this.$next.style.display = 'none';
    // }

    setTimeout(() => {
      this.addImageProcess(this.$image.currentSrc).then(img => this.toggleLoading(img));
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

  // initCarousel() {
  //   if (this.$carousel) {
  //     this.carousel = new Glide(this.$carousel, {
  //       type: 'slider',
  //     });
  //   }
  // }

  // hide(event) {
  //   event.stopPropagation();
  //   this.$lightbox.style.display = '';
  //   // this.$backdrop.removeEventListener('transitionend', this.hide, true);
  // }

  closeLightbox() {
    this.isActive = false;
    this.$body.classList.remove('lightbox-is-open');
    this.$lightbox.classList.remove('is-active');
    // this.$lightbox.style.opacity = '0';
    this.$lightbox.style.pointerEvents = 'none';

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
