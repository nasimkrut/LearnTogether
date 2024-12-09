import Header from "../components/Header.jsx";
import {Link} from "react-router-dom";
import Button from "../components/Button.jsx";
import PostCard from "../components/PostCard.jsx";
import {useEffect, useState} from "react";
import {createPost, getPosts, getStoredUserName, getUserId} from "../services/api.js"
import './HelpersPage.css'
import FilterPanel from "../components/FilterPanel";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import {mapRatingToValue} from "../utils/Utils.jsx";
import {mockPosts} from "../utils/MockPosts.jsx";
import Select from "react-select";

// const subjects = [
//   { value: 'Math', label: 'Математика' },
//   { value: 'Probability', label: 'Теория вероятностей'},
//   { value: 'CSharp', label: 'C#'},
//   { value: 'MachineLearning', label: 'Машинное обучение'},
//   { value: 'Algorithms', label: 'Алгоритмы'},
//   { value: 'DataStructures', label: 'Структуры данных'},
// ]

const subjects = [
  { value: 1, label: 'Математика' },
  { value: 2, label: 'Теория вероятностей'},
  { value: 3, label: 'C#'},
  { value: 4, label: 'Машинное обучение'},
  { value: 5, label: 'Алгоритмы'},
  { value: 6, label: 'Структуры данных'},
]

export default function HelpersPage() {
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    requiredSubject: "", helpSubjects: [], description: "", tags: ""
  });
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filters, setFilters] = useState({rating: null, subjects: []}); // Фильтры
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data);
        setFilteredPosts(data);
      } catch (e) {
        console.error("Ошибка загрузки постов:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const resetFilters = () => {
    setFilters({rating: null, subjects: []});
    setFilteredPosts(posts);
  };

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
        time: new Date().toLocaleTimeString(),
        postId: newPost.id,
      };

      console.log("Создаётся пост:", createdPost);

      const postId = await createPost(createdPost); // Создаем пост
      console.log(`Пост успешно создан с ID: ${postId}`);

      setPosts([...posts, { id: postId, ...newPost }]);
      setFilteredPosts([...posts, { id: postId, ...newPost }]);
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
      <div className="helpers-page">
        <h1>Предложи свою помощь другим</h1>
        <Link to="/main">
          <Button className="orange-button">или найди помощника...</Button>
        </Link>
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
          <div className="users-container">
            <div className="user-list">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post}/>
              ))}
            </div>
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