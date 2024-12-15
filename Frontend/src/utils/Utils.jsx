export const mapRatingToValue = (rating) => {
  if (rating < 2) return 'newbie';
  if (rating < 4) return 'smart';
  return 'genius';
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
