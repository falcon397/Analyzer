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
});

function GetAppData() {
        var data = {  };
        $.ajax({
            type: "POST",
            url: "https://www.nastyfans.org/buys.csv",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
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
    if ($("#jQueryUpdate").is(":visible")) {
        $('#jQueryUpdate').slideUp(400);
        window.setTimeout(function () {
            $('#lblError').fadeIn("slow");
        }, 650);
    }

    else {
        $('#lblError').fadeIn("slow");
    }
}
