function countColoredCells(countRange,colorRef,unUsed) {
  var activeRg = SpreadsheetApp.getActiveRange();
  var activeSht = SpreadsheetApp.getActiveSheet();
  var activeformula = activeRg.getFormula();
  // The regex matches the parentheses as an array, gets the arguments as a string,
  // then splits the arguments on the comma into another array
  var arrayOfArguments = activeformula.match(/\((.*)\)/).pop().trim().split(',');
  // Get the range as a string by splicing the first part of the forumla off
  var countRangeAddress = arrayOfArguments[0].slice(18);
  Logger.log(countRangeAddress);
  var backGrounds = activeSht.getRange(countRangeAddress).getBackgrounds();
  var countCells = 0;
  for (var i = 0; i < backGrounds.length; i++)
    for (var k = 0; k < backGrounds[i].length; k++)
      if ( backGrounds[i][k] == colorRef )
        countCells = countCells + 1;
        return countCells;
};

// Writes a random number to AC1. Uncomment to get this code working again
// function onEdit(e) {
//   SpreadsheetApp.getActiveSheet().getRange('AC1').setValue(Math.random());
// }


