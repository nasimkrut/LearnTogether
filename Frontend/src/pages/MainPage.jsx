import {useState} from 'react';
import FilterPanel from '../components/FilterPanel';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import {mockUsers} from "../utils/MockUsers.jsx";
// import api from '../services/userApi';
import './MainPage.css';
import {Link} from "react-router-dom";

export default function MainPage() {
  const [filters, setFilters] = useState({rating: null, subjects: []});
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);

  const resetFilters = () => {
    setFilters({rating: null, subjects: []});
    setUsers(mockUsers)
  };

  const applyFilters = () => {
    setLoading(true);
    setTimeout(() => {
      const filteredUsers = mockUsers.filter(user =>
        (!filters.rating || user.rating === filters.rating) &&
        (filters.subjects.length === 0 || filters.subjects.some(subject => user.subjects.includes(subject)))
      );
      setUsers(filteredUsers);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <header className="fixed-header">
        <Link to="/">
          <img src="src/assets/hug.png" alt="Logo" className="logo"/>
          <button className="logo-button">LearnTogether</button>
        </Link>
      </header>
      <div className="main-page">
        <h1>Найди людей, которые помогут тебе</h1>
        <FilterPanel filters={filters} onChange={setFilters} onApply={applyFilters}/>
        {loading ? (
          <Loader/>
        ) : users.length === 0 ? (
          <EmptyState message="Никого нет :(" onReset={resetFilters} actionLabel="Попробовать снова"/>
        ) : (
          <div className="user-list">
            {users.map(user => (
              <UserCard key={user.id} user={user}/>
            ))}
          </div>
        )}
      </div>
    </>
  )
}