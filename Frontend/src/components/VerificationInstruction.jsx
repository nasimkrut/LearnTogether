import Button from "./Button.jsx";
import './VerificationInstruction.css';

export default function VerificationInstruction({ userName, onClose }) {
  return (
      <div className="modal-verification-instruction">
        <div className="modal-content-verification">
          <h2>Как подтвердить Telegram?</h2>
          <p>Для подтверждения вашего ника выполните следующие шаги:</p>
          <ol>
            <li>Перейдите в приложение Telegram</li>
            <li>
              Напишите боту <strong>@LearnTogether_bot</strong> сообщение: <code>{userName}</code>
            </li>
            <li>Подождите подтверждения и обновите страницу</li>
          </ol>
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      </div>
  );
}