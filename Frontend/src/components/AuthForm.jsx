import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

export default function AuthForm({ isLogin, onSubmit }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onSubmit({ login, password });
    } else {
      onSubmit({ name, surname, login, password });
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {!isLogin && (
        <>
          <div>
            <input
              type="text"
              id="surname"
              placeholder="Фамилия"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="name"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </>
      )}
      <div>
        <input
          type="text"
          id="login"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>
      <div className="password-input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '🐵️' : '🙈'}
        </button>
      </div>
      <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      <p className="toggle-form-text">
        {isLogin ? (
          <>
            Ещё нет аккаунта?{' '}
            <Link to="/registration" className="toggle-form-link">Создайте</Link> его.
          </>
        ) : (
          <>
            Уже есть аккаунт?{' '}
            <Link to="/login" className="toggle-form-link">Войдите</Link> в него.
          </>
        )}
      </p>
    </form>
  );
}
