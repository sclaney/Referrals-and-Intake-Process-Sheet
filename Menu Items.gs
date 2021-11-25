// create the button in the top menu of the document
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Sheet Updater')
      .addItem('Update Sheet', 'getNewClients')
      .addItem('Client Info', 'getClientInfoSidebar')
      .addToUi();
}

function getClientInfoSidebar() {
 var widget = HtmlService.createHtmlOutputFromFile("ClientInfoSidebar.html");
 SpreadsheetApp.getUi().showSidebar(widget);
}
