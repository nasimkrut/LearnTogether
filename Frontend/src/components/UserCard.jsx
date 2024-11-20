import './UserCard.css'
import {useNavigate} from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log('Click on user:', user);
    // navigate(`/profile/${user.id}`);
  }

  return (
    <div className="user-card" onClick={handleCardClick}>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.speciality}, {user.group}</p>
        <span className="skills">
          {user.skills.join(', ')}
        </span>
      </div>
      <img src={user.photo} alt={`${user.name}'s photo`} className="user-photo" />
    </div>
  )
}