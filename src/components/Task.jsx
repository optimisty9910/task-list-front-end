import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';
import TaskDetails from './TaskDetails';
import EditTask from './EditTask';

const Task = ({
  id,
  title,
  description,
  isComplete,
  selectedIds,
  onToggleSelect,
  onCompleteTask,
  onDeleteTask,
  onEditTask,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isCompleteClass = isComplete ? 'is-complete' : '';
  const taskTitleClass = `task-title ${isCompleteClass}`;
  const isSelected = selectedIds.includes(id);
  const taskCardClass = isSelected ? 'task-card is-selected' : 'task-card';

  const handleSave = (updateFields) => {
    onEditTask(id, updateFields);
    setIsEditing(false);
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => {
      if (prev) setIsEditing(false);
      return !prev;
    });
  };

  return (
    <article className={taskCardClass}>
      <div className="task-row">
        <label className="task-main">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(id)}
          />
          <span className={taskTitleClass}>{title}</span>
        </label>

        <div className="task-actions">
          {isComplete && <span className="done-badge">Done</span>}

          <button
            type="button"
            className="chevron-btn"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse task' : 'Expand task'}
            onClick={handleToggleExpand}
          >
            {isExpanded ? '^' : 'v'}
          </button>

          <button
            type="button"
            className="delete-btn"
            aria-label={`Delete ${title}`}
            onClick={() => onDeleteTask(id)}
          >
            x
          </button>
        </div>
      </div>

      {isExpanded &&
        (isEditing ? (
          <EditTask
            title={title}
            description={description}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <TaskDetails
            id={id}
            description={description}
            isComplete={isComplete}
            onCompleteTask={onCompleteTask}
            onEdit={() => setIsEditing(true)}
          />
        ))}
    </article>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleSelect: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default Task;
