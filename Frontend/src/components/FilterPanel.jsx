import './FilterPanel.css'
import Button from "./Button.jsx";


const subjectList = [
  {label: 'Математика', value: 'Math'},
  {label: 'Теория вероятностей', value: 'Probability'},
  {label: 'C#', value: 'CSharp'},
  {label: 'Машинное обучение', value: 'MachineLearning'},
  {label: 'Алгоритмы', value: 'Algorithms'},
  {label: 'Структуры данных', value: 'DataStructures'},
]
// const subjectsList = ['Математика', 'Теория вероятностей', 'C#', 'Машинное обучение', 'Алгоритмы', 'Структуры данных']
const ratingOptions = [
  {value: "", label: "Все"},
  {value: "newbie", label: "Новички"},
  {value: "smart", label: "Умные"},
  {value: "genius", label: "Гении"},
]

const sortOptions = [
  { value: "New", label: "По дате добавления: новые → старые" },
  { value: "Old", label: "По дате добавления: старые → новые" },
  { value: "RatingMaxToMin", label: "По рейтингу: высокий → низкий" },
  { value: "RatingMinToMax", label: "По рейтингу: низкий → высокий" },
];

export default function FilterPanel({filters, onChange, onApply}) {
  const handleRatingChange = (event) => {
    onChange({...filters, rating: event.target.value});
  }

  const handleSortChange = (event) => {
    onChange({ ...filters, sortBy: event.target.value });
  };

  const handleHelpSubjectsChange = (subject) => {
    const updatedSubjects = filters.helpSubjects.includes(subject)
      ? filters.helpSubjects.filter((s) => s !== subject)
      : [...filters.helpSubjects, subject];
    onChange({...filters, helpSubjects: updatedSubjects});
  }

  const handleRequiredSubjectChange = (subject) => {
    const updatedSubject = filters.requiredSubject === subject
      ? null
      : subject;
    onChange({...filters, requiredSubject: updatedSubject});
  }

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label htmlFor="rating-select">Рейтинг:</label>
        <select
          id="rating-select"
          value={filters.rating || ''}
          onChange={handleRatingChange}
        >
          {ratingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select">Сортировка:</label>
        <select
          id="sort-select"
          value={filters.sortBy || ""}
          onChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Предметы, с которыми вы готовы помочь:</label>
        <div className="subjects-buttons">
          {subjectList.map((subject) => (
            <button
              key={subject.value}
              className={filters.helpSubjects.includes(subject.value) ? 'selected' : ''}
              onClick={() => handleHelpSubjectsChange(subject.value)}
            >
              {subject.label}
            </button>
          ))}
        </div>
        <label>Предмет, с которым вам нужна помощь:</label>
        <div className="subjects-buttons">
          {subjectList.map((subject) => (
            <button
              key={subject.value}
              className={filters.requiredSubject === subject.value ? 'selected' : ''}
              onClick={() => handleRequiredSubjectChange(subject.value)}
            >
              {subject.label}
            </button>
          ))}
        </div>
      </div>
      <Button className="apply-filters-button" onClick={onApply}>
        Применить фильтры
      </Button>
    </div>
  )
}
