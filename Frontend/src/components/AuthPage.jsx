import {useNavigate} from 'react-router-dom';
import './AuthPage.css';
import AuthForm from './AuthForm.jsx';
import PropTypes from "prop-types";
import Header from "./Header.jsx";

export default function AuthPage({isLogin}) {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log(isLogin ? 'Login data submitted:' : 'Registration data submitted:', data);
    if (isLogin && data.token) {
      sessionStorage.setItem('token', data.token);
      navigate("/main")
    }
    else {
      navigate("/login")
    }
  };

  return (
    <>
      <Header/>
      <div className='auth-page'>
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