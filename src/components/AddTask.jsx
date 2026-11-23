import { useState } from 'react';
import './AddTask.css';
import PropTypes from 'prop-types';

const AddTask = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (taskTitle.trim() === '') {
      return;
    }

    onAddTask({
      title: taskTitle,
      description: description,
      isComplete: isComplete === 'true',
    });

    setTaskTitle('');
    setDescription('');
    setIsComplete('false');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h2>Add a task</h2>

      <label>Title</label>

      <input
        type="text"
        placeholder="What needs doing?"
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />

      <label>Description (optional)</label>
      <textarea
        placeholder='Enter task description'
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <label>Is Completed?</label>
      <select
        value={isComplete}
        onChange={(event) => setIsComplete(event.target.value)}
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>

      <button type="submit">Add task</button>
    </form>
  );
};

AddTask.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default AddTask;
