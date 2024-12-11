import Header from "../components/Header.jsx";
import './CabinetPage.css'
import {useEffect, useState} from "react";
import {getUserByUserName} from "../services/api.js";
import {useParams} from "react-router-dom";
import {getSubjectLabel} from "../utils/Utils.jsx";

export default function CabinetPage() {
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
        if (response)
          setUser(response);
        else
          alert('Пользователя не существует.')
      } catch (e) {
        console.error(`Error loading cabinet: ${e}`);
        const mockUser = {
          fullName: "Иван Иванов",
          speciality: "ФИИТ",
          group: "ФТ-203",
          helpSubjects: ["JavaScript", "React", "Node.js"],
          userName: "a",
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
                <p>Специальность: {user.speciality ?? 'пусто'}</p>
                {user.group ? <p>Группа: {user.group}</p> : null}
                <p>Навыки: {user.helpSubjects && user.helpSubjects.length > 0 ? user.helpSubjects.map(getSubjectLabel).join(", ") : 'пусто'}</p>

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
        </div>
      </div>
    </>
  );
}