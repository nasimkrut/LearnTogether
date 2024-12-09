import {useEffect, useState} from 'react';
import FilterPanel from '../components/FilterPanel';
import PostCard from '../components/PostCard.jsx';
import Loader from '../components/Loader';
import Header from "../components/Header.jsx";
import EmptyState from '../components/EmptyState';
import './MainPage.css';
import Button from "../components/Button.jsx";
import {Link} from "react-router-dom";
import {getPosts} from "../services/api.js";
import {mockPosts} from "../utils/MockPosts.jsx";
import {mapRatingToValue} from "../utils/Utils.jsx";

export default function MainPage() {
  const [filters, setFilters] = useState({rating: null, subjects: []});
  // const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const applyFilters = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = posts.filter(post =>
        (!filters.rating || mapRatingToValue(post.rating) === filters.rating) &&
        (filters.subjects.length === 0 || filters.subjects.some(subject => post.helpSubjects.includes(subject)))
      );
      setFilteredPosts(filtered);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // setPosts(mockPosts)
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ type: "helpNeeded" });
        setPosts(data);
        setFilteredPosts(data);
      } catch (e) {
        console.error("Ошибка загрузки постов:", e);
      }
    };
    fetchPosts();
  }, []);

  const resetFilters = () => {
    setFilters({rating: null, subjects: []});
    setFilteredPosts(posts);
    applyFilters()
    // setUsers(mockUsers)
  };

  return (
    <>
      <Header>
        <Link to="/cabinet">
          <Button className="cabinet-button">Личный кабинет</Button>
        </Link>
      </Header>
      <div className="main-page">
        <h1>Найди людей, которые помогут тебе</h1>
        <Link to="/helpers">
          <Button className="orange-button">или предложи помощь другим...</Button>
        </Link>
        <FilterPanel filters={filters} onChange={setFilters} onApply={applyFilters}/>
        {loading ? (
          <Loader/>
        ) : filteredPosts.length === 0 ? (
          <EmptyState message="Никого нет :(" onReset={resetFilters} actionLabel="Попробовать снова"/>
        ) : (
          <div className="user-list">
            {filteredPosts.map(post => (
              <PostCard key={post.userId} post={post} type="helpNeeded"/>
            ))}
          </div>
        )}
      </div>
    </>
  )
}