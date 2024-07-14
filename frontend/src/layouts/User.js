import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import DashboardUser from '../views/user/DashboardUser';

const User = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={DashboardUser} />}>
        {/*<Route path="settings" element={<PrivateRoute element={Settings} />} />*/}
      </Route>
    </Routes>

  );
};

export default User;