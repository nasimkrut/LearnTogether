import {Link, useNavigate} from 'react-router-dom';
import './AuthPage.css';
import AuthForm from './AuthForm.jsx';
import PropTypes from "prop-types";

export default function AuthPage({isLogin}) {
  const navigate = useNavigate();
  const handleSubmit = (data) => {
    console.log(isLogin ? 'Login data submitted:' : 'Registration data submitted:', data);
    navigate("/main")
  };

  const backgroundImage = 'url("src/assets/Форма регистрации.png")'

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

AuthPage.propTypes = {
  isLogin: PropTypes.bool.isRequired,
}