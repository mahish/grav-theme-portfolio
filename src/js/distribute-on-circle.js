const distributeOnCircle = ($elements, radius = 19, modifier = 0) => {
  const angle = (2 * Math.PI) / $elements.length;

  $elements.forEach(($element, index) => {
    const itemAngle = angle * (index - modifier);
    const x = Math.cos(itemAngle) * radius;
    const y = Math.sin(itemAngle) * radius;

    $element.style.transform = `translate(calc(-50% + ${x}vmin), calc(-50% + ${y}vmin))`;
  });
}

export default distributeOnCircle;
