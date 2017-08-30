<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Analyzer.Default" %>

<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Market Analyzer</title>

    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css" />
    <link rel="stylesheet" href="style/bootstrap.min.css" />
    <link rel="stylesheet" href="//cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="style/style.css" />

    <%-- Hosted Libraries --%>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>

    <script src="//cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
    <script src="script/bootstrap.min.js"></script>
    <script src="script/javascript.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="pnlMain" class="center">
            <div id="pnlError" class="hidden form-group">
                <label id="lblError"></label>
            </div>
            <div class="form-group">
                <input id="inFile" type="file" onchange="GetCSVFile(event)" />
            </div>
            <div id="pnlUpdate" class="form-group">
                <table id="tblData" class="table table-striped table-bordered" cellspacing="0" width="100%">

                </table>
            </div>
            <%--<button type="button" onclick="GetAppData()">Check for Data</button>--%>
        </div>
    </form>
</body>
</html>
