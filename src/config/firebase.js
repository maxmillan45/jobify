// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

// Firebase configuration using Vite environment variables
// You need to add these to your .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredFields = [
    'apiKey',
    'authDomain', 
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];
  
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    console.error('Firebase configuration is missing required fields:', missingFields);
    return false;
  }
  return true;
};

// Initialize Firebase only if config is valid
let app = null;
let auth = null;

if (validateFirebaseConfig()) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  console.error('Firebase initialization skipped due to missing configuration');
}

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Sign in with Google Popup
export const signInWithGooglePopup = async () => {
  if (!auth) {
    return {
      success: false,
      error: 'Firebase not initialized. Please check your configuration.'
    };
  }
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();
    
    return {
      success: true,
      user: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      },
      token: idToken
    };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

// Sign out
export const logoutUser = async () => {
  if (!auth) {
    return {
      success: false,
      error: 'Firebase not initialized'
    };
  }
  
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout Error:', error);
    return { success: false, error: error.message };
  }
};

// Listen to auth state changes
export const onAuthChange = (callback) => {
  if (!auth) {
    callback({
      isAuthenticated: false,
      user: null,
      token: null,
      error: 'Firebase not initialized'
    });
    return () => {};
  }
  
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const token = await user.getIdToken();
        callback({
          isAuthenticated: true,
          user: {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
          },
          token
        });
      } catch (error) {
        console.error('Error getting token:', error);
        callback({
          isAuthenticated: false,
          user: null,
          token: null,
          error: error.message
        });
      }
    } else {
      callback({
        isAuthenticated: false,
        user: null,
        token: null
      });
    }
  });
};

// Get current user
export const getCurrentFirebaseUser = () => {
  if (!auth) {
    return Promise.resolve(null);
  }
  
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        try {
          const token = await user.getIdToken();
          resolve({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            token
          });
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
    }, reject);
  });
};

// Refresh token
export const refreshFirebaseToken = async () => {
  if (!auth) {
    return null;
  }
  
  const user = auth.currentUser;
  if (user) {
    try {
      return await user.getIdToken(true);
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  }
  return null;
};

// Export auth instance
export { auth };
export default auth;
