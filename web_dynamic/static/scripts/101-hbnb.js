// perform functions based on input checkbox
$(function () {
  let selected = [];
  let tempItems = [];
  let displayNames = [];

  $(':checkbox').on('click', function () {
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
        displayNames.push(item['dataset']['name']);
      }
    }

    $('.amenities h4').text(displayNames.join(', '));
    displayNames = [];

    if (selected.length === 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });

  $(':button').on('click', function () {
    let amenities = { 'amenities': selected };
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(amenities),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        $('.places article').remove();
        for (let place of data) {
          $('.places').append('<article><div class="title"><h2>' + place['name'] + '</h2><div class="price_by_night">' + place['price_by_night'] + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place['max_guest'] + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place['number_rooms'] + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place['number_bathrooms'] + ' Bathroom</div></div><div class="user"><div class="description">' + place['description'] + '</div></article>');
        }
      }
    });
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data['status'] === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      for (let place of data) {
        $('.places').append('<article><div class="title"><h2>' + place['name'] + '</h2><div class="price_by_night">' + place['price_by_night'] + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place['max_guest'] + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place['number_rooms'] + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place['number_bathrooms'] + ' Bathroom</div></div><div class="user"><div class="description">' + place['description'] + '</div></article>');
      }
    }
  });
$(document).ready(function () {
  $('.toggle-reviews').on('click', function () {
    const $span = $(this);
    const $reviewsContainer = $('.reviews ul');

    if ($span.text() === 'show') {
      // Fetch reviews from the API (replace the URL with the correct endpoint)
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/reviews/',  // Adjust URL as needed
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          // Clear any existing reviews
          $reviewsContainer.empty();

          // Parse and display the reviews
          for (let review of data) {
            const reviewElement = `
              <li>
                <h3>From ${review.user} the ${review.date}</h3>
                <p>${review.text}</p>
              </li>
            `;
            $reviewsContainer.append(reviewElement);
          }

          // Change the text to 'hide'
          $span.text('hide');
        },
        error: function () {
          alert('Failed to fetch reviews.');
        }
      });
    } else if ($span.text() === 'hide') {
      // Remove all reviews from the DOM
      $reviewsContainer.empty();

      // Change the text back to 'show'
      $span.text('show');
    }
  });
});

});
