import './FilterPanel.css'
import Button from "./Button.jsx";


const subjectsList = [
  { value: 1, label: 'Математика' },
  { value: 2, label: 'Теория вероятностей'},
  { value: 3, label: 'C#'},
  { value: 4, label: 'Машинное обучение'},
  { value: 5, label: 'Алгоритмы'},
  { value: 6, label: 'Структуры данных'},
]
// const subjectsList = ['Математика', 'Теория вероятностей', 'C#', 'Машинное обучение', 'Алгоритмы', 'Структуры данных']
const ratingOptions = [
  { value: "", label: "Все" },
  { value: "newbie", label: "Новички" },
  { value: "smart", label: "Умные"},
  { value: "genius", label: "Гении" },
]

export default function FilterPanel({ filters, onChange, onApply }) {
  const handleRatingChange = (event) => {
    onChange({ ...filters, rating: event.target.value });
  }

  const handleSubjectsChange = (subject) => {
    const updatedSubjects = filters.subjects.includes(subject)
      ? filters.subjects.filter((s) => s !== subject)
      : [...filters.subjects, subject];
    onChange({ ...filters, subjects: updatedSubjects });
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
        <label>Предметы:</label>
        <div className="subjects-buttons">
          {subjectsList.map((subject) => (
            <button
              key={subject.value}
              className={filters.subjects.includes(subject.value) ? 'selected' : ''}
              onClick={() => handleSubjectsChange(subject.value)}
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
