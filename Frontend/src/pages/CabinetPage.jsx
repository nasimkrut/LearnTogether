import Header from "../components/Header.jsx";
import'./CabinetPage.css'

export default function CabinetPage() {
  const user = {
    photo: "https://lh3.googleusercontent.com/X8LuYsGddUvyGns8yNt3lsqXU-etopUi9saFCQ-VMIImDW0plr-ZvBRjhnKh4V2r6UEMaBMXUBkJSD_RrHbWdmIp2RUnVJgcbiJ_S3l_kOAseWWI6JiLccLcL0cRFpnba-n4bjlOW3FvHbHdMs_ToZE",
    name: "Иван Иванов",
    speciality: "ФИИТ",
    group: "ФТ-203",
    skills: ["JavaScript", "React", "Node.js"],
    telegram: "aboba",
  };

  return (
    <>
      <Header/>
      <div className="cabinet">
        <div className="cabinet-content">
          <img src={user.photo} alt="User photo" className="user-photo" />
          <h2>{user.name}</h2>
          <p>Специальность: {user.speciality}</p>
          {user.group && <p>Группа: {user.group}</p>}
          <p>Навыки: {user.skills.join(", ")}</p>
          <a
            href={`https://t.me/${user.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info"
            style={{textDecoration: "none"}}
          >
            Контакт: @{user.telegram}
          </a>
        </div>
      </div>
    </>
  )
}