// Main function run on document load
$(function() {

  $(document)
    // Handle form submit by sending message to mbuilder
    .on('submit', 'form', function(evt) {
      evt.preventDefault();
      submitForm();
    })
    // Reload locations on change of password
    .on('change', '#password', function(evt) {
      loadLocations();
    })
    // or on manual reload
    .on('click', '.reload-dropdown', function(evt) {
      evt.preventDefault();
      loadLocations();
    });

  // Also try to load if password is filled by browser
  window.setTimeout(function() {
    loadLocations();
  }, 500);

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

    var confirmation = confirmSubmit(data,url,password);

    //if(!confirm('Are you sure?')){
      //  return;
   // }

  /*$.ajax({
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
  });*/
};

// Loads locations from contacts table in mbuilder
function loadLocations() {
  var password = $('#password').val();
  if (password == '') return;

  var url = 'http://mbuilder.instedd.org/api/applications/' + MBUILDER_APP_ID + '/tables/' + MBUILDER_CONTACTS_TABLE;
  $.get(url, null, function(data) {
    

  $.ajax({
    url: url,
    type: "GET",
    dataType: 'json',
    headers: {
      "Authorization": "Basic " + btoa(USERNAME + ":" + password)
    },
    success: function(data) {
      extractAndLoad('Location', $('#location'));
      extractAndLoad('Role', $('#role'));
    }

  });

});
}
function extractAndLoad(field, dropdown) {
    var items = _.pluck(data, field).sort();
    items = _.uniq(items, true);
    dropdown.empty();
    _.each(items, function(item) {
      $('<option>' + item + '</option>').appendTo(dropdown);
    });
  }

//handle tabs
 $(function() {
$( "#tabs" ).tabs();
});

 //confirmation
 function confirmSubmit(data,url,password){
    $("#response-message").text('Are you sure you want to send the message?');
    $("#dialog-confirm").dialog({
      resizable: false,
      height:180,
      modal: true,
      buttons: {
        "Ok": function() {
          ajaxSubmit(data,url,password);
        },
        "Cancel":function(){
          $(this).dialog("close");
        }
      }
    });
 }

 //Ajax submit
 function ajaxSubmit(data,url,password){
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
      //$('#message').val('');
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
 }

