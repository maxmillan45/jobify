// firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';

// Firebase configuration using Vite environment variables
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
  
  // Set persistence to local (keeps user logged in)
  setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
      console.error('Error setting persistence:', error);
    });
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

// ==================== GOOGLE AUTH ====================

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

// Sign in with Google Redirect (better for mobile)
export const signInWithGoogleRedirect = () => {
  if (!auth) {
    console.error('Firebase not initialized');
    return;
  }
  return signInWithRedirect(auth, googleProvider);
};

// Handle redirect result (call this in your main App component)
export const handleRedirectResult = async () => {
  if (!auth) {
    return {
      success: false,
      error: 'Firebase not initialized'
    };
  }
  
  try {
    const result = await getRedirectResult(auth);
    if (result) {
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
    }
    return null;
  } catch (error) {
    console.error('Redirect Result Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// ==================== EMAIL/PASSWORD AUTH ====================

// Register with email and password
export const registerWithEmail = async (email, password, name) => {
  if (!auth) {
    return {
      success: false,
      error: 'Firebase not initialized. Please check your configuration.'
    };
  }
  
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Update profile with name
    if (name) {
      await updateProfile(user, { displayName: name });
    }
    
    // Send email verification
    await sendEmailVerification(user);
    
    const idToken = await user.getIdToken();
    
    return {
      success: true,
      user: {
        uid: user.uid,
        name: name || user.displayName,
        email: user.email,
        emailVerified: user.emailVerified
      },
      token: idToken
    };
  } catch (error) {
    console.error('Registration Error:', error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

// Login with email and password
export const loginWithEmail = async (email, password) => {
  if (!auth) {
    return {
      success: false,
      error: 'Firebase not initialized. Please check your configuration.'
    };
  }
  
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
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
    console.error('Login Error:', error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  if (!auth) {
    return {
      success: false,
      error: 'Firebase not initialized. Please check your configuration.'
    };
  }
  
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset email sent' };
  } catch (error) {
    console.error('Password Reset Error:', error);
    return { 
      success: false, 
      error: error.message,
      code: error.code
    };
  }
};

// Send email verification
export const sendVerificationEmail = async () => {
  if (!auth) {
    return {
      success: false,
      error: 'Firebase not initialized'
    };
  }
  
  const user = auth.currentUser;
  if (!user) {
    return {
      success: false,
      error: 'No user logged in'
    };
  }
  
  try {
    await sendEmailVerification(user);
    return { success: true, message: 'Verification email sent' };
  } catch (error) {
    console.error('Send Verification Error:', error);
    return { success: false, error: error.message };
  }
};

// ==================== COMMON FUNCTIONS ====================

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

// Get current user
export const getCurrentFirebaseUser = () => {
  return new Promise((resolve, reject) => {
    if (!auth) {
      resolve(null);
      return;
    }
    
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

// Listen to auth state changes - THIS IS THE EXPORT YOU NEED
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

// Check if email is verified
export const isEmailVerified = () => {
  if (!auth) {
    return false;
  }
  
  const user = auth.currentUser;
  return user ? user.emailVerified : false;
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  if (!auth) {
    return {
      success: false,
      error: 'Firebase not initialized'
    };
  }
  
  const user = auth.currentUser;
  if (!user) {
    return {
      success: false,
      error: 'No user logged in'
    };
  }
  
  try {
    await updateProfile(user, profileData);
    return { success: true, user: {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }};
  } catch (error) {
    console.error('Update Profile Error:', error);
    return { success: false, error: error.message };
  }
};

// Export auth and app instances
export { auth, app };
export default auth;