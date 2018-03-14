import Zooming from 'zooming';

const lightbox = new Zooming({
  defaultZoomable: '.lightbox',
  enableGrab: false,
  preloadImage: false,
  bgColor: 'rgb(255,255,255)',
  bgOpacity: 0.95,
  // scaleBase: 1.01,
  scrollThreshold: 20,
  zIndex: 999999,
});

export default lightbox;
