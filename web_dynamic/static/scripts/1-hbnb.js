// Func that perform functions based on input checkbox
$(function () {
  let selectedItems = [];
  let filteredItems = [];
  let displayText = [];
  
  $(':checkbox').on('click', function () {
    console.log();
    if (selectedItems.indexOf(this['dataset']['id']) === -1) {
      selectedItems.push(this['dataset']['id']);
    } else {
      for (let item of selectedItems) {
        if (item !== this['dataset']['id']) {
          filteredItems.push(item);
        }
      }
      selectedItems = filteredItems;
      filteredItems = [];
    }

    for (let checkbox of $('.popover li input')) {
      if (selectedItems.indexOf(checkbox['dataset']['id']) !== -1) {
        console.log('yay');
        displayText.push(checkbox['dataset']['name']);
      }
    }

    $('.amenities h4').text(displayText.join(', '));
    displayText = [];

    if (selectedItems.length === 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });
});

