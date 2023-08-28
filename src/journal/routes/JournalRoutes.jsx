import React from 'react'
import JournalHome from '../pages/JournalHome'
import { Navigate, Route, Routes } from 'react-router-dom'

const JournalRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<JournalHome />} />

            <Route path='/*' element={<Navigate to={"/"} />} />
        </Routes>
    )
}

export default JournalRoutes