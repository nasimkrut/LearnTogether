import './FilterPanel.css'
import Button from "./Button.jsx";
import {subjects, mapRatingToValue, mapValueToRating} from "../utils/Utils.jsx";

const ratingOptions = [
  {value: "", label: "Все"},
  {value: "newbie", label: "Новички"},
  {value: "smart", label: "Умные"},
  {value: "genius", label: "Гении"},
]

const sortOptions = [
  { value: 0, label: "По дате добавления: новые → старые" },
  { value: 1, label: "По дате добавления: старые → новые" },
];

export default function FilterPanel({filters, onChange, onApply}) {
  const handleRatingChange = (event) => {
    onChange({...filters, rating: mapRatingToValue(event.target.value)});
  }

  const handleSortChange = (event) => {
    onChange({ ...filters, sortBy: Number(event.target.value) });
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
        <label htmlFor="sort-select">Сортировка:</label>
        <select
          id="sort-select"
          value={filters.sortBy || 0}
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
          {subjects.map((subject) => (
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
          {subjects.map((subject) => (
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
