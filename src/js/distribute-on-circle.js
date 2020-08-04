const distributeOnCircle = ($elements, radius = 19, modifier = 0) => {
  const angle = (2 * Math.PI) / $elements.length;

  $elements.forEach(($element, index) => {
    const itemAngle = angle * (index - modifier);
    const x = Math.cos(itemAngle) * radius;
    const y = Math.sin(itemAngle) * radius;

    $element.style.transform = `translate(calc(-50% + ${x}vmin), calc(-50% + ${y}vmin))`;

    $element.addEventListener('mouseenter', () => {
      $element.style.boxShadow = `${-x * .125}vmin ${-y * .125}vmin ${1.625 * 2}vmin rgba(0,0,0,.38)`;
    });

    $element.addEventListener('mouseleave', () => {
      $element.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
    });
  });
}

export default distributeOnCircle;
