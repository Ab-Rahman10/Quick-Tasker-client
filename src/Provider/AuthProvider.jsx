import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import auth from "../Firebase/Firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  //   create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   update profile
  const userProfileUpdate = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //   login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   user logout
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   current user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Current user-->", currentUser);
      // Generate a token-----------------------------------
      // if (currentUser?.email) {
      //   const { data } = await axios.post(
      //     `${import.meta.env.VITE_API_URL}/jwt`,
      //     {
      //       email: currentUser?.email,
      //     },
      //     {
      //       withCredentials: true,
      //     }
      //   );
      //   setUser(currentUser);
      // } else {
      //   const { data } = await axios.get(
      //     `${import.meta.env.VITE_API_URL}/logout`,
      //     { withCredentials: true }
      //   );
      //   setUser(currentUser);
      // }

      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  //   google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    loginUser,
    logoutUser,
    googleSignIn,
    userProfileUpdate,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
