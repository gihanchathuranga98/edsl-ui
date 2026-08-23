import React from 'react'
import { Outlet, Route, Routes } from 'react-router';
import Login from './pages/login';
import ManageOfficers from './pages/manageOfficers';
import Sidenav from './components/sidenav';
import ManageStations from './pages/manageStations';
import FundBreakdown from './pages/fundBreakdown';
import ManageSystemUsers from './pages/manageSystemUsers';
import CreateTCR from './pages/createTCR';
import ManageTCR from './pages/manageTCR';
import ChangePassword from './pages/changePassword';
import ResetUserPasswords from './pages/resetUserPasswords';
import ManageDesignations from './pages/manageDesignations';
import ProtectedRoute from './protectedRoute';
import Reports from './pages/reports';
import ReviewTcr from './pages/reviewTcr';

const AppLayout = () => {
    return (
        <>
            <Sidenav><Outlet /></Sidenav>
        </>
    )
}

const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/' Component={Login} />
                <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                    <Route path='/manage-officers' Component={ManageOfficers} />
                    <Route path='/manage-stations' Component={ManageStations} />
                    <Route path='/fund-breakdown' Component={FundBreakdown} />
                    <Route path='/manage-system-users' Component={ManageSystemUsers} />
                    <Route path='/create-tcr' Component={CreateTCR} />
                    <Route path='/update-tcr/:tcr' Component={CreateTCR} />
                    <Route path='/manage-tcr' Component={ManageTCR} />
                    <Route path='/change-password' Component={ChangePassword} />
                    <Route path='/reset-passwords' Component={ResetUserPasswords} />
                    <Route path='/manage-designations' Component={ManageDesignations} />
                    <Route path='/reports' Component={Reports} />
                    <Route path='/review/:tcr' Component={ReviewTcr} />
                </Route>
            </Routes>
        </>
    )
}

export default Router;