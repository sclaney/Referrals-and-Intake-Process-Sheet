// call the client api and get the full profile of each client and store it globally
function getNewClients() {

  // now start by doing an API call to the clients API to get all client profiles and store that data in a global array
  var newClientResponse = UrlFetchApp.fetch('https://intakeq.com/api/v1/clients?dateCreatedStart=' + today + '&includeProfile=true', {
    headers: {
      'X-Auth-Key':'5d04e8f9a06889a86754210b04caabe586b139e8'
    }
  });
  var newClientProfiles = JSON.parse(newClientResponse);
  //Logger.log(newClientProfiles.length);

  // sorts clients array in ascending order
  newClientProfiles.sort((a, b) => {
    return a.ClientId - b.ClientId;
  });

  // get all the values of client id column with getRange(starting Row, starting column, number of rows, number of columns)
  var therapyData = therapySheet.getRange(2, 3, therapyLastRow-1, 1).getValues();
  var assessmentData = assessmentSheet.getRange(2, 3, assessmentLastRow-1, 1).getValues();
  var pastAssessmentData = pastAssessmentSheet.getRange(2, 3, pastAssessmentLastRow-1, 1).getValues();
  var pastTherapyData = pastTherapySheet.getRange(2, 3, pastTherapyLastRow-1, 1).getValues();

  // then compare them to the id's of the incoming clients and remove them from the newClientProfiles array if they already exist
  for (var i = 0; i < therapyData.length; i++) {

    for (var c = 0; c < newClientProfiles.length; c++) {
      var thisClientsId = newClientProfiles[c]['ClientId'];

      if (thisClientsId === therapyData[i][0]) {
        newClientProfiles.splice(c, 1);
      }
    }
  }

  for (var i = 0; i < assessmentData.length; i++) {

    for (var c = 0; c < newClientProfiles.length; c++) {
      var thisClientsId = newClientProfiles[c]['ClientId'];

      if (thisClientsId === assessmentData[i][0]) {
        newClientProfiles.splice(c, 1);
      }
    }
  }

  for (var i = 0; i < pastAssessmentData.length; i++) {

    for (var c = 0; c < newClientProfiles.length; c++) {
      var thisClientsId = newClientProfiles[c]['ClientId'];

      if (thisClientsId === pastAssessmentData[i][0]) {
        newClientProfiles.splice(c, 1);
      }
    }
  }

  for (var i = 0; i < pastTherapyData.length; i++) {

    for (var c = 0; c < newClientProfiles.length; c++) {
      var thisClientsId = newClientProfiles[c]['ClientId'];

      if (thisClientsId === pastTherapyData[i][0]) {
        newClientProfiles.splice(c, 1);
      }
    }
  }

  // now we do a for loop through every profile and determine what sheet to assign data to
  if (newClientProfiles.length > 0) {
    for (thisProfile = 0; thisProfile < newClientProfiles.length; thisProfile++) {
      var thisProfilesService = newClientProfiles[thisProfile]['CustomFields'][15]['Value'];
      var thisClient = newClientProfiles[thisProfile];

      if (thisProfilesService == 'Therapy & Assessment') {
        therapyClients.push(thisClient);
        assessmentClients.push(thisClient);

      } else if (thisProfilesService == 'Assessment') {
        assessmentClients.push(thisClient);

      } else if (thisProfilesService == 'Therapy') {
        therapyClients.push(thisClient);

      }

    }
  }

  // now we check to see if there are any clients in our arrays and if so, we insert new rows and call the returnProfileData function
  if (therapyClients.length > 0) {
    therapySheet.insertRows(2, therapyClients.length);
    returnProfileData(therapyClients, therapySheet);
  }

  if (assessmentClients.length > 0) {
    assessmentSheet.insertRows(2, assessmentClients.length);
    returnProfileData(assessmentClients, assessmentSheet);
  }

  // I'm not sure what this was supposed to do
  // function getFullColumn(column, startIndex, thisSheet){
  //   var sheet = thisSheet;
  //   var lastRow = sheet.getLastRow();
  //   return sheet.getRange(column+startIndex+':'+column+lastRow).getValues();
  // }

}



