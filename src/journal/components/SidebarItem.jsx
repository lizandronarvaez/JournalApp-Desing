import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';


const SidebarItem = ({ note }) => {

    const dispatch = useDispatch();
    const { id = "", date, title = "", body, imageUrls } = note;
    const titleFormat = useMemo(() => {
        return title.length > 17 ?
            title.substring(0, 16) + "..."
            : title;
    }, [title]);

    const onClickNote = () => dispatch(setActiveNote({ id, date, title, body, imageUrls }));
    return (

        <ListItem disablePadding>
            <ListItemButton
                onClick={onClickNote}
            >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={titleFormat} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}

export default SidebarItem