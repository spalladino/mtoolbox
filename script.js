// Main function run on document load
$(function() {

  $(document)
    // Handle form submit by sending message to mbuilder
    .on('submit', 'form', function(evt) {
      evt.preventDefault();
      submitForm();
    })
    // Reload locations on change of access token
    .on('change', '#token', function(evt) {
      loadLocations($(this).val());
    })
    // or on reload
    .on('click', '#reload-token', function(evt) {
      evt.preventDefault();
      loadLocations($('#token').val());
    });

  // Load default value of access token from config if present
  if (typeof(MBUILDER_TOKEN) !== 'undefined') {
    $('#token').val(MBUILDER_TOKEN).trigger('change');
  }

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
      $('#message').val('');
      $('#response-message').text(data.length+" messages have been sent sucessfully!");
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
      $('#response-message').text('Submit failed. Your password/username is incorrect.');
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
function loadLocations(token) {
  var url = MBUILDER_URL + 'api/applications/' + MBUILDER_APP_ID + '/tables/' + MBUILDER_CONTACTS_TABLE + '?access_token=' + token;
  $.get(url, null, function(data) {
    var dropdown = $('#location');
    var locations = _.pluck(data, 'Location').sort();
    locations = _.uniq(locations, true);
    dropdown.empty();
    _.each(locations, function(location) {
      $('<option>' + location + '</option>').appendTo(dropdown);
    });
  });
};

//handle tabs
 $(function() {
$( "#tabs" ).tabs();
});
