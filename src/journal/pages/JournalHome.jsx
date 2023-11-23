import { IconButton, Typography } from "@mui/material";
import React from "react";
import JournalLayout from "../layout/JournalLayout";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";
import { NoteView, NothingSelectedView } from "../views";

const JournalHome = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);
  
  const onClickNewNote = () =>{
    dispatch(startNewNote());
  } 

  return (
    <JournalLayout>

      {
        (!!active) ?
          <NoteView/>
          : <NothingSelectedView />
      }
      <IconButton
        disabled={!isSaving && !!active}
        onClick={onClickNewNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ font: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};

export default JournalHome;
