import './WelcomePage.css'
import {Link} from "react-router-dom";
import Button from "../components/Button.jsx";

export default function WelcomePage() {
  return (
    <div className="main-container">
      <div className="welcome-page">
        <div>
          <h1>LearnTogether</h1>
          <p>Поиск партнёра для обмена знаниями и для взаимной помощи в учёбе.</p>
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