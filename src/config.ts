import mockedEnv from "../mockedEnv";

export const config = {
  ApiContentUrl: mockedEnv.VITE_API_CONTENT_URL || "What are you looking for ?",
  firebaseConfig: {
    apiKey: mockedEnv.VITE_API_FIREBASECONNECTIONAPI,
    authDomain: mockedEnv.VITE_API_FIREBASECONNECTIONAUTHDOMAIN,
    projectId: mockedEnv.VITE_API_FIREBASECONNECTIONAPROJECTID,
    storageBucket: mockedEnv.VITE_API_FIREBASECONNECTIONSTORAGEBUCKET,
    messagingSenderId: mockedEnv.VITE_API_FIREBASECONNECTIONMESSAGESENDERIO,
    appId: mockedEnv.VITE_API_FIREBASECONNECTIONAPIID,
  },
};
