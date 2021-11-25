function updateStatusOnEdit(clientId, value) {
  Logger.log(clientId);
    var getClientData = UrlFetchApp.fetch('https://intakeq.com/api/v1/clients?search=' + clientId + '&includeProfile=true', {
      headers: {
        'X-Auth-Key':'5d04e8f9a06889a86754210b04caabe586b139e8'
      }
    });
    var clientData = JSON.parse(getClientData);
    Logger.log(clientData);
    var firstName = clientData[0]['FirstName'];
    var lastName = clientData[0]['LastName'];
    var phone = clientData[0]['Phone'];
    var email = clientData[0]['Email'];

    // Make a POST request with a JSON payload.
    var data = {
      'ClientId': clientId,
      'FirstName': firstName,
      'LastName': lastName,
      'Email': email,
      'Phone' : phone,
      'CustomFields': [
        {
          'FieldId': 'g1e5',
          'Value': value
        }
      ]
    };
    var options = {
      headers: {
        'X-Auth-Key':'5d04e8f9a06889a86754210b04caabe586b139e8'
      },
      'method' : 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload' : JSON.stringify(data)
    };
    UrlFetchApp.fetch('https://intakeq.com/api/v1/clients', options);
}