import jump from 'jump.js';

export default class LocalPageNavigation {
  constructor(element) {
    this.anchor = element;
    this.targetID = this.anchor.getAttribute('href');

    this.anchor.addEventListener('click', () => {
      jump(this.targetID, {
        // duration: distance => Math.abs(distance) / 2,
        duration: 1000,
        // offset: document.querySelector('[data-creepy-marquee]').offsetHeight * -1,
        callback: undefined,
        // easing: ez.easeInOutQuad,
        a11y: false,
      });
    }, false);
  }
}
