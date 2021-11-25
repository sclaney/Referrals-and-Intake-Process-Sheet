// I don't use this since I don't really need to update the clients data for the referral and intake sheet
function updateProfileData(clients) {
  var thisRow = clients.length + 1;

  for (thisClient = 0; thisClient < clients.length; thisClient++) {
    var thisClients = clients[thisClient];

    if (thisClients['ClientId'] === 104) {
      Logger.log(thisClients);
    }

    sheet
      .getRange(thisRow,2)
      .setValue(thisClients['ClientId']);

    sheet
      .getRange(thisRow,3)
      .setValue(thisClients['Name']);

    sheet
      .getRange(thisRow,5)
      .setValue(thisClients['Phone']);

    sheet
      .getRange(thisRow,6)
      .setValue(thisClients['Email']);
      
    // loop through to check the values of all the custom fields
    for (i = 0; i < thisClients['CustomFields'].length; i++) {

      if (thisClients['CustomFields'][i]['Text'] === 'Chosen Name') {
        sheet.getRange(thisRow,4).setValue(thisClients['CustomFields'][i]['Value']);

      } else if (thisClients['CustomFields'][i]['Text'] === 'Pronouns') {
        sheet.getRange(thisRow,7).setValue(thisClients['CustomFields'][i]['Value']);

      } else if (thisClients['CustomFields'][i]['Text'] === 'Service Type') {
        sheet.getRange(thisRow,8).setValue(thisClients['CustomFields'][i]['Value']);
      }
    }
  }
}