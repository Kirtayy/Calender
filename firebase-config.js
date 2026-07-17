// Bu değerleri Firebase Console > Project Settings > General > "Add app" (Web)
// adımında sana verilen firebaseConfig nesnesiyle değiştir.
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();
