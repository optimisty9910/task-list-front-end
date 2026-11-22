import { useState } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

function EditTask({ title, description, onSave, onCancel }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description ?? '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) return;

    onSave({
      title: trimmedTitle,
      description: newDescription.trim(),
    });
  };

  return (
    <form className="task-details edit-task-form" onSubmit={handleSubmit}>
      <div className="task-details-header">
        <span className="edit-task-heading">Edit task</span>
      </div>

      <label className="edit-field">
        <span className="edit-label">Title</span>
        <input
          type="text"
          className="edit-input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
      </label>

      <label className="edit-field">
        <span className="edit-label">Description</span>
        <textarea
          className="edit-textarea"
          rows={3}
          value={description}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </label>

      <div className="task-details-actions">
        <button type="submit" className="btn-save">
          Save
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

EditTask.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditTask;
