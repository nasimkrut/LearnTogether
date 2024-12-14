import {useState} from "react";
import "./UserProfile.css"
import Button from "./Button.jsx";
import {getSubjectLabel} from "../utils/Utils.jsx";

const UserProfile = ({user, onClose}) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="user-profile">
      <button className="close-button" onClick={onClose} aria-label="Close profile">×</button>

        <div className="profile-content">
            <img src={user.photo ?? '/placeholder.png'} alt={user.userName} className="user-photo"/>
            <h2>{user.fullName}</h2>
            <p>Обо мне: {user.description}</p>
            {showContact ? (
                (user.userName ?
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