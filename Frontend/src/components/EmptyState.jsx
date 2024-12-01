import './EmptyState.css';
import PropTypes from "prop-types";

export default function EmptyState({ message, onReset, actionLabel }) {
  return (
    <div className="empty-state">
      <p>{message || 'Ничего не найдено.'}</p>
      {onReset && (
        <button onClick={onReset} className="empty-state-button">
          {actionLabel || 'Попробовать снова'}
        </button>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string,
  onReset: PropTypes.func,
  actionLabel: PropTypes.string,
}
