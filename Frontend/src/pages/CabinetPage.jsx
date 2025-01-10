import Header from "../components/Header.jsx";
import './CabinetPage.css'
import {useEffect, useState} from "react";
import {getUserByUserName, updateUserProfile} from "../services/api.js";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../components/Button.jsx";
import VerificationInstruction from "../components/VerificationInstruction.jsx";
import AvatarMenu from "../components/AvatarMenu.jsx";

export default function CabinetPage() {
  const navigate = useNavigate();
  const {userName} = useParams();
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  const handleAvatarSelect = (avatar) => {
    setProfilePic(avatar);
    sessionStorage.setItem("profilePic", avatar);
    setShowAvatarMenu(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const mockUser = {
        fullName: "Тут пусто ...", description: "... и тут пусто ...", telegramName: "",
      };
      try {
        const response = await getUserByUserName(userName);
        if (response) {
          setUser(response);
          setDescription(response.description || "");
          setProfilePic(response.AvatarUrl || "");
          if (response.telegramName) {
            setContact(response.telegramName);
            sessionStorage.setItem('telegramName', contact)
          }
        } else {
          alert('Такого пользователя не существует! Попробуйте найти кого-то другого')
        }
      } catch (e) {
        alert(`Ошибка загрузки личного кабинета: ${e.message}`);
        setUser(mockUser);
        setDescription(mockUser.description);
        setContact(mockUser.telegramName)
      }
    };

    fetchUserData();
  }, [contact, userName]);

  const handleClosePage = () => {
    navigate('/main');
  };

  const handleSave = async () => {
    try {
      if (user) {
        const updatedUser = {...user, description, telegramName: contact, avatarUrl: profilePic};
        const response = await updateUserProfile(updatedUser);
        if (response) {
          setUser(updatedUser);
          alert("Изменения успешно сохранены");
        } else {
          alert("Ошибка при сохранении изменений");
        }
      }
    } catch (e) {
      alert("Не удалось сохранить изменения. Попробуйте позже");
      console.error(e);
      setContact("");
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(user?.description || "");
    setContact(user.telegramName || "")
    setIsEditing(false);
  };

  const handleInstructionOpen = () => {
    setShowModal(true);
  }
  const handleInstructionClose = () => {
    setShowModal(false);
  }

  return (<>
    <Header/>
    <div className="cabinet">
      <div className="cabinet-content">
        <button className="close-button" onClick={handleClosePage} aria-label="Close profile">×</button>
        <div className="profile-image-container">
          <img src={profilePic || "/avatars/avatar1.png"} alt="User photo" className="user-photo"/>
          {isEditing && (<>
            <Button onClick={() => setShowAvatarMenu(true)} className="avatar-button">Выбрать аватарку</Button>
          </>)}
        </div>
        {user ? (<>
          <h2>{user.fullName}</h2>
          <div className="profile-info">
            <h3>Обо мне</h3>
            {isEditing ? (<textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="description-textarea"
              placeholder="Расскажите о себе..."
            />) : (<p>{description || "Заполните информацию о себе, чтобы Вам доверяло больше людей"}</p>)}

            <h3>Контакт</h3>
            <div className="contact-container">
              {contact && contact.trim() ? (<a
                href={`https://t.me/${contact}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info"
              >
                @{contact}
              </a>) : (
                <p>Тут пусто ...</p>
              )}
              {!contact && (<Button onClick={handleInstructionOpen} className="confirm-button">Подтвердите свой Telegram</Button>)}
            </div>
          </div>
          {isEditing ? (<div className="edit-buttons">
            <Button onClick={handleSave} className="save-button">Сохранить</Button>
            <Button onClick={handleCancel} className="cancel-button">Отменить</Button>
          </div>) : (<Button onClick={() => setIsEditing(true)} className="edit-button">Редактировать</Button>)}
        </>) : (<p>Загрузка данных пользователя...</p>)}
      </div>
    </div>

    {showModal && <VerificationInstruction onClose={handleInstructionClose} userId={user.id}/>}

    {showAvatarMenu && (
      <AvatarMenu
        onClose={() => setShowAvatarMenu(false)}
        onAvatarSelect={handleAvatarSelect}/>)}
  </>);
}