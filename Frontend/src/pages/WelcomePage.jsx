import './WelcomePage.css'
import {Link} from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="main-container">
      <div className="welcome-page">
        <div>
          <h1>LearnTogether</h1>
          <p>Поиск партнёра для обмена знаниями и для взаимной помощи в учёбе.</p>
          <div style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <Link to="/login">
              <button>Вход</button>
            </Link>
            <Link to="/RegistrationPage">
              <button>Регистрация</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="image-container"></div>
    </div>
  )
}