console.log("Hi, this is a test.");

// Main Javascript File


function updateTable() {
    // Here's where your code is going to go.
    // Define a URL
    var url = "api/name_list_get";

    $.getJSON(url, null, function(json_result) {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.
            for (var i = 0; i < json_result.length; i++) {
                var id = json_result[i].id;
                var first = json_result[i].first;
                var last = json_result[i].last;
                var email = json_result[i].email;
                var phone = json_result[i].phone;
                var birthday = json_result[i].birthday;

                var myPhone = "";
                if (phone != undefined && phone.length == 10){
                    myPhone = phone.substring(0,3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6,10);
                }


                $('#datatable tr:last').after('<tr><td>' + id + '</td><td>' + first + '</td><td>' + last + '</td><td>'
                    + email + '</td><td>' + myPhone + '</td><td>' + birthday + '</td>');
            }
            console.log("Done");
        }
    );

}

// Called when "Add Item" button is clicked
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthdate').val("");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

function close(){
    $('#firstName').removeClass("is-invalid");
    $('#firstName').removeClass("is-valid");
    $('#lastName').removeClass("is-invalid");
    $('#lastName').removeClass("is-valid");
    $('#email').removeClass("is-invalid");
    $('#email').removeClass("is-valid");
    $('#phone').removeClass("is-invalid");
    $('#phone').removeClass("is-valid");
    $('#birthdate').removeClass("is-invalid");
    $('#birthdate').removeClass("is-valid");
}
function saveChanges() {
    var jsonObj = {};
    var jsonString = {};
    var firstNamev1 = $('#firstName').val();
    var firstNameReg = /^[-A-Za-z'\u00C0-\u00FF]{1,45}$/;
    var lastNamev1 = $('#lastName').val();
    var lastNameReg = /^[-A-Za-z'\u00C0-\u00FF]{1,45}$/;
    var emailv1 = $('#email').val();
    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    var phonev1 = $('#phone').val();
    var phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var birthdatev1 = $('#birthdate').val();
    var birthdateReg = /^\d{1,2}\/\d{1,2}\/(19|20)\d{2}$/;


    if (firstNameReg.test(firstNamev1)) {
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
        jsonObj.first = $('#firstName').val();
    } else {
        $('#firstName').addClass("is-invalid");
    }

    if (lastNameReg.test(lastNamev1)) {
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
        jsonObj.last = $('#lastName').val();
    } else {
        $('#lastName').addClass("is-invalid")
    }

    if (emailReg.test(emailv1)) {
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
        jsonObj.email = $('#email').val();
    } else {
        $('#email').addClass("is-invalid");
    }

    if (phoneReg.test(phonev1)) {
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
        jsonObj.phone = $('#phone').val();
    } else {
        $('#phone').addClass("is-invalid");
    }

  /*  if (birthdateReg.test(birthdatev1)) {
        $('#birthdate').removeClass("is-invalid");
        $('#birthdate').addClass("is-valid");
        jsonObj.birthDate = $('#birthdate').val();
    } else {
        $('#birthdate').addClass("is-invalid");
    }
    */
    jsonString = JSON.stringify(jsonObj);
    console.log(jsonString);
    $('#myModal').modal('hide');
}

function jqueryPostJSONButtonAction() {

    var url = "api/name_list_edit";
    var first = $("#firstName").val();
    var last = $("#lastName").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var birthday = $("#birthdate").val();
    var dataToServer = { first : first, last : last, email : email, phone : phone, birthday : birthday };

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function(dataFromServer) {
            console.log(dataFromServer);
        },
        contentType: "application/json",
        dataType: 'text' // Could be JSON or whatever too
    });
}

// Call your code.
updateTable();

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

var saveChangeButton = $('#saveChanges');
saveChangeButton.on("click", saveChanges);

var jqueryPostJSONButton = $('#saveChanges');
jqueryPostJSONButton.on("click", jqueryPostJSONButtonAction);

var closeButton = $('#close');
closeButton.on("click", close);