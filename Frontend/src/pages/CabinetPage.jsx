import Header from "../components/Header.jsx";
import './CabinetPage.css'
import {useEffect, useState} from "react";
import {getUserByUserName, updateUserProfile} from "../services/api.js";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../components/Button.jsx";
import VerificationInstruction from "../components/VerificationInstruction.jsx";

export default function CabinetPage() {
  const navigate = useNavigate();
  const {userName} = useParams();
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [verifiedContact, setVerifiedContact] = useState("")
  const [showModal, setShowModal] = useState(false);

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
        fullName: "Тут пусто ...", description: "... и тут пусто ...", telegramName: "",
      };
      try {
        const response = await getUserByUserName(userName);
        if (response) {
          console.log('response:', response);
          setUser(response);
          setDescription(response.description || "");
          if (response.telegramName) {
            setVerifiedContact(response.telegramName);
            sessionStorage.setItem('telegramName', verifiedContact)
          }
          console.log(contact, verifiedContact)
        } else {
          alert('Такого пользователя не существует! Попробуйте найти кого-то другого')
          // setUser(mockUser);
          // setDescription(mockUser.description);
          // setContact(mockUser.userName)
        }
      } catch (e) {
        alert(`Ошибка загрузки личного кабинета: ${e.message}`);
        setUser(mockUser);
        setDescription(mockUser.description);
        setVerifiedContact(mockUser.telegramName)
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
        const updatedUser = {...user, description, telegramName: contact};
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
          <img src={profilePic || "/placeholder.png"} alt="User photo" className="user-photo"/>
          {isEditing && (<>
            <label htmlFor="photo-upload" className="photo-upload-label">Загрузить фото</label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePicUpdated}
            />
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
            {isEditing ? (<input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="contact-input"
              placeholder="Введите ваш Телеграмм username"
            />) : <div className="contact-edit-container">
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
              {!verifiedContact && (<Button onClick={handleInstructionOpen} className="confirm-button">Подтвердить</Button>)}
            </div>}
          </div>
          {isEditing ? (<div className="edit-buttons">
            <Button onClick={handleSave} className="save-button">Сохранить</Button>
            <Button onClick={handleCancel} className="cancel-button">Отменить</Button>
          </div>) : (<Button onClick={() => setIsEditing(true)} className="edit-button">Редактировать</Button>)}
        </>) : (<p>Загрузка данных пользователя...</p>)}
      </div>
    </div>

    {showModal && <VerificationInstruction onClose={handleInstructionClose} userId={user.id}/>}
  </>);
}