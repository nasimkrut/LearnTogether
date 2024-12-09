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
  { value: 0, label: 'Математика' },
  { value: 1, label: 'Теория вероятностей'},
  { value: 2, label: 'C#'},
  { value: 3, label: 'Машинное обучение'},
  { value: 4, label: 'Алгоритмы'},
  { value: 5, label: 'Структуры данных'},
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
    setPosts(mockPosts)
    // const fetchPosts = async () => {
    //   try {
    //     const data = await getPosts({type: "canHelp"})
    //     setPosts(data);
    //     setFilteredPosts(data);
    //   } catch (e) {
    //     console.error("Ошибка загрузки постов:", e);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // fetchPosts();
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
        (filters.subjects.length === 0 || filters.subjects.some(subject => post.requiredSubject === subject))
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
    const createdPost = {
      userId: getUserId(getStoredUserName.then(name => name)).toString(),
      requiredSubject: newPost.requiredSubject,
      helpSubjects: newPost.helpSubjects.split(',').map(s => s.trim()),
      description: newPost.description,
      tags: [],
    }
    try {
      const postId = await createPost(createdPost);
      console.log(`Пост успешно создан с ID: ${postId}`);
      setPosts([...posts, {id: postId, ...newPost}]);
      setFilteredPosts([...posts, {id: postId, ...newPost}]);
      setShowModal(false);
      setNewPost({requiredSubject: "", helpSubjects: [], description: "", tags: ""});
    } catch (e) {
      console.error("Ошибка при создании поста:", e)
      alert("Возникла ошибка. Попробуйте снова!")
      setShowModal(false);
    }
  }

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
          <div className="helpers-container">
            <div className="user-list">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} type="canHelp"/>
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