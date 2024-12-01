import {useNavigate, useParams} from "react-router-dom";
import {mockUsers} from "../utils/MockUsers.jsx";
import UserProfile from "../components/UserProfile.jsx";
import {useEffect, useState} from "react";
import "./UserProfilePage.css"
import Header from "../components/Header.jsx";

export default function UserProfilePage() {
  const {userId} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios
    //   .get(`/api/users/${userId}`)
    //   .then((response) => {
    //     setUser(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error loading user: ", error);
    //     setLoading(false);
    //   });

    const mockUser = mockUsers.find(user => user.id === parseInt(userId));
    setUser(mockUser || null);
    setLoading(false);
  }, [userId]);

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