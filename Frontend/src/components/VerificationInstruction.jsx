import Button from "./Button.jsx";
import './VerificationInstruction.css';

export default function VerificationInstruction({ userId, onClose }) {
  return (
      <div className="modal-verification-instruction">
        <div className="modal-content-verification">
          <h2>Как подтвердить Telegram?</h2>
          <p>Для подтверждения вашего ника перейдите в нашего бота в Telegram:</p>
            <ol>
                <li>
                    <a href={`https://t.me/LearnTogetherFiitBot?start=${userId}`} target="_blank"
                       rel="noopener noreferrer">
                        Открыть бота LearnTogether (тык)
                    </a>
                </li>
                <li>Подождите подтверждения и обновите страницу</li>
            </ol>
            <Button onClick={onClose}>Закрыть</Button>
        </div>
      </div>
  );
}