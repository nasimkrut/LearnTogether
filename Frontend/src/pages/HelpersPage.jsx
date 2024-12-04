import Header from "../components/Header.jsx";
import {Link} from "react-router-dom";
import Button from "../components/Button.jsx";
import UserCard from "../components/UserCard.jsx";
import {useEffect, useState} from "react";
import {mockUsers} from "../utils/MockUsers.jsx";

export default function HelpersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  return (
    <>
      <Header>
        <Link to="/cabinet">
          <Button className="cabinet-button">Личный кабинет</Button>
        </Link>
      </Header>
      <div className="main-page">
        <h1>Предложи свою помощь другим</h1>
        <Link to="/main">
          <Button className="orange-button">или найди помощника...</Button>
        </Link>
        <div className="helpers-container">
          <Link to="/post">
            <Button className="new-post-button" onClick="/post">Создать новое предложение</Button>
          </Link>
          <div className="user-list">
            {users.map(user => (
              <UserCard key={user.id} user={user}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}