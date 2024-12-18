import './EmptyState.css';
import PropTypes from "prop-types";
import Button from "./Button.jsx";

export default function EmptyState({ message, onReset, actionLabel }) {
  return (
    <div className="empty-state">
      <p>{message || 'Ничего не найдено.'}</p>
      {onReset && (
        <Button onClick={onReset} className="button">
          {actionLabel || 'Попробовать снова'}
        </Button>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string,
  onReset: PropTypes.func,
  actionLabel: PropTypes.string,
}
