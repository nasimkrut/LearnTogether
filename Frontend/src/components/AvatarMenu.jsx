import {avatarOptions} from "../utils/Utils.jsx";
import Button from "./Button.jsx";
import './AvatarMenu.css'

export default function AvatarMenu({onClose, onAvatarSelect}) {
  return (
    <div className="box">
      <div className="avatars">
        <div className="avatar-options">
          {avatarOptions.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="avatar-option"
              onClick={() => onAvatarSelect(avatar)}
            />
          ))}
        </div>
        <Button onClick={onClose} className="cancel-button">Отменить</Button>
      </div>
    </div>
  );
}