/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
/// <reference path="https://cdn.datatables.net/v/dt/dt-1.10.15/datatables.min.js" />

//Globals needed for endpoints.
var endpoint = ['Buys', 'ActiveMembers', 'ExchangeRate'];
var num = 0;

//Stuff to do at page load.
$(document).ready(function () {
    //Disable form submit, this page solely relies on AJAX calls and JSON data, with jQuery updating the fields.
    $('#Form1').submit(function () {
        return false;
    });

    //This function would be appended to a button or drop down list in a real implementation.
    getData();
});

//Get the data with XHR call.
function getData() {
    //Give the name of the HTML table, match it up with the service request for data.
    endpoint.forEach(function fillTables(index) {
        var url = 'http://huckshome.com:8080/projects/WCFNastyFans/NastyFanService.svc/get' + index;
        var xhr = createCORSRequest('POST', url);
        xhr.onload = OnSuccess;
        xhr.onerror = OnError;
        xhr.send();
    });
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

    //Parse JSON object and separate heading data from table data
    var objJSON = JSON.parse(this.responseText);
    var dsTable = [];
    var dsHead = [];

    //Get heading names
    Object.keys(objJSON).forEach(function (key) {
        var value = objJSON[key];
        objJSON = JSON.parse(objJSON[key]);
    });

    //Get table data
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

    //Pass lists for building of tables.
    updateDataTable(dsTable, dsHead, endpoint);
}

//Response handler for error.
function OnError(errorThrown) {

}

//Append table to page and update it.
function updateDataTable(dsTable, dsHead, endpoint) {
    //Set table name to endpoint name and iterate through endpoint list
    var elementName = 'tbl' + endpoint[num];
    var tableHTML = `<table id="`+ elementName +`" class="display table table-striped table-bordered">` +
                `<thead>` +
                    `<tr>` +
                    `</tr>` +
                `</thead>` +
                `<tbody>` +
                    `<tr></tr>` +
                `</tbody>` +
            `</table><br style="clear: both"/>`
    $("#pnlUpdate").append(tableHTML);
    num++;

    var table = $('#' + elementName).dataTable({
        retrieve: true,
        data: dsTable,
        columns: dsHead
    });

    //Initialize the data, otherwise just reset the data.
    if ($.fn.DataTable.isDataTable('#' + elementName)) {
        table.fnAddData(dsTable);
        table.fnDraw();
    }
}

//Some fields have characters that don't allow for proper formatting, this is a running list of things that shouldn't be in the data.
function cleanData(str) {
    return str.replace(/_/g, " ").replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
