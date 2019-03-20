import { _toggleState } from './utilities';
import LocalPageNavigation from './localPageNavigation';
import lightbox from './lightbox';


const domLoad = () => {
  // const windowWidth = window.outerWidth;
  const $header = document.querySelector('#header');
  const $menu = $header.querySelector('.main-menu');
  const $mobileMenuToggle = $header.querySelector('#mobile-menu-toggle');

  // Mobile menu
  $mobileMenuToggle.addEventListener('click', (event) => {
    event.preventDefault();
    _toggleState($menu, 'closed', 'open');
  }, false);

  // jump.js — Animated on page scroll
  const $localPageAnchors = document.querySelectorAll('a[href^="#"]');
  Array.from($localPageAnchors).forEach((element) => {
    const localPageAnchor = new LocalPageNavigation(element);
  });

  // lightbox (zooming)
  lightbox.listen('.lightbox');
};

export default domLoad;

