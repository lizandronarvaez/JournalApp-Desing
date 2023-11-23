import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"


describe('Pruebas en el authSlice', () => {

    test('Debe regresar un estado inicial y llamarse "auth"', () => {


        const state = authSlice.reducer(initialState, {})

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe("auth");
    })

    test('Comprobar que el usuario esta autenticado', () => {


        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state.status).toEqual("authenticated");

    })

    test('Debe realizar el logout sin parametros', () => {

        const notAuthenticated = {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        }
        const state = authSlice.reducer(notAuthenticated, logout());
        expect(state).toEqual(notAuthenticated);
    })
    test('Comprobar que el usuario esta desautenticado', () => {

        const errorMessage = "Credenciales no son correctas";
        const notAuthenticated = {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage
        }

        const state = authSlice.reducer(notAuthenticatedState, logout({ errorMessage }));
        expect(state).toEqual(notAuthenticated);

    })


    test("Comprobar si el status cambia", () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        expect(state.status).toEqual("checking");
    })
})