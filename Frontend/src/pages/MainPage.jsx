import {useEffect, useState} from 'react';
import FilterPanel from '../components/FilterPanel';
import PostCard from '../components/PostCard.jsx';
import Loader from '../components/Loader';
import Header from "../components/Header.jsx";
import EmptyState from '../components/EmptyState';
import './MainPage.css';
import Button from "../components/Button.jsx";
import {Link} from "react-router-dom";
import {getPosts, getStoredUserName} from "../services/api.js"
import {mockPosts} from "../utils/MockPosts.jsx";
import {subjects} from "../utils/Utils.jsx";
import CreatePostForm from "../components/CreatePostForm.jsx"


export default function MainPage() {
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({rating: 0, helpSubjects: [], requiredSubject: null, sortBy: 0});
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);


  const applyFilters = async () => {
      setLoading(true);
      try {
        const posts = await getPosts(filters);
        setFilteredPosts(posts);
      } catch (error) {
        alert(`Ошибка при применении фильтров: ${error.message}`);
      } finally {
        setLoading(false);
      }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      alert(`Ошибка при загрузке постов: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts();}, []);

  const resetFilters = () => {
    setFilters({rating: 0, helpSubjects: [], requiredSubject: null, sortBy: 0});
    setFilteredPosts(posts);
    applyFilters()
  };

  return (
    <>
      <Header>
        <Link to={`/cabinet/${getStoredUserName()}`}>
          <Button className="cabinet-button">Личный кабинет</Button>
        </Link>
      </Header>
      <div className="main-page">
        <h1>Найди людей, которые тебе помогут</h1>
        <>
          <FilterPanel filters={filters} onChange={setFilters} onApply={applyFilters}/>
          {loading ? (
            <Loader/>
          ) : filteredPosts.length === 0 ? (
            <EmptyState message="Никого нет :(" onReset={resetFilters} actionLabel="Попробовать снова"/>
          ) : (
            <div className="user-list">
              {filteredPosts.map((post, index) => (
                <PostCard key={post.id || index} post={post} />
              ))}
            </div>
          )}
        </>
        {showModal && (
          <CreatePostForm
            subjects={subjects}
            onPostCreated={fetchPosts}
            setShowModal={setShowModal}
          />
        )}
        <Button
            className="new-post-button"
            onClick={() => setShowModal(true)}
        >
          Не нашлось подходящего объявления? Создай его сам!
        </Button>
      </div>
    </>
  )
}