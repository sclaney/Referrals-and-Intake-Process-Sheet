function countColoredCells(countRange,colorRef,unUsed) {
  var backGrounds = SpreadsheetApp.getActiveSheet().getRange(countRange).getBackgrounds();
  var countCells = 0;
  for (var i = 0; i < backGrounds.length; i++)
    for (var k = 0; k < backGrounds[i].length; k++)
      if ( backGrounds[i][k] == colorRef )
      countCells = countCells + 1;
      return countCells;
};

// Writes a random number to A1
function onEdit(e) {
  SpreadsheetApp.getActiveSheet().getRange('AC1').setValue(Math.random());
}


