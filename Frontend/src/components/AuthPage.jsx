import React from 'react';
import {Link} from 'react-router-dom';
import './AuthPage.css';
import AuthForm from './AuthForm.jsx';

export default function AuthPage({isLogin}) {
  const handleSubmit = (data) => {
    console.log(isLogin ? 'Login data submitted:' : 'Registration data submitted:', data);
  };

  const backgroundImage = isLogin
    ? 'url("https://ru.meming.world/images/ru/d/d2/%D0%9C%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B9_%D0%9C%D0%B0%D0%B9%D0%BA%D0%BB_%D0%A1%D0%BA%D0%BE%D1%82%D1%82_%D0%BF%D0%BE%D0%B6%D0%B8%D0%BC%D0%B0%D0%B5%D1%82_%D1%80%D1%83%D0%BA%D1%83_%D0%AD%D0%B4%D0%B0_%D0%A2%D1%80%D0%B0%D0%BA%D0%B0_%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD.jpeg")'
    : 'url("https://img.freepik.com/free-photo/low-angle-business-people-hand-shake_23-2148825863.jpg?t=st=1730437890~exp=1730441490~hmac=204f1e171e9730417943cf7e0a6b59f11aa7a02cfb0abb9db8df14940d90d38e&w=996")';

  return (
    <>
      <header className="fixed-header">
        <Link to="/">
          <img src="src/assets/hug.png" alt="Logo" className="logo" />
          <button className="logo-button">LearnTogether</button>
        </Link>
      </header>
      <div className='auth-page' style={{backgroundImage}}>
        <div className='auth-container'>
          <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
          <AuthForm isLogin={isLogin} onSubmit={handleSubmit}/>
        </div>
      </div>
    </>
  );
}