import PropTypes from 'prop-types';
import './Task.css';

const TaskDetails = ({
  id,
  description,
  isComplete,
  onCompleteTask,
  onEdit,
}) => {
  const completedAt = new Date().toLocaleString();

  return (
    <div className="task-details">
      <div className="task-details-header">
        <span className="task-meta">
          Task #{id} · {isComplete ? 'Complete' : 'Incomplete'}
        </span>
      </div>

      <p className="task-description">
        {description ? description : 'No description'}
      </p>

      {isComplete && (
        <p className="completed-timestamp">Completed at: {completedAt}</p>
      )}

      <div className="task-details-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onCompleteTask(id)}
        >
          {isComplete ? 'Undo completion' : 'Mark complete'}
        </button>
        <button type="button" className="btn-secondary" onClick={onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};

TaskDetails.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  isComplete: PropTypes.bool.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TaskDetails;
