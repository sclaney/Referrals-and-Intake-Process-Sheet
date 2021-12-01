// get our spreadsheets
var ss = SpreadsheetApp.getActiveSpreadsheet();
var assessmentSheet = ss.getSheetByName('Assessment');
var therapySheet = ss.getSheetByName('Therapy');
var pastTherapySheet = ss.getSheetByName('Past Therapy');
var pastAssessmentSheet = ss.getSheetByName('Past Assessment');
var therapyLastRow = therapySheet.getLastRow();
var assessmentLastRow = assessmentSheet.getLastRow();
var pastTherapyLastRow = pastTherapySheet.getLastRow();
var pastAssessmentLastRow = pastAssessmentSheet.getLastRow();

// these hold json data
var therapyClients = [];
var assessmentClients = [];

// get all our date's
var today = new Date();
var yesterday = new Date();
var tomorrow = new Date();
// var pastWeek = new Date();

var dd = String(today.getDate()).padStart(2, '0');
var ddInt = parseInt(dd);
var intPlus = ddInt + 1;
var intMinus = ddInt - 1;
// var intMinusSeven = ddInt - 7;

var yesterDd = intMinus.toString();
var tomorrowDd = intPlus.toString();
// var pastSevenDd = intMinusSeven.toString();

var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
yesterday = yyyy + '-' + mm + '-' + yesterDd;
tomorrow = yyyy + '-' + mm + '-' + tomorrowDd;
// pastWeek = yyyy + '-' + mm + '-' + pastWeek;

// allows you to get the column header by its name
function getColByName(name, thisSheet) {
  
  // get column headers as an array to search through
  var headers = thisSheet.getDataRange().getValues().shift();
  
  // search array looking for specific text to return its position
  var colindex = headers.indexOf(name);
  
  return colindex+1;
}



