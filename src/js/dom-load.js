import LazyLoad from 'vanilla-lazyload';
import LocalPageNavigation from './localPageNavigation';
import JustifiedLayout from './justified-layout';
import LightboxPresentation from './lightbox-presentation';
import distributeOnCircle from './distribute-on-circle';
import idleTimer from './idle-timer';
import { _toggleState } from './utilities';


const domLoad = () => {
  const $body = document.body;
  // const windowWidth = window.outerWidth;
  const $header = document.querySelector('#header');
  const $menu = $header.querySelector('.main-menu');
  const $mobileMenuToggle = $header.querySelector('#mobile-menu-toggle');

   // https://github.com/verlok/lazyload
   const lazyLoad = new LazyLoad({
    elements_selector: '[data-lazy]',
  });

  // Mobile menu
  $mobileMenuToggle.addEventListener('click', (event) => {
    event.preventDefault();
    _toggleState($menu, 'closed', 'open');
  }, false);

  // jump.js — Animated on page scroll
  const $localPageAnchors = document.querySelectorAll('a[href^="#"]');
  if ($localPageAnchors.length > 0) {
    $localPageAnchors.forEach($localPageAnchor => {
      new LocalPageNavigation($localPageAnchor);
    });
  }

  const styleLineHeight = parseFloat(
    window.getComputedStyle($body).getPropertyValue('line-height')
  );

  // http://flickr.github.io/justified-layout/
  const $justifiedLayouts = document.querySelectorAll('[data-justified-layout]');
  if ($justifiedLayouts.length > 0) {
    $justifiedLayouts.forEach($justifiedLayout => {
      new JustifiedLayout(
        $justifiedLayout,
        {
          boxSpacing: styleLineHeight / 3,
          containerPadding: styleLineHeight,
          containerWidth: $justifiedLayout.parentElement.clientWidth || window.clientWidth,
          targetRowHeight: 400,
          // showWidows: false,
        }
      );
    });
  }

  const $intros = document.querySelectorAll('[data-intro]');
  if ($intros.length > 0) {

    $intros.forEach($intro => {
      const $introItems = $intro.children;

      if ($introItems.length > 0)
        distributeOnCircle(Array.from($introItems), 19, 1.7);
    });
  }

  // const $pswp = document.querySelector('[data-pswp]');
  // if ($pswp) {
  //   new LightboxPhotoswipe($pswp);
  // }

  const $lightboxToggles = document.querySelectorAll('[data-toggle="lightbox"]');
  if ($lightboxToggles) {
    new LightboxPresentation($lightboxToggles);

    idleTimer({
      // function to fire after idle
      callback: () => $body.classList.add('is-idle'),
      // function to fire when active
      activeCallback: () => $body.classList.remove('is-idle'),
      // Amount of time in milliseconds before becoming idle. default 60000
      idleTime: 2000,
    });
  }
};

export default domLoad;
