import {useNavigate} from 'react-router-dom';
import './AuthPage.css';
import AuthForm from './AuthForm.jsx';
import PropTypes from "prop-types";
import Header from "./Header.jsx";
import api from "../services/api.js";

export default function AuthPage({isLogin}) {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    console.log(isLogin ? 'Login data submitted:' : 'Registration data submitted:', data);
    navigate("/main")
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