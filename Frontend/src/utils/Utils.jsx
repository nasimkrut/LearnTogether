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

export const avatarOptions = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UdkG68P9AHESMfKJ-2Ybi9pfnqX1tqx3wQ&s",
  "https://as1.ftcdn.net/v2/jpg/01/14/20/46/1000_F_114204617_Whl3arafx4We0f13jcqYRCfVQlD1ezP0.jpg",
];

// export const getSubjectLabel = (value) => {
//   const subject = subjects.find(subject => subject.value === value);
//   return subject ? subject.label : 'Неизвестный предмет';
// };
