//copied from firbase site!
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgcokZlu0Xr8Te1qeInw4YQXFYxwXMA-w",
  authDomain: "fittracker-5d578.firebaseapp.com",
  projectId: "fittracker-5d578",
  storageBucket: "fittracker-5d578.firebasestorage.app",
  messagingSenderId: "1022110358046",
  appId: "1:1022110358046:web:930b02d03e600f5de06c0f",
  measurementId: "G-TLYN3JXZ5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

