<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Analyzer.Default" %>

<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Market Analyzer</title>

    <%-- CSS --%>
    <link rel="stylesheet" href="//cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="style/bootstrap.min.css" />
    <link rel="stylesheet" href="style/style.css" />

    <%-- Scripts --%>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
    <script src="script/bootstrap.min.js"></script>
    <script src="script/javascript.js"></script>
</head>
<body>
    <form id="form1" runat="server" aria-label="form">
        <div id="pnlMain" class="center">
            <div class="form-group">
<%--                <label id="lblInFile"></label>
                <input id="inFile" type="file" onchange="uploadCSV(event)" aria-label="inFile" />--%>
            </div>
            <div id="pnlUpdate" class="form-group">
                <table id="tblTable" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                    </tbody>
                </table>
            </div>
            <button type="button" onclick="getData('GetBuysData')">Check for Data</button>
        </div>
    </form>
</body>
</html>
