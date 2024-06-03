window.addEventListener('load', function () {
  $.ajax('http://127.0.0.1:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
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
});
