import Select from "react-select";
import Button from "./Button.jsx";
import {useEffect, useState} from "react";
import {createPost, isTelegramNameVerified, getStoredUserName, getUserId} from "../services/api.js";
import "./CreatePostForm.css"

export default function CreatePostForm({subjects, onPostCreated, setShowModal}) {
  const [newPost, setNewPost] = useState({
    requiredSubject: null,
    helpSubjects: [],
    description: "",
    tags: "",
  });

  useEffect(() => {
    const checkTelegramVerification = async () => {
      const isVerified = await isTelegramNameVerified();
      if (!isVerified) {
        alert(
          "Вы не подтвердили ваш ник в Телеграмм. Пожалуйста, перейдите в личный кабинет и следуйте инструкции."
        );
        setShowModal(false);
      }
    };

    checkTelegramVerification().catch((error) => {
      console.error("Ошибка при проверке Телеграмм ника:", error)
    });
  }, [setShowModal]);

  const handleSingleSelectChange = (selectedOption) => {
    setNewPost({
      ...newPost,
      requiredSubject: selectedOption ? selectedOption.value : null,
    });
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setNewPost({
      ...newPost,
      helpSubjects: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    });
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const userName = getStoredUserName(); // Получаем UserName из sessionStorage
      if (!userName) {
        alert("Не удалось найти имя пользователя. Пожалуйста, войдите снова.");
        return;
      }

      const userId = await getUserId(userName); // Ожидаем выполнения функции

      const postData = {
        userId: userId, // ID пользователя
        requiredSubject: newPost.requiredSubject, // Число
        helpSubjects: newPost.helpSubjects, // Массив чисел
        description: newPost.description, // Строка
        tags: newPost.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""), // Массив строк
        createdAt: new Date().toLocaleTimeString(),
      };

      await createPost(postData); // Отправка данных на сервер
      onPostCreated(); // Обновление списка постов
      setShowModal(false); // Закрытие модального окна
    } catch (error) {
      alert(`Ошибка при создании поста: ${error.message}`);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Новый пост</h2>
        <Select
          options={subjects}
          onChange={handleSingleSelectChange}
          placeholder="Нужна помощь с предметом.."
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
          placeholder="Помогу с предметами.."
          classNamePrefix="react-select"
        />
        <input
          type="text"
          name="tags"
          placeholder="Теги (опционально)..."
          value={newPost.tags}
          onChange={handleInputChange}
        />
        <div className="button-group">
          <Button onClick={handleSubmit}>Создать</Button>
          <Button onClick={() => setShowModal(false)}>Отмена</Button>
        </div>
      </div>
    </div>
  );
}
