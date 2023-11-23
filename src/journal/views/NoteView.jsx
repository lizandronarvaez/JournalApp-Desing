import { DeleteOutline, SaveOutlined, UploadFileOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef } from "react";
import ImageGallery from "./ImageGallery";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "../../hooks/useForms.js"
import { addNewEmptyNote, setActiveNote } from "../../store/journal/journalSlice.js";
import { startDeletingNote, startUpdateNote, startUploadingFiles } from "../../store/journal/thunks.js";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const NoteView = () => {

  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const { messageSave, active: note, isSaving } = useSelector(state => state.journal);
  const { id, body, title, date, onInputChange, formState, onResetForm } = useForm(note);

  const dateString = useMemo(() => {
    const newDateFormat = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', newDateFormat);
  }, [date])

  const onSubmitNote = () => {
    if (note) dispatch(startUpdateNote());

    dispatch(addNewEmptyNote({ formState }));
    onResetForm()
  }

  const onChangeInputFile = ({ target }) => {
    const { files } = target;
    if (files.length === 0) return;

    dispatch(startUploadingFiles(files));
  }

  const deleteNote = () => {
    Swal.fire({
      title: "Borrar nota",
      text: "Desea borrar la nota?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar nota",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        dispatch(startDeletingNote())
      }
    });
  }
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState])

  useEffect(() => {
    if (messageSave.length > 0) {
      Swal.fire({
        title: `Nota: ${messageSave}`,
        text: "Actualizada correctamente",
        icon: "success"
      });
    }
  }, [messageSave]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Grid item>
          <Typography
            fontSize={18}
            fontWeight="ligth"
            textTransform={"capitalize"}>
            Fecha Creación Nota: {dateString}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            disabled={isSaving}
            color="primary"
            sx={{ padding: 3 }}
            onClick={onSubmitNote}
          >
            <SaveOutlined
              sx={{
                fontSize: 30,
                mr: 1
              }} />
            Guardar
          </Button>
          <input
            type="file"
            onChange={onChangeInputFile}
            style={{ display: "none" }}
            ref={fileInputRef}
            multiple
          />
          <IconButton
            color="primary"
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadOutlined>

            </UploadOutlined>
          </IconButton>
        </Grid>
        <Grid container>
          <TextField
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese un titulo"
            label="Titulo"
            sx={{ border: "none", mb: 1 }}
            value={title}
            name="title"
            onChange={onInputChange}
          />
          <TextField
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="¿Que sucedió hoy?"
            minRows={5}
            value={body}
            name="body"
            onChange={onInputChange}
          />
        </Grid>
        <Grid container justifyContent="end">
          <Button>
            <DeleteOutline
              sx={{ mt: 2 }}
              color="error"
              onClick={deleteNote}
            >
              Eliminar nota
            </DeleteOutline>
          </Button>
        </Grid>
        {/* Galeria de imagenes */}
        <ImageGallery
          key={note.id}
          images={note.imageUrls}
        />
      </Grid>
    </>
  );
};

export default NoteView;
