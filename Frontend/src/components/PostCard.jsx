import './PostCard.css'
import {useNavigate} from "react-router-dom";
import {getUserByUserId, getUserByUserName} from "../services/api.js"
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
        // setPostData({
        //   userName: post.userName,
        //   fullName: post.fullName,
        //   photo: post.photo,
        // })
        const user = await getUserByUserId(post.userId);
        setPostData({
          userName: user.userName,
          fullName: user.fullName,
          photo: user.photo ?? '/placeholder.png',
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
        setPostData({
          userName: 'undefined',
          fullName: 'Неизвестный пользователь',
          photo: '/placeholder.png',
        });
      }
    };

    fetchUserData();
  }, [post.userId]);

  const handleCardClick = () => {
    console.log('Click on post:', post);
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
          Может помочь с: <span>{post.helpSubjects.map(getSubjectLabel).join(', ')}</span>
        </p>
      </div>
      <img src={postData.photo} alt={`${postData.userName || 'Пользователь'}`} className="user-photo"/>
    </div>
  )
}