// This automatically sorts the clients by status so that the grouping always makes sense
function autoSortRows(thisSheet) {
  var headerRows = 1;
  var sortStatus = 1; // 1 is Column "A"
  var sortStatusAsc = true; // When it's "true", the order is what you set for sortOrder.
  var sortDateCreated = 5; // 5 is Column "E"
  var sortDateCreatedAsc = false; // When it's "true", the order is ascending.

  // Retrieve values from Spreadsheet.
  var range = thisSheet.getRange(headerRows+1, 1, thisSheet.getLastRow()-headerRows, thisSheet.getLastColumn());
  var values = range.getValues();

  // First, sort by date created
  var sort1 = sortDateCreatedAsc ? 1 : -1;
  values.sort(function(a, b) {
    return (a[sortDateCreated - 1] < b[sortDateCreated - 1] ? -sort1 : sort1)
  });

  // Then, sort by the custom values list
  var sortOrder = ['Brand New','Scheduling Consultation Call', 'Follow-Up', 'Onboarding', 'Waitlisted'];
  var sort2 = sortStatusAsc ? 1 : -1;
  values.sort(function(a, b) {
    var i1 = sortOrder.indexOf(a[sortStatus - 1]);
    var i2 = sortOrder.indexOf(b[sortStatus - 1]);
    var vlen =  values.length;
    return sort2 * ((i1 > -1 ? i1 : vlen) - (i2 > -1 ? i2 : vlen));
  });

  // Now, do the actual sorting in the sheet
  thisSheet.getRange(2, 1, values.length, values[0].length).setValues(values);

}
