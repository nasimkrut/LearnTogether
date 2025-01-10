import './PostCard.css'
import {useNavigate} from "react-router-dom";
import {getUserByUserId} from "../services/api.js"
import {useEffect, useState} from "react";
import {subjects} from "../utils/Utils.jsx";

const getSubjectLabel = (value) => {
  const subject = subjects.find(subject => subject.value === value);
  return subject ? subject.label : 'Неизвестный предмет';
};

export default function PostCard({post}) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({ userName: '', photo: '', fullName: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByUserId(post.userId);
        setPostData({
          userName: user.userName,
          fullName: user.fullName,
          photo: user.avatarUrl ?? 'https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e5356be67293a8a335c71b0_peep-44.svg',
        });
      } catch (error) {
        setPostData({
          userName: 'undefined',
          fullName: 'Неизвестный пользователь',
          photo: "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e5356be67293a8a335c71b0_peep-44.svg",
        });
        alert(`Ошибка при загрузке данных пользователя: ${error.message}`);
      }
    };

    fetchUserData();
  }, [post.userId]);

  const handleCardClick = () => {
    navigate(`/profile/${postData.userName}`);
  }

  return (
    <div className="post-card" onClick={handleCardClick}>
      <div className="post-info">
        <h3>{postData.fullName}</h3>
        <p>
          Нужна помощь с: <span>{getSubjectLabel(post.requiredSubject)}</span>
        </p>
        <p>
          Поможет с: <span>{post.helpSubjects.map(getSubjectLabel).join(', ')}</span>
        </p>
        <p>
          Описание: <span>{post.description}</span>
        </p>
      </div>
      <img src={postData.photo} alt={`${postData.userName || 'Пользователь'}`} className="user-photo-post"/>
    </div>
  )
}