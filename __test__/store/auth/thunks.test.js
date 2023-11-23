import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNoteLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers")
describe('Pruebas en los thunks', () => {

    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('Debe invocar chekingCredentials()', async () => {

        await checkAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    })

    test('startGoogleSignIn debe de llamar checkingCredentials() y comprueba el estado', async () => {

        const loginData = { ok: true, ...demoUser }

        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    })

    test('startGoogleSignIn debe de llamar checkingCredentials() y comprueba el estado', async () => {

        const loginData = { status: "error", errorMessage: "Error con la auth Google" }

        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

    })

    test('startLoginWithEmailPassword debe llamar a checkingCredentials() y devolver un estado', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: "12345" };
        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);


        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startLogout debe llamar a logoutFirebase, clearNotes,logout', async () => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNoteLogout());
        expect(dispatch).toHaveBeenCalledWith(logout({}));
    });

    test('startCreatingUserWithEmailPassword debe llamar a checking credentials y debe resolver registerUserWithEmailPassword() y devolver un estado', async () => {

        const responseRegisterData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: "password1234", displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue(responseRegisterData);
        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({
            uid: responseRegisterData.uid,
            email: formData.email,
            displayName: formData.displayName,
            photoURL: responseRegisterData.photoURL,
        }));

    });
})