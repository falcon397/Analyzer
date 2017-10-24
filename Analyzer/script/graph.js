/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
/// <reference path="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.min.js" />

var endPoint = ["Trades", "Dividends"];
var urlNastyFans = 'http://huckshome.com:8080/projects/WCFNastyFans/NastyFanService.svc/get';

$(document).ready(function () {
    OnSuccess("", "");
});

//Call listening service for data then update tables with data.
function getData() {
    endPoint.forEach(function (index) {
        var xhr = createCORSRequest('POST', urlNastyFans + index);
        xhr.onload = function (data) {
            OnSuccess(data.target.response, index);
        }
        xhr.onerror = OnError(index);
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

function OnError(index) {
    console.log("An error has occured fetching the data from "+ index)
}

function OnSuccess(data, endpoint) {
    var ctx = document.getElementById("myChart").getContext("2d");
    dataset = JSON.parse(data);

    /*** Gradient ***/
    var gradient = ctx.createLinearGradient(20, 20, 0, 800);
    gradient.addColorStop(0, 'rgba(163, 206, 156, 1)');
    gradient.addColorStop(1, 'rgba(163, 206, 156, 0)');
    /***************/

    var data = {
        labels: ["02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "00:00"],
        datasets: [
            {
                backgroundColor: gradient,
                data: [25.0, 32.4, 22.2, 39.4, 34.2, 22.0, 23.2, 24.1, 20.0, 18.4, 19.1, 17.4]
            }
        ]
    };

    var options = {

    };


    var chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    })
}