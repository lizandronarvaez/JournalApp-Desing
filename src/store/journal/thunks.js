import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNotes,
} from "./journalSlice";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";


export const startNewNote = () => {

    return async (dispatch, getState) => {
        try {
            dispatch(savingNewNote());

            const { uid } = getState().auth;


            const newNote = { title: "", body: "", imageUrls: [], date: new Date().getTime() };
            const newDocRef = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), newNote);
            newNote.id = newDocRef.id;

            dispatch(addNewEmptyNote(newNote));
            dispatch(setActiveNote(newNote));
        } catch (error) {
            console.log("Error creando la nota");
        }


    };
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().auth;
            const notesLoad = await loadNotes(uid);
            dispatch(setNotes(notesLoad));
        } catch (error) {
            console.log("Error cargando las notas");
        }


    };
};

export const startUpdateNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        try {
            const { uid } = getState().auth;
            const { active: noteActive } = getState().journal;

            const sendNoteFireStore = { ...noteActive };
            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteActive.id}`);

            await setDoc(docRef, sendNoteFireStore, { merge: true });
            dispatch(updateNotes(noteActive));
        } catch (error) {
            console.log("Error actualizando la nota");
        }

    };
};
// Carga de imagenes
export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromises = [];

        try {

            for (const img of files) {
                if (img) fileUploadPromises.push(fileUpload(img));
            }
            const photosUrls = await Promise.all(fileUploadPromises);
            dispatch(setPhotosToActiveNote(photosUrls));
        } catch (error) {
            throw new Error(error.message);
            console.log(error)
        }

    };
};

// Eliminar la nota
export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const path = `${uid}/journal/notes/${note.id}`;
        const docRef = doc(FirebaseDB, path);

        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));

    }
}