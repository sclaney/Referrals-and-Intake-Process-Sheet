function returnProfileData(clients, thisSheet) {
  var thisRow = clients.length + 1;

  for (thisClient = 0; thisClient < clients.length; thisClient++) {
    var thisClients = clients[thisClient];
    var dateCreated = new Date(thisClients['DateCreated']).toLocaleDateString("en-US");

    thisSheet
      .getRange(thisRow,getColByName('Status', thisSheet))
      .setValue('Brand New');

    thisSheet
      .getRange(thisRow,getColByName('Date Created', thisSheet))
      .setValue(dateCreated);

    thisSheet
      .getRange(thisRow,getColByName('Client Id', thisSheet))
      .setValue(thisClients['ClientId']);

    thisSheet
      .getRange(thisRow,getColByName('Name', thisSheet))
      .setValue(thisClients['Name']);

    if (thisSheet == therapySheet) {

    thisSheet
      .getRange(thisRow,getColByName('Progress', thisSheet))
      .setFormula('=COUNTIF(G' + thisRow + ':V' + thisRow + ', "Complete")/11');

      thisSheet
        .getRange(thisRow,getColByName('Create Referral Information Note', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Consultation Call', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Waitlist: Date Added', thisSheet))
        .setValue('N/A');

      thisSheet
        .getRange(thisRow,getColByName('Waitlist: Clinician Requested', thisSheet))
        .setValue('N/A');

      thisSheet
        .getRange(thisRow,getColByName('Waitlist: Offered Spot', thisSheet))
        .setValue('N/A');

      thisSheet
        .getRange(thisRow,getColByName('Waitlist: Date Removed', thisSheet))
        .setValue('N/A');

      thisSheet
        .getRange(thisRow,getColByName('Waitlist: Reason Removed', thisSheet))
        .setValue('N/A');

      thisSheet
        .getRange(thisRow,getColByName('Assign Lead Clinician', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName("Add New Client to the Clinician's Client List Spreadsheet", thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule First Appointment in IntakeQ', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule First Appointment in Google', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule Repeating Therapy Appointment in IntakeQ', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule Repeating Therapy Appointment in Google', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Send Intake Packet', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Send Welcome Email', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName("Recieve Intake Packet", thisSheet))
        .setValue('Incomplete');

    }

    if (thisSheet == assessmentSheet) {

    thisSheet
      .getRange(thisRow,getColByName('Progress', thisSheet))
      .setFormula('=COUNTIF(G' + thisRow + ':V' + thisRow + ', "Complete")/17');

      thisSheet
        .getRange(thisRow,getColByName('Create Referral Information Note', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Consultation Call', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Assign Lead Clinician', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule Clinical Interview in IntakeQ', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule Clinical Interview in Google', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule First Testing Session in IntakeQ', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule First Testing Session in Google', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Send Intake Packet', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Send Welcome Email', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Recieve Intake Packet', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Share Google Drive Folder with Ryan, Alexandra, and Nicole', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Create Copy of Report Template', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName("Create Copy of Master Clients's Journey Checklist", thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule Additional Testing Session in Google', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule Additional Testing Session in IntakeQ', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule Feedback Session (in Google)', thisSheet))
        .setValue('Incomplete');

      thisSheet
        .getRange(thisRow,getColByName('Schedule Feedback Session (IntakeQ)', thisSheet))
        .setValue('Incomplete');

    }

    // reduce newRow by one so the next iteration logs info on the row above the last
    thisRow = thisRow - 1;

    // get the notes data to fill in Availability column
    getNotesById(thisSheet, thisClients['ClientId'], thisRow);

  }
}