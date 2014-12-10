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
      dataType: 'json',
      contentType: 'text/plain',
      content: '',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        "Authorization": "Basic " + btoa(USERNAME + ":" + password)
      },
      success: function(data) {
        alert("Success!");
        console.log(data);
      },
      error: function(err) {
          $('#response-message').val('Error');
          $(function() {
            $( "#dialog-confirm" ).dialog({
              resizable: false,
              height:140,
              modal: true,
              buttons: {
              "Ok": function() {
                $( this ).dialog( "close" );
              }
            }
        });
    });
        console.log(err);
      }
    });

  });

});
