importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDU08rG5sz69BeCOO4198VE-KwVpl4PEEI",
  authDomain: "mazedpushnotification.firebaseapp.com",
  databaseURL: "https://mazedpushnotification-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mazedpushnotification",
  storageBucket: "mazedpushnotification.appspot.com",
  messagingSenderId: "895372185435",
  appId: "1:895372185435:web:ab9665f01683568451147e",
  measurementId: "G-M1VJ45WTBS"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
