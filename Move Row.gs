function atEdit(event) {
  var s = event.source.getActiveSheet();
  var r = event.source.getActiveRange();
  var value = r.getValue();
  var row = r.getRow();
  var numColumns = s.getLastColumn();
  var clientId = s.getRange(row, 3).getValue();

  // update the client's status on their intakeq profile if it's edited on the sheet
  if (r.getColumn() == 1 && r.getValue() == "Brand New" ||
      r.getColumn() == 1 && r.getValue() == "Scheduling Consultation Call" || 
      r.getColumn() == 1 && r.getValue() == "Onboarding" || 
      r.getColumn() == 1 && r.getValue() == "Follow-Up"
     ) {
    updateStatusOnEdit(clientId, value);
    autoSortRows(s);

  // move row if its one of these statuses and in therapy sheet
  } else if (
     s.getName() == "Therapy" && r.getColumn() == 1 && r.getValue() == "Referral Process Complete" ||
     s.getName() == "Therapy" && r.getColumn() == 1 && r.getValue() == "Nonresponsive" ||
     s.getName() == "Therapy" && r.getColumn() == 1 && r.getValue() == "Did Not Continue"
  ) {
    s.getRange(row, 1, 1, numColumns).moveTo(pastTherapySheet.getRange(pastTherapyLastRow + 1, 1));
    s.deleteRow(row);

  // move row if its one of these statuses and in assessment sheet
  } else if (
     s.getName() == "Assessment" && r.getColumn() == 1 && r.getValue() == "Referral Process Complete" ||
     s.getName() == "Assessment" && r.getColumn() == 1 && r.getValue() == "Nonresponsive" ||
     s.getName() == "Assessment" && r.getColumn() == 1 && r.getValue() == "Did Not Continue" 
  ) {
    s.getRange(row, 1, 1, numColumns).moveTo(pastAssessmentSheet.getRange(pastAssessmentLastRow + 1, 1));
    s.deleteRow(row);

  // make a get request to get client info needed for post request, then make post request to update client status
  } else if (r.getColumn() == 15) {
    updateClinicianOnEdit(clientId, value)

  // if they get waitlisted, update the tasks
  } else if (s.getName() == "Therapy" && r.getColumn() == 1 && r.getValue() == "Waitlisted") {

    // do the sorting and status updating before the task updating because the task updating takes a little while
    updateStatusOnEdit(clientId, value);
    autoSortRows(s);

    // grab the row and update the waitlist tasks 
    var row = r.getRow();

    s
      .getRange(row,getColByName('Waitlist: Date Added', s))
      .setValue('Incomplete');

    s
      .getRange(row,getColByName('Waitlist: Clinician Requested', s))
      .setValue('Incomplete');

    s
      .getRange(row,getColByName('Waitlist: Offered Spot', s))
      .setValue('Incomplete');

    s
      .getRange(row,getColByName('Waitlist: Date Removed', s))
      .setValue('Incomplete');

    s
      .getRange(row,getColByName('Waitlist: Reason Removed', s))
      .setValue('Incomplete');

    s 
      .getRange(row, getColByName('Progress', s))
      .setFormula('=COUNTIF(H13:Q13, "Complete")/16');

  } else if (s.getName() == "Therapy" && r.getColumn() == 20 && r.getValue() == "Complete") {
    var row = r.getRow();

    s
      .getRange(row,getColByName('Recieve Intake Packet', s))
      .setValue('Waiting');

  }
}

  // use this code to move something from Past Referral back into active. It just requires you to add a service to each client so it knows which sheet to move the client to
  // } else if (s.getName() == "Past Referral" && r.getColumn() == 1 && r.getValue() == "Brand New" &&  ||
  //           s.getName() == "Past Referral" && r.getColumn() == 1 && r.getValue() == "Scheduling Consultation Call" ||
  //           s.getName() == "Past Referral" && r.getColumn() == 1 && r.getValue() == "Waitlisted" ||
  //           s.getName() == "Past Referral" && r.getColumn() == 1 && r.getValue() == "Onboarding" ||
  //           s.getName() == "Past Referral" && r.getColumn() == 1 && r.getValue() == "Follow-Up"
  // ) {
  //   var row = r.getRow();
  //   var numColumns = s.getLastColumn();
  //   var targetSheet = ss.getSheetByName("Therapy");
  //   var target = targetSheet.getRange(targetSheet.getLastRow() + 1, 1);
  //   s.getRange(row, 1, 1, numColumns).moveTo(target);
  //   s.deleteRow(row);











