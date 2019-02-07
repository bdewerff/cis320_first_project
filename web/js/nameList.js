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

                $('#datatable tr:last').after('<tr><td>' + id + '</td><td>' + first + '</td><td>' + last + '</td><td>'
                    + email + '</td><td>' + phone + '</td><td>' + birthday + '</td>');
            }
            console.log("Done");
        }
    );

}

// Call your code.
updateTable();