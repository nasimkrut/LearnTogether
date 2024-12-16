import Header from "../components/Header.jsx";
import './CabinetPage.css'
import {useEffect, useState} from "react";
import {getUserByUserName, updateUserProfile} from "../services/api.js";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../components/Button.jsx";

export default function CabinetPage() {
  const navigate = useNavigate();
  const {userName} = useParams();
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

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
      const mockUser = {
        fullName: "Иван Иванов",
        description: "Пользователь еще не рассказал о себе",
        userName: "тут пусто",
      };
      try {
        console.log('Username is', userName);
        const response = await getUserByUserName(userName);
        if (response) {
          console.log(response);
          setUser(response);
          setDescription(response.description || "");
        }
        else {
          alert('Пользователя не существует.')
          setUser(mockUser);
          setDescription(mockUser.description);
        }
      } catch (e) {
        console.error(`Error loading cabinet: ${e}`);
        setUser(mockUser);
        setDescription(mockUser.description);
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

  const handleSave = async () => {
    try {
      if (user) {
        const updatedUser = { ...user, description};
        const response = await updateUserProfile(updatedUser);
        if (response) {
          setUser(updatedUser);
          alert("Изменения успешно сохранены.");
        } else {
          alert("Ошибка при сохранении изменений.");
        }
      }
    } catch (error) {
      console.error("Ошибка при сохранении изменений: ", error);
      alert("Не удалось сохранить изменения. Попробуйте позже.");
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(user?.description || "");
    setIsEditing(false);
  };

  return (
      <>
        <Header/>
        <div className="cabinet">
          <div className="cabinet-content">
            <button className="close-button" onClick={handleClosePage} aria-label="Close profile">×</button>
            <div className="profile-image-container">
              <img src={profilePic || "/placeholder.png"} alt="User photo" className="user-photo"/>
              {isEditing && (
                  <>
                    <label htmlFor="photo-upload" className="photo-upload-label">Загрузить фото</label>
                    <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePicUpdated}
                    />
                  </>
              )}
            </div>
            {user ? (
                <>
                  <h2>{user.fullName}</h2>
                  <div className="profile-info">
                    <h3>Обо мне</h3>
                    {isEditing ? (
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="description-textarea"
                            placeholder="Расскажите о себе..."
                        />
                    ) : (
                        <p>{description || "Заполните информацию о себе, чтобы Вам доверяло больше людей"}</p>
                    )}

                    <a
                        href={`https://t.me/${user.userName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-info"
                    >
                      Контакт: @{user.userName}
                    </a>
                  </div>
                  {isEditing ? (
                      <div className="edit-buttons">
                        <Button onClick={handleSave} className="save-button">Сохранить</Button>
                        <Button onClick={handleCancel} className="cancel-button">Отменить</Button>
                      </div>
                  ) : (
                      <Button onClick={() => setIsEditing(true)} className="edit-button">Редактировать</Button>
                  )}
                </>
            ) : (
                <p>Загрузка данных пользователя...</p>
            )}
          </div>
        </div>
      </>
  );
}