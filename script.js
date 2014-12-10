var USERNAME = "katukakaunda@gmail.com";
var MBUILDER_TRIGGER_URL = "http://mbuilder.instedd.org/external/application/150/trigger/subscribers?";

$(function() {

  $('form').on('submit', function(evt) {
    evt.preventDefault();

    var message = $('#message').val();
    var location = $('#location').val();
    var role = $('#role').val();
    var password = $('#password').val();

    var url = MBUILDER_TRIGGER_URL + 'location=' + location + '&message=' + message + '&phone=000';

    $.ajax({
      url: url,
      type: "GET",
      username: USERNAME,
      password: password,
      success: function(data) {
        alert("Success!");
        console.log(data);
      }
    });

  });

});
