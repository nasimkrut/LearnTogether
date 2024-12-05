import './PostCard.css'
import {useNavigate} from "react-router-dom";

export default function PostCard({post, type}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log('Click on post:', post);
    navigate(`/profile/${post.userId}`);
  }

  return (
    <div className="post-card" onClick={handleCardClick}>
      <div className="post-info">
        <h3>{post.userName}</h3>
        <p>
          Нужна помощь с: <span>{post.requiredSubject}</span>
        </p>
        <p>
          Помогу с: <span>{post.helpSubjects.join(', ')}</span>
        </p>
      </div>
      <img src={post.photo} alt={`${post.userName}'s photo`} className="user-photo"/>
    </div>
  )
}