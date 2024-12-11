import {useEffect, useState} from 'react';
import FilterPanel from '../components/FilterPanel';
import PostCard from '../components/PostCard.jsx';
import Loader from '../components/Loader';
import Header from "../components/Header.jsx";
import EmptyState from '../components/EmptyState';
import './MainPage.css';
import Button from "../components/Button.jsx";
import {Link} from "react-router-dom";
import {getPosts} from "../services/api.js"
import {mockPosts} from "../utils/MockPosts.jsx";
import {mapRatingToValue} from "../utils/Utils.jsx";
import CreatePostForm from "../components/CreatePostForm.jsx"

const subjects = [
  {value: 1, label: 'Математика'},
  {value: 2, label: 'Теория вероятностей'},
  {value: 3, label: 'C#'},
  {value: 4, label: 'Машинное обучение'},
  {value: 5, label: 'Алгоритмы'},
  {value: 6, label: 'Структуры данных'},
]

export default function MainPage() {
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({rating: null, createdAt: null, helpSubjects: [], requiredSubject: null, sortBy: "New"});
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);


  const applyFilters = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = posts.filter(post =>
        (!filters.rating || mapRatingToValue(post.rating) === filters.rating) &&
        (filters.helpSubjects.length === 0 || filters.helpSubjects.some(subject => post.requiredSubject === subject)) &&
        (!filters.requiredSubject || post.helpSubjects.includes(filters.requiredSubject))
      );

      console.log(`rating: `, posts.filter(post => post.rating))

      console.log(`rating: ${filters.rating}`)

      const sorted = [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
          case 'New':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'Old':
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 'RatingMaxToMin':
            return b.rating - a.rating;
          case 'RatingMinToMax':
            return a.rating - b.rating;
          default:
            return 0;
        }
      });

      setFilteredPosts(sorted);
      setLoading(false);
    }, 1000);

    // setLoading(true);
    // try {
    //   const posts = await getPosts(filters);
    //   setFilteredPosts(posts);
    // } catch (error) {
    //   console.error("Ошибка при применении фильтров:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
      setFilteredPosts(data)
    } catch (error) {
      console.error("Ошибка при загрузке постов:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts(mockPosts);
    fetchPosts();
  }, []);

  const resetFilters = () => {
    setFilters({rating: null, createdAt: null, helpSubjects: [], requiredSubject: null, sortBy: "New"});
    setFilteredPosts(posts);
    applyFilters()
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
        <Button
          className="new-post-button"
          onClick={() => setShowModal(true)}
        >
          Создать новое предложение
        </Button>
        <FilterPanel filters={filters} onChange={setFilters} onApply={applyFilters}/>
        {loading ? (
          <Loader/>
        ) : filteredPosts.length === 0 ? (
          <EmptyState message="Никого нет :(" onReset={resetFilters} actionLabel="Попробовать снова"/>
        ) : (
            <div className="user-list">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post}/>
              ))}
            </div>
        )}
        {showModal && (
          <CreatePostForm
            subjects={subjects}
            onPostCreated={fetchPosts}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </>
  )
}