import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import { FirebaseAuth } from "./config";

// Se crea un proveedor 
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

// Metodo para crear la atenticacion con google
export const signInWithGoogle = async () => {

    try {
        // Se crea la autenticacion que aparezca un popup cuando se inicie sesion
        // primer parametro el metodo de autenticacion y el segundo el proveedor de autentiacion
        const result = await signInWithPopup(FirebaseAuth, googleProvider);

        const { displayName, email, photoURL, uid } = result.user;
        return {
            status: 'ok',
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        //mensajes de error
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return {
            status: 'error',
            errorMessage
        }
    }
}

// Rgistrarse con mail y password
export const registerUserWithEmailPassword = async ({ email, displayName, password }) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        return {
            status: "ok",
            uid,
            photoURL,
            displayName
        }
    } catch (error) {

        return {
            status: "error",
            errorMessage: error.message
        }
    }
}

// Logearse con mail and password
export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        console.log(response)
        const { uid, photoURL, displayName } = response.user;
        return {
            status: 'ok',
            uid,
            photoURL,
            displayName
        }
    } catch (error) {
        return {
            status: 'error',
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {
    // Cerrar sesion
    return await FirebaseAuth.signOut();
}