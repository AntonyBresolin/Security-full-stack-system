import React from "react";
import { useNavigate } from "react-router-dom";
import { UserControllerService } from "../../services/UserControllerService";

const NavbarUser = () => {
  const navigate = useNavigate();
  return (
    <nav className='bg-blue-600 text-white px-[5%] w-full flex justify-between py-4 items-center'>
      <h1 className='text-3xl font-bold'>Security System</h1>
      <div className='flex items-center space-x-4 text-xl'>
        <p className='bg-blue-500 px-10 py-3 text-white font-bold rounded-2xl cursor-pointer hover:bg-blue-700  ease-in-out duration-150'
          onClick={() => { UserControllerService.logoutUser(); navigate('/'); }}
        >Sair</p>
      </div>
    </nav>
  )
}

export default NavbarUser;