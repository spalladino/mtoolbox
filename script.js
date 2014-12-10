$(function() {

  $(document).on('submit', 'form', function(evt) {

    evt.preventDefault();

    var message = $('#message').val();
    var location = $('#location').val();
    var role = $('#role').val();
    var password = $('#password').val();

    var url = MBUILDER_URL + 'external/application/' + MBUILDER_APP_ID + '/trigger/' + MBUILDER_TRIGGER;
    url += '?location=' + location + '&message=' + message + '&phone=000';

    $.ajax({
      url: url,
      type: "POST",
      username: USERNAME,
      password: password,
      success: function(data) {
        alert("Success!");
        console.log(data);
      },
      error: function(err) {
        alert("Failure");
        console.log(err);
      }
    });

  });

});
