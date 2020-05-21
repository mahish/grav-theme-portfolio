const domLoad = () => {
  console.log('custom admin loaded');

  const selectors = {
    refererPrefix: 'field-selection__',
    repeater: '.field-selection',
    repeaterItem: '[data-collection-item]',
    select: '.field-selection__select', // hidden <select>
    field: '.form-fieldset',
    addItem: '[data-action="add"]',
  };

  const $repeaters = document.querySelectorAll(selectors.repeater);
  if (!$repeaters.length) return;

  function clearData() {} // might not be needed since there is information in .md which item is selected

  function resetVisibility($repeaterItem) {
    $repeaterItem.querySelectorAll(selectors.field).forEach($field => $field.classList.remove('field-selection--show'))
  }

  function showHide($repeaterItem, $select) {
    resetVisibility($repeaterItem);

    const selectValue = $select.value;

    // Exeption - default selected
    if (selectValue === 'default') return;

    // const $selectParent = $select.closest('.form-field');
    const referer = selectors.refererPrefix + selectValue;
    const $selectedFields = $repeaterItem.querySelector(`input[type="hidden"][value="${referer}"]`);
    const $fieldToShow = $selectedFields.closest(selectors.field);

    // show the selected field
    $fieldToShow.classList.add('field-selection--show');
  }

  function checkTarget(event) {
    const $selected = event.target;
    if (!$selected.classList.contains('field-selection__select')) return;

    const $repeaterItem = $selected.closest(selectors.repeaterItem);
    const nodeName = $selected.nodeName.toLowerCase();

    if (nodeName === 'input' || nodeName === 'select') {
      showHide($repeaterItem, $selected)
    }
  }

  $repeaters.forEach($repeater => {
    // // place ".collection-actions" buttons on top
    // if ($repeater.classList.contains('is-reverse')) {
    //   $repeater.parentElement.classList.add('is-reverse');
    // }

    // adjust existing selections on load
    const $repeaterItems = $repeater.children; // live collection
    Array.from($repeaterItems).forEach($repeaterItem => {
      showHide($repeaterItem, $repeaterItem.querySelector(`${selectors.select}[checked]`));
    });

    // dynamic on user input
    $repeater.addEventListener('change', checkTarget);
  });
}

//  DOMContentLoaded event fires when parsing of  current page is complete. DOMContentLoaded is a great event to use to hookup UI functionality to complex web pages.
document.addEventListener('DOMContentLoaded', domLoad, false);
