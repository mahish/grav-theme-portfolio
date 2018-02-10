import { _toggleState } from './utilities';

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
};

export default domLoad;

