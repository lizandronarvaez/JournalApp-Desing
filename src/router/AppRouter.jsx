import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from '../auth/routes/AuthRoutes';
import JournalRoutes from '../journal/routes/JournalRoutes';
import CheckAuth from '../interfaces/components/CheckAuth';
import useCheckAuth from '../hooks/useCheckAuth';
const AppRouter = () => {
    const { status } = useCheckAuth();
    if (status === "checking") return <CheckAuth />

    return (
        <Routes>
            {
                (status === "authenticated") ?
                    <Route path='/*' element={<JournalRoutes />} />
                    : <Route path='/auth/*' element={<AuthRoutes />} />

            }
            <Route path='/*' element={<Navigate to={'/auth/login'} />} />

            {/* Long and register */}
            {/* <Route path='/auth/*' element={<AuthRoutes />} /> */}

            {/* App  */}
            {/* <Route path='/*' element={<JournalRoutes />} /> */}
        </Routes>

    )
}

export default AppRouter