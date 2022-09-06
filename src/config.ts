import mockedEnv from "../mockedEnv";

export const config = {
  ApiContentUrl: mockedEnv.VITE_API_CONTENT_URL || "What are you looking for ?",
  iceServers: {
    iceServers: [
      {
        urls: [
          "stun:stun1.1.google.com:19302",
          "stun:stun2.1.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  },
  firebaseConfig: {
    apiKey: mockedEnv.VITE_API_FIREBASECONNECTIONAPI,
    authDomain: mockedEnv.VITE_API_FIREBASECONNECTIONAUTHDOMAIN,
    projectId: mockedEnv.VITE_API_FIREBASECONNECTIONAPROJECTID,
    storageBucket: mockedEnv.VITE_API_FIREBASECONNECTIONSTORAGEBUCKET,
    messagingSenderId: mockedEnv.VITE_API_FIREBASECONNECTIONMESSAGESENDERIO,
    appId: mockedEnv.VITE_API_FIREBASECONNECTIONAPIID,
  },
};
