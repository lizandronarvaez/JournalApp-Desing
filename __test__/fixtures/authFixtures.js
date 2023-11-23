export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated',
    uid: "ABC1234",
    email: "usuario@google.com",
    displayName: "Usuario Demo",
    photoURL: null,
    errorMessage: null
}

export const notAuthenticatedState = {

    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: "ABC1234" || undefined,
    email: "usuario@google.com",
    displayName: "Usuario Demo",
    photoURL: null || undefined,
    errorMessage: null || undefined
}