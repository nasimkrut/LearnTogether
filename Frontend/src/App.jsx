import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import MainPage from "./pages/MainPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </Router>
  )
}

export default App;
