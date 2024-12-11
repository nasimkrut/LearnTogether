import {useNavigate, useParams} from "react-router-dom";
import UserProfile from "../components/UserProfile.jsx";
import {useEffect, useState} from "react";
import "./UserProfilePage.css"
import Header from "../components/Header.jsx";
import {mockPosts} from '../utils/MockPosts.jsx';
import {getUserByUserName} from "../services/api.js";

export default function UserProfilePage() {
  const {userName} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserByUserName(userName);
        if (response)
          setUser(response);
        else
          alert('Пользователя не существует.')
        setLoading(false);
      } catch (e) {
        console.error(e);
        alert('Произошла ошибка при загрузке профиля пользователя.')
      }
    }

    fetchUserData();
  }, [userName]);

  if (loading) return <p>Загрузка...</p>
  if (!user) return <p>Пользователь не найден.</p>

  const handleClose = () => {
    navigate(-1);
  }

  return (
    <>
      <Header/>
      <div className="user-profile-page">
        <UserProfile user={user} onClose={handleClose} />
      </div>
    </>
  )
}