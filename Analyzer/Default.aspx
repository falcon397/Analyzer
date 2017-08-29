<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Analyzer.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Market Analyzer</title>
    <script src="script/javascript.js"></script>
    <link href="style/style.css" rel="stylesheet" />

    <%-- Bootstraps --%>
    <script src="script/bootstrap.min.js"></script>
    <link href="style/bootstrap.min.css" rel="stylesheet" />

    <%-- Google Hosted Libraries --%>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div id="pnlMain" class="center">
            <div id="pnlUpdate">
                <asp:Label ID="lblError" runat="server" Text=""></asp:Label>
                <div id="pnlTable"></div>
            </div>
            <asp:Button ID="btnSubmit" runat="server" Text="Get Data" />
        </div>
    </form>
</body>
</html>
