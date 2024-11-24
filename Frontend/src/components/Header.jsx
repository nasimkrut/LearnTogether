import {Link} from "react-router-dom";

export default function Header({ children }) {
  return (
    <header className="fixed-header">
      <Link to="/">
        <img src="/hug.png" alt="Logo" className="logo" />
        <button className="logo-button">LearnTogether</button>
      </Link>
      {children && <div className="header-extra">{children}</div>}
    </header>
  );
}
