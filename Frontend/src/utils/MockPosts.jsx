const post = {
  id: "1",
  userId: "123",
  userName: "Иван Иванов",
  requiredSubject: "Математика",
  helpSubjects: ["Физика", "Информатика"],
  description: "Готов помочь с подготовкой к экзаменам",
  photo: "/avatars/avatar1.png",
};

export const mockPosts = [
  {
    userName: "123",
    fullName: "Иван Иванов",
    requiredSubject: 1,
    helpSubjects: [3, 5],
    description: "Готов помочь с подготовкой к экзаменам",
    photo: "/avatars/avatar1.png",
    speciality: 'ФИИТ',
    group: 'ФТ-203',
    login: 'oI_Io_P',
    rating: 1,
  },
  {
    userName: "189274",
    fullName: "Дмитрий Хлопин",
    requiredSubject: 3,
    helpSubjects: [2, 5, 4],
    description: "Тервре это я, тервер это мы",
    photo: "/avatars/avatar1.png",
    speciality: 'Доцент',
    group: '',
    login: 'X_V_I_M',
    rating: 10,
  },
  {
    userName: "658543",
    fullName: "Рас Олегов",
    requiredSubject: 4,
    helpSubjects: [1, 6],
    description: "Очевидно, но не все",
    photo: "/avatars/avatar1.png",
    speciality: 'Доцент, кандидат физико-математических наук',
    group: '',
    login: 'RasinOleg',
    rating: 10,
  },
  {
    userName: "986736",
    fullName: "Зюк Михайлов",
    requiredSubject: 4,
    helpSubjects: [1, 2, 3, 5, 6],
    description: "всегда готов помочь",
    photo: "/avatars/avatar1.png",
    speciality: 'ФИИТ',
    group: 'ФТ-203',
    login: '',
    rating: 4.9
  },
  {
    userName: "346733",
    fullName: "Мария Петрова",
    requiredSubject: 4,
    helpSubjects: [1, 2],
    description: "Могу помочь разобраться с теорией вероятностей и математическим анализом",
    photo: "/avatars/avatar1.png",
    rating: 3.9,
    speciality: 'Алгобак',
    group: '',
    login: '',
  },
  {
    userName: "333789",
    fullName: "Радик Черепанов",
    requiredSubject: 2,
    helpSubjects: [5, 3],
    description: "Объясню, как работают алгоритмы и структуры данных",
    photo: "/avatars/avatar1.png",
    rating: 1.2,
    speciality: 'ФИИТ',
    group: 'ФТ-401',
    login: '',
  }
]