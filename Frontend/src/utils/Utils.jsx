export const mapRatingToValue = (rating) => {
  if (rating < 2) return 'newbie';
  if (rating < 4) return 'smart';
  return 'genius';
};

export const subjects = [
  {value: 1, label: 'Математика'},
  {value: 2, label: 'Теория вероятностей'},
  {value: 3, label: 'C#'},
  {value: 4, label: 'Машинное обучение'},
  {value: 5, label: 'Алгоритмы'},
  {value: 6, label: 'Структуры данных'},
];

export const getSubjectLabel = (value) => {
  const subject = subjects.find(subject => subject.value === value);
  return subject ? subject.label : 'Неизвестный предмет';
};
