export function _toggleState($element, stateOne, stateTwo) {
  $element.setAttribute('data-state', $element.getAttribute('data-state') === stateOne ? stateTwo : stateOne);
}
