// Main function run on document load
$(function() {

  $(document)
    // Handle form submit by sending message to mbuilder
    .on('submit', 'form', function(evt) {
      evt.preventDefault();
      $('.alert').alert('close');
      $('#submitConfirmModal').modal('show');
    })
    // Reload items on change of password
    .on('change', '#password', function(evt) {
      loadData();
    })
    // or on manual reload
    .on('click', '.reload-dropdown', function(evt) {
      evt.preventDefault();
      loadData();
    })
    // Clear form when clear button is clicked
    .on('click', '#clear', function(evt) {
      evt.preventDefault();
      $('#message').text('');
    })
    // Confirmation from modal send box
    .on('click', '#sendMessage', function(evt) {
      evt.preventDefault();
      $(this).button('sending');
      doSubmit();
    });

  // Also try to load if password is filled by browser
  window.setTimeout(function() {
    loadData();
  }, 500);

  // Set contents based on config
  $('#mbuilderContacts').attr('href', MBUILDER_URL+'applications/'+MBUILDER_APP_ID+'/data/')
  $('#password').attr('placeholder', 'Password for ' + USERNAME);
});


// Loads contacts table in mbuilder
function loadData() {
  var password = $('#password').val();
  if (password == '') return;

  var url = MBUILDER_URL
    + 'api/applications/'
    + MBUILDER_APP_ID
    + '/tables/'
    + MBUILDER_CONTACTS_TABLE;

  $.ajax({
    url: url,
    type: "GET",
    dataType: 'json',
    headers: {
      "Authorization": "Basic " + btoa(USERNAME + ":" + password)
    },
    success: function(contacts) {
      loadDropdown(contacts, 'Location', $('#location'));
      loadDropdown(contacts, 'Role', $('#role'));
      loadDropdown(contacts, 'Language', $('#lang'));
    }
  });
};

function loadDropdown(contacts, field, dropdown) {
  var items = _.pluck(contacts, field).sort();
  items = _.uniq(items, true);
  dropdown.empty();
  _.each(items, function(item) {
    $('<option>' + item + '</option>').appendTo(dropdown);
  });
};

// Show an alert
function showAlert(content, klazz) {
  var elem = $('<div class="alert alert-' + klazz + ' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + content + '</div>');
  elem.insertAfter('.mtoolbox');
}

// Submit form to mbuilder and send data
function doSubmit() {
  var password = $('#password').val();

  var data = {
    message: $('#message').val(),
    location: $('#location').val(),
    role: $('#role').val(),
    lang:$('#lang').val()
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
      $('#submitConfirmModal').modal('hide');
      $('#sendMessage').button('reset');

      var msg = null;
      if (data.length == 0) {
        msg = "No messages have been sent";
      } else if (data.length == 1) {
        msg = "One message has been sent";
      } else {
        msg = data.length + " messages have been sent";
      }

      showAlert(msg, 'success');
    },
    error: function(err) {
      console.log(err);
      $('#submitConfirmModal').modal('hide');
      $('#sendMessage').button('reset');
      showAlert("There was an error sending your message. Please check your credentials and try again.", 'danger');
    }
  });
};

