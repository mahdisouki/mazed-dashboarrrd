import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
const swConfig = {
    onUpdate: (registration) => {
      console.log('New content is available; refresh the page to update.');
      // Optionally trigger UI updates or notifications
    },
    onSuccess: (registration) => {
      console.log('Service worker registration successful.');
      // Optionally perform actions upon successful registration
    }
  };
  
  // Register the service worker with configuration
  serviceWorkerRegistration.register(swConfig);
