const ApiContentUrl = import.meta.env.VITE_API_CONTENT_URL;

export const config = {
  ApiContentUrl: ApiContentUrl || "What are you looking for ?",
  firebaseConfig: {
    apiKey: import.meta.env.VITE_API_FIREBASECONNECTIONAPI,
    authDomain: import.meta.env.VITE_API_FIREBASECONNECTIONAUTHDOMAIN,
    projectId: import.meta.env.VITE_API_FIREBASECONNECTIONAPROJECTID,
    storageBucket: import.meta.env.VITE_API_FIREBASECONNECTIONSTORAGEBUCKET,
    messagingSenderId: import.meta.env
      .VITE_API_FIREBASECONNECTIONMESSAGESENDERIO,
    appId: import.meta.env.VITE_API_FIREBASECONNECTIONAPIID,
  },
};
