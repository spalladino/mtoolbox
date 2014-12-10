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
      alert("Success!");
      console.log(data);
    },
    error: function(err) {
      alert("Failure");
      console.log(err);
    }
  });
};

// Loads locations from contacts table in mbuilder
function loadLocations() {
  if (!typeof(MBUILDER_CONTACTS) === 'undefined') {
    $.get(MBUILDER_CONTACTS, {

    });
  }
};
