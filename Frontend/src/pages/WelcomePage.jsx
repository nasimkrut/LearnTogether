import './WelcomePage.css'
import {Link} from "react-router-dom";
import Button from "../components/Button.jsx";

export default function WelcomePage() {
  return (
      <div className="container">
        <link href='https://fonts.googleapis.com/css?family=Lexend' rel='stylesheet'/>
        <div className="welcome-page">
          <div>
            <h1>LearnTogether</h1>
            <p>Сервис поиска людей для совместного обучения и взаимной помощи</p>
            <div className="welcome-container">
              <Link to="/login">
                <Button>Вход</Button>
              </Link>
              <Link to="/registration">
                <Button>Регистрация</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="image-container"></div>
      </div>
  )
}