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
    var textEnglish = "As of " + d + ", our records reflect the following status of your application:"
    var textSpanish = "A partir de " + d + ", nuestros archivos indican el siguiente estado de su aplicación:"

    $('#lblDate').text(function () { if (SPCheck()) return textSpanish; else return textEnglish });
    $('#txtCAPAppID').inputmask("9{7}", { placeholder: "" });
    $('#txtLicense').inputmask("X{1,7}", {
        placeholder: "",
        definitions: {
            'X': {
                validator: "[0-9A-Za-z]",
                cardinality: 1,
                casing: "upper"
            }
        }
    });
});

function SPCheck() {
    return window.location.href.toLowerCase().indexOf("capstatuschecksp") >= 0 ? true : false;
}

function GetAppData() {
    var id = $('#txtCAPAppID').val().trim();
    var license = $('#txtLicense').val().trim();
    if (id != '' && license != '') {
        var data = { id: id, license: license, language: SPCheck() };
        $.ajax({
            type: "POST",
            url: "CAPStatusCheck.aspx/GetAppData",
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
    else {
        OnError();
        return false;
    }
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
