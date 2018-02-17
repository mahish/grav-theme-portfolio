const footer = () => {
  const $footer = document.querySelector('#footer');
  const footerDisplay = window.getComputedStyle($footer).getPropertyValue('display');

  $footer.style.display = 'none';

  const viewportHeight = document.documentElement.clientHeight;
  const documentHeight = document.body.clientHeight;


  if ((documentHeight - (viewportHeight * 0.25)) > viewportHeight) {
    $footer.style.display = footerDisplay;
  }

};

export default footer;
