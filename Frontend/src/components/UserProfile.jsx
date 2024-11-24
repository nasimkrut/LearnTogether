import {useState} from "react";
import "./UserProfile.css"
import Button from "./Button.jsx";

const UserProfile = ({ user, onClose }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="user-profile">
      <button className="close-button" onClick={onClose} aria-label="Close profile">×</button>

      <div className="profile-content">
        <img src={user.photo} alt={user.name} className="profile-image" />
        <h2>{user.name}</h2>
        <p>Специальность: {user.speciality}</p>
        {user.group ? <p>Группа: {user.group}</p> : null}
        <p>Навыки: {user.skills.join(", ")}</p>
        {showContact ? (
          <a
            href={`https://t.me/${user.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info"
            style={{textDecoration: "none"}}
          >
            @{user.telegram}
          </a>
        ) : (
          <Button onClick={() => {
            console.log(`User asked for contact of user ${user.id}`)
            setShowContact(true)
          }}>Написать в Telegram</Button>
        )}
      </div>
    </div>
  )
}

export default UserProfile;