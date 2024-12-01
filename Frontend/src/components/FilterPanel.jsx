import './FilterPanel.css'
import Button from "./Button.jsx";

const subjectsList = ['math', 'programming', 'physics']
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
              key={subject}
              className={filters.subjects.includes(subject) ? 'selected' : ''}
              onClick={() => handleSubjectsChange(subject)}
            >
              {subject}
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
