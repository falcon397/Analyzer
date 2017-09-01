/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
/// <reference path="https://cdn.datatables.net/v/dt/dt-1.10.15/datatables.min.js" />

//Stuff to do at page load.
$(document).ready(function () {
    //Disable form submit, this page solely relies on AJAX calls and JSON data, with jQuery updating the fields.
    $('#Form1').submit(function () {
        return false;
    });
});

//Get the data with XHR call.
function getData(service) {
    var url = 'http://huckshome.com:8080/projects/WCFNastyFans/NastyFanService.svc/' + service;
    var xhr = createCORSRequest('POST', url);
    xhr.onload = OnSuccess;
    xhr.onerror = OnError;
    xhr.send();
}

//Build XHR object
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

//Response handler for success.
function OnSuccess(data) {
    var objJSON = JSON.parse(JSON.parse(this.responseText).GetBuysDataResult);
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
                dsHead.push({ title: cleanData(headData[i].toString()) });
        }

    });
    updateDataTable(dsTable, dsHead);
}

//Response handler for error.
function OnError(errorThrown) {

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
