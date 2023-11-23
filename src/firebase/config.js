import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"

import { getEnviroment } from "../helpers";

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
  VITE_MEASUREMENT_ID
} = getEnviroment();

// config database testing
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID
};
// INiciar la APP
export const FirebaseApp = initializeApp(firebaseConfig);
// Autenticacion de firebase
export const FirebaseAuth = getAuth(FirebaseApp);
// base de datos de firebase
export const FirebaseDB = getFirestore(FirebaseApp);
