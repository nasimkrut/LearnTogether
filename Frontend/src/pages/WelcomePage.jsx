import './WelcomePage.css'
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return(
    <div className="welcome-page">
      <div>
        <h1>LearnTogether</h1>
        <p>**Описание**</p>
        <Link to="/login">
          <button>Вход</button>
        </Link>
        <Link to="/registration">
          <button>Регистрация</button>
        </Link>
      </div>
    </div>
  )
}