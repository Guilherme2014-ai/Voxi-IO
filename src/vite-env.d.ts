/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_CONTENT_URL: string;

  readonly VITE_API_FIREBASECONNECTIONAPI: string;
  readonly VITE_API_FIREBASECONNECTIONAUTHDOMAIN: string;
  readonly VITE_API_FIREBASECONNECTIONAPROJECTID: string;
  readonly VITE_API_FIREBASECONNECTIONSTORAGEBUCKET: string;
  readonly VITE_API_FIREBASECONNECTIONMESSAGESENDERIO: string;
  readonly VITE_API_FIREBASECONNECTIONAPIID: string;

  // more env variables...
}
