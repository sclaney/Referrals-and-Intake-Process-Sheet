// call this function to get all the notes associated with each client using their id
function getNotesById(thisSheet, clientId, thisRow) {
    
  var noteResponse = UrlFetchApp.fetch('https://intakeq.com/api/v1/notes/summary?clientId=' + clientId, {
    headers: {
      'X-Auth-Key':'5d04e8f9a06889a86754210b04caabe586b139e8'
    }
  });
  var noteJson = noteResponse.getContentText();
  var noteJsonParsed = JSON.parse(noteJson);

  if (noteJsonParsed.length > 0) {
    for (thisNote = 0; thisNote < noteJsonParsed.length; thisNote++) {
      var thisNotes = noteJsonParsed[thisNote];

      if (thisNotes['NoteName'] === 'Referral Information') {
        getReferralNote(thisNotes['Id'], thisSheet, thisRow);
      }
    }
  }
}

// call this function to get the referral note of each client
function getReferralNote(referralNoteId, thisSheet, thisRow) {

  // do another api call using the note's id to get to its questions array
  var noteIdResponse = UrlFetchApp.fetch('https://intakeq.com/api/v1/notes/' + referralNoteId, {
    headers: {
      'X-Auth-Key':'5d04e8f9a06889a86754210b04caabe586b139e8'
    }
  });
  var referralNoteJson = noteIdResponse.getContentText();
  var referralNoteJsonParsed = JSON.parse(referralNoteJson);
 
  // then use this function to get the data from each referral note's questions object
  returnReferralData(referralNoteJsonParsed, thisSheet, thisRow);

}

function returnReferralData(referralNoteQuestions, thisSheet, thisRow) {

  // define the questions portion of the json data
  var theQuestions = referralNoteQuestions['Questions'];

  // loop through each question and assign its value to the sheet based off its Text value
  for (questionNum = 0; questionNum < theQuestions.length; questionNum++) {
    var thisQuestions = theQuestions[questionNum];

    if (thisQuestions['Text'] === "Client's Availability") {

        thisSheet
          .getRange(thisRow+1,getColByName('Availability', thisSheet))
          .setValue(thisQuestions['Answer']);

    }
  }
}