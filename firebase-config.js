var firebaseConfig = {
  apiKey: "AIzaSyAkFkKgbQSD_UDsHCcaochqfXO7nxCYooY",
  authDomain: "calender-8d41c.firebaseapp.com",
  projectId: "calender-8d41c",
  storageBucket: "calender-8d41c.firebasestorage.app",
  messagingSenderId: "1073376304520",
  appId: "1:1073376304520:web:7f0dec86346260bb09ae3d",
  measurementId: "G-EJTGYL18KY"
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();
