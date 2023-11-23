import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

jest.mock("../../../src/store/journal/journalSlice")
describe('Pruebas en los thunks de Journal', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('StartNewNote debe crear una nueva nota en blanco', async () => {

        const uid = "TEST_UID";
        getState.mockReturnValue({ auth: { uid } });
        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote({}));
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote());
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: "",
            title: "",
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: expect.any(Array)
        }));


        // Borrar notas de firebase
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);
        const deletePromises = [];
        docs.forEach(element => deletePromises.push(deleteDoc(element.ref)));
        await Promise.all(deletePromises);

    });


    // TODO: SEGUIR REALIZANDO LAS PRUEBAS

});