/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
/// <reference path="https://cdn.datatables.net/v/dt/dt-1.10.15/datatables.min.js" />

$(document).ready(function () {

    //Hide fields that don't show until the user does something.
    //jQuery loads after the page, so I have to hide stuff with CSS, then with jQuery, then remove the CSS rule.
    //There's probably a better way...
    $('#pnlError').hide();
    $('#pnlError').removeClass('hidden');

    //Disable form submit, this page solely relies on AJAX calls and JSON data, with jQuery updating the fields.
    $('#Form1').submit(function () {
        return false;
    });
});

//Get the data with AJAX call.
function getData() {
    $.ajax({
        type: "POST",
        url: "Default.aspx/GetData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            //Mark error and log info in the console, and populate the error field.
            console.error("Error Thrown: " + errorThrown);
            console.error("Text Status: " + textStatus)
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

//Pull data from CSV file.
function uploadCSV(event) {
    //Get file and initialize file reader.
    var file = event.target.files[0]; //event.target.files[0];
    var reader = new FileReader();
    var dsHeadData = []
    var dsTableData = [];
    reader.readAsBinaryString(file);

    //On loading the file reader build the table.
    reader.onload = function () {
        var rows = reader.result.toString().split("\n");
        rows.forEach(function sortData(row, index) {
            var columns = row.split(",");
            var dsTemp = [];
            if (index < 10) {
                for (j = 0; j < columns.length; j++)
                    dsTemp.push({ title: "'" + cleanData(columns[j]) + "'" });

                if (index > 0)
                    dsTableData.push(dsTemp);
                else
                    dsHeadData.push(dsTemp);
            }
        })
    }

    
    $('#tblTable').dataTable({
        data: dsTableData,
        columns: dsHeadData
    });
}

//Some fields have characters that don't allow for proper formatting, this is a running list of things that shouldn't be in the data.
function cleanData(str) {
    return str.replace(/_/g, " ").replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
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
