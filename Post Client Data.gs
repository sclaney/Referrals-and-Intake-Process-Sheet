function myFunction() {
  // Make a POST request with a JSON payload.
  var data = {
    'ClientId': '326',
    'FirstName': 'Jest',
    'LastName': 'Test',
    'Email': 'test@test.com'
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
