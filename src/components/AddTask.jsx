import { useState } from 'react';

const AddTask = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (taskTitle.trim() === '') {
      return;
    }

    onAddTask(taskTitle);

    setTaskTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a task</h2>

      <label>Title</label>

      <input
        type="text"
        placeholder="What needs doing?"
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />

      <button type="submit">
        Add task
      </button>
    </form>
  );
};

export default AddTask;
