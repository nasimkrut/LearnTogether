import {Link, useNavigate} from "react-router-dom";

export default function Header({ children }) {
  const navigate = useNavigate();
  const isUserLoggedIn = Boolean(sessionStorage.getItem("isLoggedIn"));

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isUserLoggedIn) {
      navigate("/main");
    } else {
      navigate("/");
    }
  };

  return (
      <header className="fixed-header">
        <link href='https://fonts.googleapis.com/css?family=Lexend' rel='stylesheet'/>
        <a href="/" onClick={handleLogoClick}>
          <img src="/hug.png" alt="Logo" className="logo"/>
          <button className="logo-button">LearnTogether</button>
        </a>
        {children && <div className="header-extra">{children}</div>}
      </header>
  );
}
