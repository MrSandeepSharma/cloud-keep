import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, updateProfile, 
    signInWithPopup, GoogleAuthProvider, signInAnonymously, 
    sendPasswordResetEmail } from "firebase/auth";

import app from "./config";

class AuthService {
    constructor() {
        this.auth = getAuth(app)
    }

    async createUserUsingEmail(email, password, username) {
        try {
            const userAccount = await createUserWithEmailAndPassword(this.auth, email, password)
            if (userAccount) {
                updateProfile(this.auth.currentUser, { displayName: username })
                this.loginWithEmail(email, password)
                return userAccount
            } else {
                return userAccount
            }
        } catch (error) {
            return error;
        }
    }

    async loginUserUsingEmail(email, password) {
        try {
            return await signInWithEmailAndPassword(this.auth, email, password)
        } catch (error) {
            return error;
        }
    }

    async loginUserUsingGoogle() {
        try {
            const provider = new GoogleAuthProvider()
            return await signInWithPopup(this.auth, provider)
        } catch (error) {
            return error
        }
    }

    async forgotPassword(email) {
        try {
            const res = await sendPasswordResetEmail(this.auth, email);
            return res
        } catch (error) {
            return error
        }
    }

    async loginUserAsGhost() {
        try {
            const userAccount = await signInAnonymously(this.auth)
            if (userAccount) {
                updateProfile(this.auth.currentUser, { displayName: "Ghost Account", })
                return userAccount
            } else {
                return userAccount
            }
        } catch (error) {
            return error
        }
    }

    async getCurrentUser() {
        try {
            return await this.auth.currentUser
        } catch (error) {
            return error
        }
    }

    async logoutCurrentUser() {
        try {
            return await this.auth.signOut()
        } catch (error) {
            return error
        }
    }
}

const authService = new AuthService()

export default authService