import {useEffect, useState} from 'react';
import FilterPanel from '../components/FilterPanel';
import PostCard from '../components/PostCard.jsx';
import Loader from '../components/Loader';
import Header from "../components/Header.jsx";
import EmptyState from '../components/EmptyState';
import './MainPage.css';
import Button from "../components/Button.jsx";
import {Link} from "react-router-dom";
import {createPost, getPosts, getStoredUserName, getUserId} from "../services/api.js"
import {mockPosts} from "../utils/MockPosts.jsx";
import {mapRatingToValue} from "../utils/Utils.jsx";
import Select from "react-select";

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
  const [newPost, setNewPost] = useState({
    requiredSubject: "", helpSubjects: [], description: "", tags: ""
  });
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

  useEffect(() => {
    // setPosts(mockPosts);
    // setFilteredPosts(mockPosts);
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (e) {
        console.error("Ошибка загрузки постов:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const resetFilters = () => {
    setFilters({rating: null, createdAt: null, helpSubjects: [], requiredSubject: null, sortBy: "New"});
    setFilteredPosts(posts);
    applyFilters()
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setNewPost((prev) => ({...prev, [name]: value}));
  };

  const handleSingleSelectChange = (selectedOption) => {
    setNewPost((prev) => ({
      ...prev,
      requiredSubject: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setNewPost((prev) => ({
      ...prev,
      helpSubjects: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  const handleSubmit = async () => {
    console.log("handleSubmit");
    try {
      const userName = getStoredUserName(); // Получаем UserName из localStorage
      console.log("stored name:", userName);
      if (!userName) {
        alert("Не удалось найти имя пользователя. Пожалуйста, войдите снова.");
        return;
      }

      const userId = await getUserId(userName); // Ожидаем выполнения функции
      console.log(`userId: ${userId}`);
      console.log('скип');
      console.log(newPost.requiredSubject.type, newPost.requiredSubject)
      console.log(newPost.helpSubjects.type, newPost.helpSubjects)

      const createdPost = {
        userId: userId, // Используем полученный userId
        requiredSubject: newPost.requiredSubject,
        helpSubjects: newPost.helpSubjects,
        description: newPost.description,
        tags: newPost.tags ? newPost.tags.split(',').map((t) => t.trim()) : [],
        createdAt: new Date().toLocaleTimeString(),
        postId: newPost.id,
      };

      console.log("Создаётся пост:", createdPost);

      const postId = await createPost(createdPost); // Создаем пост
      console.log(`Пост успешно создан с ID: ${postId}`);

      setPosts([...posts, {id: postId, ...newPost}]);
      setFilteredPosts([...posts, {id: postId, ...newPost}]);
      setShowModal(false);
      setNewPost({requiredSubject: "", helpSubjects: [], description: "", tags: ""});
    } catch (e) {
      console.error("Ошибка при создании поста:", e);
      alert("Возникла ошибка. Попробуйте снова!");
      setShowModal(false);
    }
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
          <div className="modal">
            <div className="modal-content">
              <h2>Новый пост</h2>
              <Select
                options={subjects}
                onChange={handleSingleSelectChange}
                placeholder="Нужна помощь с..."
                isClearable
                classNamePrefix="react-select"
              />
              <input
                type="text"
                name="description"
                placeholder="Описание проблемы..."
                value={newPost.description}
                onChange={handleInputChange}
              />
              <Select
                isMulti
                options={subjects}
                onChange={handleMultiSelectChange}
                placeholder="Выберите предметы"
                classNamePrefix="react-select"
              />
              <input
                type="text"
                name="tags"
                placeholder="Теги (опционально)..."
                value={newPost.tags}
                onChange={handleInputChange}
              />
              <Button onClick={handleSubmit}>Создать</Button>
              <Button onClick={() => setShowModal(false)}>Отмена</Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}