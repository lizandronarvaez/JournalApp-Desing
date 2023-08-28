import { IconButton, Typography } from "@mui/material";
import React from "react";
import JournalLayout from "../layout/JournalLayout";
import NothingSelectedView from "../views/NothingSelectedView";
import NoteView from "../views/NoteView";
import { AddOutlined } from "@mui/icons-material";

const JournalHome = () => {
  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, sequi accusamus aperiam assumenda non illum est voluptatibus quo repellendus harum ad sapiente iure nobis veniam nesciunt provident molestiae minima ea.</Typography> */}
      <NothingSelectedView />
      {/* <NoteView /> */}
      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position:"fixed",
          right:50,
          bottom:50
        }}
      >
        <AddOutlined sx={{font:30}}/>
      </IconButton>
    </JournalLayout>
  );
};

export default JournalHome;
