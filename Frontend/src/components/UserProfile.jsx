import {useState} from "react";
import "./UserProfile.css"
import Button from "./Button.jsx";

const subjects = [
  {value: 1, label: 'Математика'},
  {value: 2, label: 'Теория вероятностей'},
  {value: 3, label: 'C#'},
  {value: 4, label: 'Машинное обучение'},
  {value: 5, label: 'Алгоритмы'},
  {value: 6, label: 'Структуры данных'},
];

const getSubjectLabel = (value) => {
  const subject = subjects.find(subject => subject.value === value);
  return subject ? subject.label : 'Неизвестный предмет';
};

const UserProfile = ({user, onClose}) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="user-profile">
      <button className="close-button" onClick={onClose} aria-label="Close profile">×</button>

      <div className="profile-content">
        <img src={user.photo} alt={user.userName} className="user-photo"/>
        <h2>{user.fullName}</h2>
        <p>Специальность: {user.speciality ?? 'пусто'}</p>
        {user.group ? <p>Группа: {user.group}</p> : null}
        <p>Навыки: {user.helpSubjects.map(getSubjectLabel).join(", ")}</p>
        {showContact ? (
          (user.login ?
              <a
                href={`https://t.me/${user.userName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info"
                style={{textDecoration: "none"}}
              >
                <p>@{user.userName}</p>
              </a> : <p>Тут пусто</p>
          )
        ) : (
          <Button onClick={() => {
            console.log(`User asked for contact of user ${user.userName}`)
            setShowContact(true)
          }}>Написать в Telegram</Button>
        )}
      </div>
    </div>
  )
}

export default UserProfile;