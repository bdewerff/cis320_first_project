// This calls our back-end Java program that sets our session info
function loginJava() {

    var url = "api/login_servlet";

    // Grab data from the HTML form
    var loginId = $("#loginId").val();
    //var sessionValue = $("#sessionValue").val();

    // Create a JSON request based on that data
    var dataToServer = {loginId : loginId};

    getSessionJava();
    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Clear the form
        $("#loginId").val("");
        //$("#sessionValue").val("");
    });
}

// This gets session info from our back-end servlet.
function getSessionJava() {

    var url = "api/get_login_servlet";
    var loginId = $("#loginId").val();
    var dataToServer = {loginId : loginId};

    $.post(url, dataToServer, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Update the HTML with our result
        $('#getSessionResult').html(dataFromServer);
    });
    if (loginId == ""){
        $('.logOut').hide();
    } else{
        $('.logOut').show();
    }
}

// This method calls the servlet that invalidates our session
function invalidateSessionButton() {

    var url = "api/invalidate_session_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
    });
    getSessionJava();
}

// Hook the functions above to our buttons
button = $('#getSessionJava');
button.on("click", getSessionJava);

button = $('#loginJava');
button.on("click", loginJava);

button = $('#logOut');
button.on("click", invalidateSessionButton);

button = $('#logOut');
button.on("click", getSessionJava);

getSessionJava();