/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
$(document).ready(function () {

    //Hide fields that don't show until the user does something.
    //jQuery loads after the page, so I have to hide stuff with CSS, then with jQuery, then remove the CSS rule.
    //There's probably a better way...
    $('#jQueryUpdate').hide();
    $('#lblError').hide();
    $('#lblError').removeClass('hidden');

    //Get date and set messages and input masks.
    var d = new Date().toLocaleDateString();

    //Disable form submit, this page solely relies on AJAX calls and JSON data, with jQuery updating the fields.
    $('#Form1').submit(function () {
        return false;
    })
});

//Get the data with AJAX call.
function GetAppData() {
    var remoteURL = "https://www.nastyfans.org/buys.csv";
    $.ajax({
        type: "GET",
        url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22" +
            encodeURIComponent(remoteURL) + "%22&format=json",
        dataType: "text/csv",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            OnError()
        },
        success: function (response) {
            OnSuccess(response)
        }
    });
}

function OnSuccess(response) {
    if ($('#lblError').is(':visible'))
        $('#lblError').fadeOut(400);

    if ($("#jQueryUpdate").is(":visible")) {
        $('#jQueryUpdate').slideUp(400);
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
    $('#jQueryUpdate').fadeIn("slow");
}

function OnError() {
    if ($("#pnlError").is(":visible")) {
        $('#pnlError').slideUp(400);
        window.setTimeout(function () {
            $('#lblError').fadeIn("slow");
        }, 650);
    }

    else {
        $('#lblError').fadeIn("slow");
    }
}
