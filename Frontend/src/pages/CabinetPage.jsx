import Header from "../components/Header.jsx";
import'./CabinetPage.css'
import {useEffect, useState} from "react";

export default function CabinetPage() {
  // const {userId} = useParams();
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);

  const [profilePic, setProfilePic] = useState("");

  const handlePicUpdated = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const baseImage = e.target.result;
        setProfilePic(baseImage);
        localStorage.setItem("profilePic", baseImage);
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
      setProfilePic(savedPic);
    }
  }, []);

  const user = {
    name: "Иван Иванов",
    speciality: "ФИИТ",
    group: "ФТ-203",
    skills: ["JavaScript", "React", "Node.js"],
    login: "a",
  };

  return (
    <>
      <Header/>
      <div className="cabinet">
        <div className="cabinet-content">
          <div className="profile-image-container">
            <img src={profilePic || "/placeholder.png"} alt="User photo" className="user-photo" />
            <label htmlFor="photo-upload" className="photo-upload-label">Загрузить фото</label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePicUpdated}
            />
          </div>
          <h2>{user.name}</h2>
          <div className="profile-info">
            <p>Специальность: {user.speciality}</p>
            {user.group && <p>Группа: {user.group}</p>}
            <p>Навыки: {user.skills.join(", ")}</p>
            <a
              href={`https://t.me/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info"
            >
              Контакт: @{user.login}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}