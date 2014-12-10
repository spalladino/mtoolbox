// Main function run on document load
$(function() {

  $(document).on('submit', 'form', function(evt) {
    evt.preventDefault();
    submitForm();
  });

  loadLocations();

});


// Submits form by sending message to mBuilder
function submitForm() {
  var password = $('#password').val();
  var data = {
    message: $('#message').val(),
    location: $('#location').val(),
    role: $('#role').val()
  };

  var url = MBUILDER_URL
    + 'external/application/' + MBUILDER_APP_ID
    + '/trigger/' + MBUILDER_TRIGGER
    + '?' + $.param(data);

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
      $('#response-message').text(data.length + " messages have been sent.");
      $("#dialog-confirm").dialog({
        resizable: false,
        height:180,
        modal: true,
        buttons: {
          "Ok": function() {
            $(this).dialog("close");
          }
        }
      });
    },
    error: function(err) {
      console.log(err);
      $('#response-message').text('Error');
      $("#dialog-confirm").dialog({
        resizable: false,
        height:180,
        modal: true,
        buttons: {
          "Ok": function() {
            $(this).dialog("close");
          }
        }
      });
    }
  });
};

// Loads locations from contacts table in mbuilder
function loadLocations() {
  if (typeof(MBUILDER_CONTACTS_TABLE) !== 'undefined') {
    var url = MBUILDER_URL + 'api/applications/' + MBUILDER_APP_ID + '/tables/' + MBUILDER_CONTACTS_TABLE + '?access_token=' + MBUILDER_TOKEN;
    $.get(url, null, function(data) {
      var locations = _.pluck(data, 'Location').sort();
      locations = _.uniq(locations, true);
      console.log(locations);
    });
  }
};
