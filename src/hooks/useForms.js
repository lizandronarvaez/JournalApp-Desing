import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValid, setformValid] = useState({});

    useEffect(() => {
        createValidator();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])
    // Funcion para verificar que el formulario no esta vacio
    const isFormValid = useMemo(() => {

        for (const formField of Object.keys(formValid)) {
            if (formValid[formField] !== null) return false
        }
        return true;
    }, [formValid]);

    // Funcion que lee los inputs
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    // Funcion para reestablecer el formulario
    const onResetForm = () => {
        setFormState(initialForm);
    }

    // Funcion para crear el validador de campos personalizados
    const createValidator = () => {

        const formCheckValues = {}

        for (const field of Object.keys(formValidations)) {
            const [fn, messageError] = formValidations[field];
            formCheckValues[`${field}Valid`] = fn(formState[field]) ?
                null
                : messageError
        }
        setformValid(formCheckValues)

    }
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValid,
        isFormValid
    }
}