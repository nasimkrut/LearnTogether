import './PostCard.css'
import {useNavigate} from "react-router-dom";
import {getUserByUserName} from "../services/api.js"
import {useEffect, useState} from "react";

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

export default function PostCard({post}) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({ userName: '', photo: '', fullName: '' });

  useEffect(() => {
    // Загружаем данные пользователя при монтировании компонента
    const fetchUserData = async () => {
      try {
        setPostData({
          userName: post.userName,
          fullName: post.fullName,
          photo: post.photo,
        })
        // const user = await getUserByUserName(post.userName);
        // setPostData({
        //   userName: user.userName,
        //   fullName: user.fullName,
        //   photo: user.photo,
        // });
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
  }, [post.fullName, post.photo, post.userName]);

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
          Помогу с: <span>{post.helpSubjects.map(getSubjectLabel).join(', ')}</span>
        </p>
      </div>
      <img src={postData.photo} alt={`${postData.userName || 'Пользователь'}`} className="user-photo"/>
    </div>
  )
}