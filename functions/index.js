const functions = require('firebase-functions');
const request = require('request');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// exports.proxy2 = functions.https.onRequest((req, res) => {
//   var url = apiServerHost + req.url;
//   console.log(url);
//   req.pipe(request(url)).pipe(res);
// });
