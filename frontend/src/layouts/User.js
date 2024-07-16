import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import DashboardUser from '../views/user/DashboardUser';
import NavbarUser from '../components/Navbar/NavbarUser';

const User = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("user");
    if (!token || token === '' || token === 'undefined' || token === null) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <NavbarUser />
      <Routes>
        <Route path="/" element={<PrivateRoute element={DashboardUser} />}>
          {/*<Route path="settings" element={<PrivateRoute element={Settings} />} />*/}
        </Route>
      </Routes>
    </>
  );
};

export default User;