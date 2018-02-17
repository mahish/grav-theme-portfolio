import Zooming from 'zooming';

const lightbox = new Zooming({
  defaultZoomable: '.lightbox',
  enableGrab: false,
  preloadImage: false,
  bgColor: 'rgb(0, 0, 0)',
  bgOpacity: 0.9,
  // scaleBase: 1.01,
  scrollThreshold: 20,
  zIndex: 999999,
});

export default lightbox;