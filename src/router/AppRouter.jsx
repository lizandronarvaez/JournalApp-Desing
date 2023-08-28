import React from 'react'
import { Routes, Route } from "react-router-dom";
import AuthRoutes from '../auth/routes/AuthRoutes';
import JournalRoutes from '../journal/routes/JournalRoutes';
const AppRouter = () => {
    return (
        <Routes>
            {/* Long and register */}
            <Route path='/auth/*' element={<AuthRoutes />}/>
            {/* App  */}
            <Route path='/*' element={<JournalRoutes />}/>
        </Routes>

    )
}

export default AppRouter