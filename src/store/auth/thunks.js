
import { logoutFirebase, loginWithEmailPassword, signInWithGoogle, registerUserWithEmailPassword } from "../../firebase/providers";
import { clearNoteLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

// Son acciones que despachan
export const checkAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (result.status === "error") return dispatch(logout(result.errorMessage))
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { status, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
        if (status === "error") return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, email, displayName, photoURL }))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const res = await loginWithEmailPassword({ email, password });
        if (res.status === "error") return dispatch(logout(res));
        delete res.status;
        dispatch(login(res));
    }
}

export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebase();
        dispatch(clearNoteLogout());
        dispatch(logout({}))
    }
}