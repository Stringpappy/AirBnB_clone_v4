//module that perform functions based on input checkbox
$(function () {
  let selected = [];
  let tempItems = [];
  let displayNames = [];

  $(':checkbox').on('click', function () {
    console.log();
    if (selected.indexOf(this['dataset']['id']) === -1) {
      selected.push(this['dataset']['id']);
    } else {
      for (let item of selected) {
        if (item !== this['dataset']['id']) {
          tempItems.push(item);
        }
      }
      selected = tempItems;
      tempItems = [];
    }

    for (let item of $('.popover li input')) {
      if (selected.indexOf(item['dataset']['id']) !== -1) {
        console.log('yay');
        displayNames.push(item['dataset']['name']);
      }
    }

    $('.amenities h4').text(displayNames.join(', '));
    displayNames = [];

    if (selected.length === 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data['status'] === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});

