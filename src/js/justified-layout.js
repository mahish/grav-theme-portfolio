import justifiedLayout from 'justified-layout';

// Justified Layout by Flickr
// http://flickr.github.io/justified-layout/

// const defaults = {
//   containerWidth: 1060,
//   containerPadding: 10,
//   boxSpacing: 10,
//   targetRowHeight: 320,
//   targetRowHeightTolerance: 0.25,
//   maxNumRows: Number.POSITIVE_INFINITY,
//   forceAspectRatio: false,
//   showWidows: true,
//   fullWidthBreakoutRowCadence: false,
// }

export default class JustifiedLayout {
  constructor($container, config = {}) {
    this.$container = $container;
    this.$items = this.$container.querySelectorAll('[data-aspect-ratio]');
    this.config = config;

    this.init();
  }

  init() {
    this.aspectRatiosArray = this.getAspectRatiosArray();
    this.geometry = justifiedLayout(this.aspectRatiosArray, this.config);

    this.generateLayout();
  }

  getAspectRatiosArray() {
    return Array.from(this.$items).map($item => Number($item.dataset.aspectRatio));
  }

  generateLayout() {
    this.$items.forEach(($item, index) => {
      if (this.geometry.boxes[index]) {
        $item.style.width = `${this.geometry.boxes[index].width}px`;
        $item.style.height = `${this.geometry.boxes[index].height}px`;
        $item.style.top = `${this.geometry.boxes[index].top}px`;
        $item.style.left = `${this.geometry.boxes[index].left}px`;
      } else {
        $item.style.display = 'none';
      }
    });

    this.$container.style.height = `${this.geometry.containerHeight}px`;
    // this.$container.style.width = config.containerWidth + "px";
  }
}
