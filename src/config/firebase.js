/**
 * Firebase Firestore Integration Config (Optional Bonus)
 * Fill in your Firebase Project configuration keys below to sync directly with Firestore.
 * If unset, the app seamlessly uses the Express REST API / local persistent storage.
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

export const isFirebaseConfigured = () => {
  return Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);
};
