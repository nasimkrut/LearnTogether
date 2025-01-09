import Button from "./Button.jsx";
import './VerificationInstruction.css'

export default function VerificationInstruction({userName, onClose}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Как подтвердить Telegram?</h2>
        <p>
          Для подтверждения вашего ника выполните следующие шаги:
        </p>
        <ol>
          <li>Перейдите в приложение Telegram.</li>
          <li>Напишите боту @LearnTogether_bot сообщение: `{userName}`</li>
          <li>Подождите подтверждения и обновите страницу.</li>
        </ol>
        <Button onClick={onClose}>Закрыть</Button>
      </div>
    </div>
  );
}