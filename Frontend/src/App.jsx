import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import MainPage from "./pages/MainPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import CabinetPage from "./pages/CabinetPage.jsx";
import HelpersPage from "./pages/HelpersPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile/:userName" element={<UserProfilePage />} />
        <Route path="/cabinet" element={<CabinetPage />} />
      </Routes>
    </Router>
  )
}

export default App;
