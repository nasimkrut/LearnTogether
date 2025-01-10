import {useState} from "react";
import "./UserProfile.css"
import Button from "./Button.jsx";

const UserProfile = ({user, onClose}) => {
  const [showContact, setShowContact] = useState(false);

  return (
      <div className="user-profile">
          <button className="close-button" onClick={onClose} aria-label="Close profile">×</button>
          <div className="profile-image">
              <img src={user.photo ?? '/avatars/avatar1.png'} alt={user.userName} className="user-photo"/>
          </div>
          <div className="profile-content">
              <h2>{user.fullName}</h2>
              <>
                  <h3>Обо мне</h3>
                  <p>{user.description}</p>
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
              </>
          </div>
      </div>
  )
}

export default UserProfile;