import React from 'react';

const Login = ({ onClose }) => {
  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    console.log(data);
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-20' onClick={onClose}></div>
      <div className='bg-white w-96 p-8 rounded-xl absolute '>
        <h2 className='text-3xl font-bold'>Login</h2>
        <form className='flex flex-col space-y-4 mt-4' onSubmit={handleLogin}>
          <input type='text'
            name='username'
            autoComplete='username'
            className='border p-2 rounded-md' placeholder='Username' />
          <input type='password'
            name='password'
            autoComplete='current-password'
            className='border p-2 rounded-md' placeholder='Password' />
          <button className='bg-blue-500 text-white py-2 rounded-md'
            type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;