<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Analyzer.Default" %>

<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Market Analyzer</title>

    <%-- Google Hosted Libraries --%>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>

    <%-- Bootstraps must load after jQuery --%>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="script/bootstrap.min.js"></script>

    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css" />
    <link href="style/bootstrap.min.css" rel="stylesheet" />

    <script src="script/javascript.js"></script>
    <link href="style/style.css" rel="stylesheet" />

</head>
<body>
    <form id="form1" runat="server">
        <div id="pnlMain" class="center">
            <div id="pnlError" class="hidden">
                <label id="lblError"></label>
            </div>
            <div id="pnlUpdate">
            </div>
            <button type="button" onclick="GetAppData()">Check for Data</button>
        </div>
    </form>
</body>
</html>
