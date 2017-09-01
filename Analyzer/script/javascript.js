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

//Pull data from CSV file.
function uploadCSV(event) {
    //Get file and initialize file reader.
    var file = event.target.files[0];
    var reader = new FileReader();
    var dsHead = [];
    var dsTable = [];
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
                    dsTable.push(dsTemp);
                else
                    dsHead.push(dsTemp);
            }
        });
        updateDataTable(dsTable, dsHead)
    }
}

//Get the data with AJAX call.
function getData(service) {
    var url = 'http://huckshome.com:8080/projects/WCFNastyFans/NastyFanService.svc/' + service;
    var xhr = createCORSRequest('POST', url);
    xhr.onload = OnSuccess;
    xhr.send();
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

function updateDataTable(dsTable, dsHead) {
    $('#tblTable').dataTable({
        data: dsTable,
        columns: dsHead
    });
}

//Some fields have characters that don't allow for proper formatting, this is a running list of things that shouldn't be in the data.
function cleanData(str) {
    return str.replace(/_/g, " ").replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

//Response handler for success.
function OnSuccess(data) {
    var objTemp = JSON.parse(this.responseText);
    var objJSON = JSON.parse(objTemp.GetBuysDataResult);
    var dsTable = [];
    var dsHead = [];

    objJSON.forEach(function (row, index) {
        var tableData = $.map(row, function (value, index) {
            return [value];
        });

        dsTable.push(tableData);

        if (index == 0) {
            var headData = $.map(row, function (value, index) {
                return [index];
            });

            for (i = 0; i < headData.length; i++)
                dsHead.push({ title: headData[i].toString() });
        }

    });
    updateDataTable(dsTable, dsHead);
}

//Response handler for error.
function OnError(errorThrown) {

}
