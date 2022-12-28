import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const continueWithProvider = provider => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const userProfileUpdate = userInfo => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo);
    };

    const userLogOut = () => {
        localStorage.removeItem('accessToken')
        setLoading(true);
        return signOut(auth)
    };


    useEffect(() => {
        const unSubscriber = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscriber();
    }, []);



    const authInfo = {
        user,
        createUser,
        userLogin,
        continueWithProvider,
        userProfileUpdate,
        userLogOut,
        loading,
        setLoading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;