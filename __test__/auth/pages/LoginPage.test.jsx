import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../../../src/auth/pages/Login";
import React from "react";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth/authSlice";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks";
global.React = React;
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({

    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password });
    }
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => (fn) => fn()
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Pruebas en el componente <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el componente correctamente', () => {

        // TODO: COMPROBAR COMPONENTES
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        // expect(container).toMatchSnapshot();
        expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
    });


    test('Debe llamar al boton Google', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        const btnGoogle = screen.getByLabelText("google-btn");

        fireEvent.click(btnGoogle);
    });


    test('Realizar submit al formulario', () => {

        const loginData = {
            email: "email@hotmail.com",
            password: "hola"
        }

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        // campo email
        const emailField = screen.getByRole("textbox", { name: "Email" });
        fireEvent.change(emailField, { target: { name: "email", value: loginData.email } });

        // campo password
        const passwordField = screen.getByTestId("password");
        fireEvent.change(passwordField, { target: { name: "password", value: loginData.password } });

        // formulario
        const loginForm = screen.getByLabelText("submitForm");
        fireEvent.submit(loginForm)

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith(loginData);

    });
});