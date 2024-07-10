import React, { useState } from 'react';
import Login from '../../components/Login/Login';
import { TweetServices } from '../../services/TweetServices';

const HomePage = () => {
  const [login, setLogin] = useState(false);

  const handleToggleLoginComponent = () => {
    setLogin(!login);
  }

  const toggleListarUsers = () => {
    TweetServices.listTweets()
      .then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      });
    console.log('Listar users');
  }
  return (
    <div className='w-screen h-screen bg-blue-500 overflow-hidden'>
      <nav className='bg-white text-blue-600 px-[5%] w-full flex justify-between py-4 items-center'>
        <h1 className='text-3xl font-bold'>Security System</h1>
        <div className='flex items-center space-x-4 text-xl'>
          <p className='bg-blue-500 px-10 py-3 text-white font-bold rounded-2xl cursor-pointer hover:bg-blue-600 ease-in-out duration-150'
            onClick={handleToggleLoginComponent}
          >Login</p>
        </div>
      </nav>
      <main className='flex flex-col items-center justify-center h-full text-center'>
        <h1 className='text-5xl font-bold text-white'>Welcome to Security screen</h1>
        <p className='text-white'>This is a security screen for a security system</p>
        <button className='bg-white text-blue-500 px-10 py-3 mt-4 rounded-2xl cursor-pointer hover:bg-blue-100 ease-in-out duration-150' onClick={toggleListarUsers}>Listar</button>
      </main>
      {login && (<Login onClose={handleToggleLoginComponent} />)}
    </div>
  );
};

export default HomePage;