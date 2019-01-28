//Part 1
var button1 = document.getElementById('button1');
button1.onclick = function(){console.log('Hello. \n')};

//Part 2

function addFields(event)
{
    var field1 = parseInt($("#field1").val());
    var field2 = parseInt($("#field2").val());
    $("#field3").val(field1 + field2);
}

    var formButton2 = $('#button2');
    formButton2.on("click", addFields);


    //Part 3
    $("#button3").click(function(){
        $("#paragraphToHide").toggle();
    });

    //Part 4
    function validateFunction(event) {
        var phoneField = $('#phoneField').val();

        var reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (reg.test(phoneField)) {
            console.log("OK");
        } else {
            console.log("Bad");
        }
    }

    var formButton4 = $('#button4');
    formButton4.on("click", validateFunction);

    //Part 5
    function jsonFunction(event) {

        var formObject = {};

        formObject.firstName = $('#firstName').val();
        formObject.lastName = $('#lastName').val();
        formObject.email = $('#email').val();

        var jsonString = JSON.stringify(formObject);

        console.log(jsonString);
    }

    var formButton5 = $('#button5');
    formButton5.on("click", jsonFunction);


