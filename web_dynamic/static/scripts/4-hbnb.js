window.addEventListener('load', function () {
  $.ajax('http://127.0.0.1:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: appendPlaces
  });

  const amenities = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).prop('checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }

    if (Object.keys(amenities).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      $('.amenities h4').text(Object.values(amenities).join(', '));
    }
  });

  $('button').click(function () {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      dataType: 'json',
      contentType: 'application/json',
      success: appendPlaces
    });
  });

  function appendPlaces (data) {
    $('.places').empty();
    for (const place of data) {
      const template = `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
      $('.places').append(template);
    }
  }
});
