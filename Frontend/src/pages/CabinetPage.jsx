import Header from "../components/Header.jsx";
import './CabinetPage.css'
import {useEffect, useState} from "react";
import {getUserByUserName} from "../services/api.js";
import {useNavigate, useParams} from "react-router-dom";
import {getSubjectLabel} from "../utils/Utils.jsx";
import Button from "../components/Button.jsx";

export default function CabinetPage() {
  const navigate = useNavigate();
  const {userName} = useParams();
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  const handlePicUpdated = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const baseImage = e.target.result;
        setProfilePic(baseImage);
        sessionStorage.setItem("profilePic", baseImage);
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Username is', userName);
        const response = await getUserByUserName(userName);
        if (response) {
          console.log(response);
          setUser(response);
        }
        else
          alert('Пользователя не существует.')
      } catch (e) {
        console.error(`Error loading cabinet: ${e}`);
        const mockUser = {
          fullName: "Иван Иванов",
          speciality: "ФИИТ",
          group: "ФТ-000",
          helpSubjects: ["JavaScript", "React", "Node.js"],
          userName: "тут пусто",
        };
        setUser(mockUser);
      } finally {
        const savedPic = sessionStorage.getItem("profilePic");
        if (savedPic) {
          setProfilePic(savedPic);
        }
      }
    };

    fetchUserData();
  }, [userName]);

  const handleClosePage = () => {
    navigate('/main');
  };

  return (
    <>
      <Header/>
      <div className="cabinet">
        <div className="cabinet-content">
          <div className="profile-image-container">
            <img src={profilePic || "/placeholder.png"} alt="User photo" className="user-photo"/>
            <label htmlFor="photo-upload" className="photo-upload-label">Загрузить фото</label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePicUpdated}
            />
          </div>
          {user ? (
            <>
              <h2>{user.fullName}</h2>
              <div className="profile-info">
                <p>Обо мне: {user.description.toString() === "Пользователь еще не рассказал о себе" ? "Заполните информацию о себе, чтобы Вам доверяло больше людей" : user.description}</p>

                <a
                  href={`https://t.me/${user.userName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info"
                >
                  Контакт: @{user.userName}
                </a>
              </div>
            </>
          ) : (
            <p>Загрузка данных пользователя...</p>
          )}
          <button className="close-button" onClick={handleClosePage} aria-label="Close profile">×</button>
        </div>
      </div>
    </>
  );
}