import './PostCard.css'
import {useNavigate} from "react-router-dom";

export default function PostCard({post, type}) {
  post = {
    id: "1",
    userId: "123",
    userName: "Иван Иванов",
    requiredSubject: "Математика",
    helpSubjects: ["Физика", "Информатика"],
    description: "Готов помочь с подготовкой к экзаменам",
    dateCreated: "2024-12-04",
    photo: "url/photo.jpg",
  };
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
          {type === "needsHelp" ? (
            <>
              Нужна помощь с: <span>{post.requiredSubject}</span>
            </>
          ) : (
            <>
              Помогает с: <span>{post.helpSubjects.join(', ')}</span>
            </>
          )}
        </p>
      </div>
      <img src={post.photo} alt={`${post.userName}'s photo`} className="user-photo"/>
    </div>
  )
}