/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
$(document).ready(function () {

    //Hide fields that don't show until the user does something.
    //jQuery loads after the page, so I have to hide stuff with CSS, then with jQuery, then remove the CSS rule.
    //There's probably a better way...
    $('#pnlUpdate').hide();
    $('#pnlError').hide();
    $('#pnlError').removeClass('hidden');

    //Disable form submit, this page solely relies on AJAX calls and JSON data, with jQuery updating the fields.
    $('#Form1').submit(function () {
        return false;
    })
});

//Get the data with AJAX call.
function GetAppData() {

    var remoteURL = "https://www.nastyfans.org/buys.csv";

    $.ajax({
        type: "POST",
        url: "Default.aspx/GetData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            //Mark error and log info in the console, and populate the error field.
            console.error("Error Thrown: " + errorThrown);
            console.error("Text Status: "+ textStatus)
            console.log(XMLHttpRequest);
            $('#lblError').text(errorThrown);

            //Process visibility or error.
            OnError()
        },
        success: function (response) {
            //Process visibility of error and charts.
            OnSuccess(response)
        }
    });
}

function OnSuccess(response) {
    if ($('#pnlError').is(':visible'))
        $('#pnlError').fadeOut(400);

    if ($("#pnlUpdate").is(":visible")) {
        $('#pnlUpdate').slideUp(400);
        window.setTimeout(function () {
            setData(response);
        }, 650);
    }

    else
        setData(response);
}

function setData(response) {
    var status = response.d.split(" || ");
    $('#lblStatus').text(status[0]);
    if (status.length > 1)
        $('#lblDefinition').text(status[1]);
    $('#pnlUpdate').fadeIn("slow");
}

function OnError(errorThrown) {
    if ($("#pnlError").is(":visible")) {
        $('#pnlError').slideUp(400);
        window.setTimeout(function () {
            $('#pnlError').fadeIn("slow");
        }, 650);
    }

    else {
        $('#pnlError').fadeIn("slow");
    }
}
