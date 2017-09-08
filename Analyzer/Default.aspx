<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Analyzer.Default" %>

<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Market Analyzer</title>

    <%-- CSS --%>
    <link rel="stylesheet" href="http://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" />
    <link rel="stylesheet" href="style/bootstrap.min.css" />
    <link rel="stylesheet" href="style/style.css" />

    <%-- Scripts --%>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="http://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
    <script src="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
    <script src="script/bootstrap.min.js"></script>
    <script src="script/javascript.js"></script>
</head>
<body>
    <form id="form1" runat="server" aria-label="form">
        <div id="pnlMain" class="center">
            <%-- Where the magic happens --%>
            <div id="pnlUpdate" class="form-group">
            </div>
        </div>
    </form>
</body>
</html>
