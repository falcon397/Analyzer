/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
/// <reference path="https://cdn.datatables.net/v/dt/dt-1.10.15/datatables.min.js" />

//Globals needed for endpoints.
var tableEndPoint = ['Buys', 'ActiveMembers', 'ExchangeRate'];
var chartEndPoint = [];
var num = 0;
var urlNastyFans = 'http://huckshome.com:8080/projects/WCFNastyFans/NastyFanService.svc/get';

//Stuff to do at page load.
$(document).ready(function () {
    //Disable form submit, this page solely relies on AJAX calls and JSON data, with jQuery updating the fields.
    $('#Form1').submit(function () { return false; });

    //Main Functions
    getTableData();
    getChartData();
});

//Call listening service for data then update tables with data.
function getTableData(endpoint) {
    tableEndPoint.forEach(function (index) {
        var xhr = createCORSRequest('POST', urlNastyFans + index);
        xhr.onload = function (data) {
            updateDataTable(data.target.response, index);
        }
        xhr.onerror = OnError;
        xhr.send();
    });
}

function getChartData(endpoint) {
    chartEndPoint.forEach(function (index) {
        var xhr = createCORSRequest('POST', urlNastyFans + index);
        xhr.onload = function (data) {
            updateChart(data.target.response, index);
        }
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

//Response handler for error.
//Should at least log something in the console.
function OnError(errorThrown) {

}

//Some fields have characters that don't allow for proper formatting, this is a running list of things that shouldn't be in the data.
function cleanData(str) {
    return str.replace(/_/g, " ").replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

//DataTables plugin is utilized here, the data is gathered and a table template is made.
//The data gets appended to the table by the DataTables plugin.
function updateDataTable(data, endpoint) {
    var objJSON = JSON.parse(data);
    Object.keys(objJSON).forEach(function (key) {
        //Parse JSON object and separate heading data from table data
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

        //Build table and append HTML to update div.
        var elementName = 'tbl' + endpoint;
        var tableHTML = '<table id="' + elementName + '" class="display table table-striped table-bordered">' +
                            '<thead>' +
                                '<tr>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '<tr></tr>' +
                            '</tbody>' +
                        '</table><br style="clear: both"/>'

        $("#pnlUpdate").append(tableHTML);

        //DataTables initialization
        var table = $('#' + elementName).dataTable({
            retrieve: true,
            data: dsTable,
            columns: dsHead
        });

        //If properly initialized draw the table, otherwise just reset the data, redundant, but helpful for testing.
        if ($.fn.DataTable.isDataTable('#' + elementName)) {
            table.fnAddData(dsTable);
            table.fnDraw();
        }
    })
}

//Handle the building of the charts.
function updateChart(data, index) {

}
