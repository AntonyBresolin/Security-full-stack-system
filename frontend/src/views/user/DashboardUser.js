import React from 'react';
import { TweetServices } from '../../services/TweetServices';

const DashboardUser = () => {

  const toggleListarUsers = () => {
    TweetServices.listTweets()
      .then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      });
  }
  return (
    <>
      <div className="">
        <h1>Dashboard do Usuário</h1>
        <p>Esta é uma rota privada. Somente usuários autenticados podem acessá-la.</p>
        <button className='bg-white text-blue-500 px-10 py-3 mt-4 rounded-2xl cursor-pointer hover:bg-blue-100 ease-in-out duration-150' onClick={toggleListarUsers}>Listar</button>
      </div>
    </>
  );
};

export default DashboardUser;