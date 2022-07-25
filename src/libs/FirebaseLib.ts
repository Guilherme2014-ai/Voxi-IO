import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { config } from "../config";

initializeApp(config.firebaseConfig);

const firebaseAuth = getAuth();

export { firebaseAuth };
