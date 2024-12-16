export const mapValueToRating = (value) => {
  if (value === 0) return '';
  if (value < 2) return 'newbie';
  if (value < 4) return 'smart';
  return 'genius';
};

export const mapRatingToValue = (rating) => {
  if (rating === '') return 0;
  if (rating ===  'newbie') return 1.9;
  if (rating === 'smart') return 3.9;
  if (rating === 'genius') return 5.9;
};

export const subjects = [
  {value: 0, label: 'Математика'},
  {value: 1, label: 'Теория вероятностей'},
  {value: 2, label: 'C#'},
  {value: 3, label: 'Машинное обучение'},
  {value: 4, label: 'Алгоритмы'},
  {value: 5, label: 'Структуры данных'},
];

// export const getSubjectLabel = (value) => {
//   const subject = subjects.find(subject => subject.value === value);
//   return subject ? subject.label : 'Неизвестный предмет';
// };
