import { useState } from 'react';
import TaskList from './components/TaskList.jsx';
import AddTask from './components/AddTask.jsx';
import SelectAll from './components/SelectAll.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import { taskData } from './TaskDATA.js';
import './App.css';

const App = () => {
  // Main source of truth for all tasks
  const [tasks, setTasks] = useState(taskData);

  // Track selected tasks
  const [selectedIds, setSelectedIds] = useState([]);

  // Track delete confirmation dialog
  const [pendingDelete, setPendingDelete] = useState(null);

  // Add a new task
  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: Date.now(),
      title: newTaskData.title,
      description: newTaskData.description,
      complete: newTaskData.isComplete ?? false,
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
  };

  // Task counts
  const taskCompleted = tasks.filter((task) => task.complete);
  const totalCount = tasks.length;
  const selectedCount = selectedIds.length;

  // Select or deselect an individual task
  const handleToogleSelect = (taskId) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(taskId)
        ? prevSelectedIds.filter((id) => id !== taskId)
        : [...prevSelectedIds, taskId],
    );
  };

  // Select or deselect all tasks
  const handleToogleSelectAll = () => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.length === tasks.length
        ? []
        : tasks.map((task) => task.id),
    );
  };

  // Mark selected tasks as complete
  const handleMarkComplete = () => {
    setTasks((prev) =>
      prev.map((task) =>
        selectedIds.includes(task.id)
          ? { ...task, complete: true }
          : task,
      ),
    );

    setSelectedIds([]);
  };

  // Delete selected tasks
  const handleDeleteSelected = () => {
    setTasks((prev) =>
      prev.filter((task) => !selectedIds.includes(task.id)),
    );

    setSelectedIds([]);
  };

  // Toggle individual task completion
  const handleCompleteTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, complete: !task.complete }
          : task,
      ),
    );
  };

  // Delete an individual task
  const handleDeleteTask = (taskId) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== taskId),
    );

    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.filter((id) => id !== taskId),
    );
  };

  // Edit an individual task
  const handleEditTask = (taskId, updateFields) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, ...updateFields }
          : task,
      ),
    );
  };

  // Open delete confirmation for one task
  const handleRequestDeleteTask = (taskId) => {
    setPendingDelete({ type: 'single', taskId });
  };

  // Open delete confirmation for selected tasks
  const handleRequestDeleteSelected = () => {
    setPendingDelete({ type: 'multiple' });
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (!pendingDelete) return;

    if (pendingDelete.type === 'single') {
      handleDeleteTask(pendingDelete.taskId);
    } else if (pendingDelete.type === 'multiple') {
      handleDeleteSelected();
    }

    setPendingDelete(null);
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setPendingDelete(null);
  };

  // Find task for confirmation dialog
  const taskToBeDeleted =
    pendingDelete?.type === 'single'
      ? tasks.find((task) => task.id === pendingDelete.taskId)
      : null;

  const dialogTitle =
    pendingDelete?.type === 'single'
      ? 'Delete this task?'
      : `Delete ${selectedCount} tasks?`;

  const dialogMessage =
    pendingDelete?.type === 'single'
      ? `"${taskToBeDeleted?.title ?? 'This task'}" will be removed. This cannot be undone.`
      : 'The selected tasks will be removed. This cannot be undone.';

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&#39;s Task List</h1>
        <p>
          {taskCompleted.length} of {tasks.length} completed.
        </p>
      </header>

      <main className="main-content">
        <h1>All Tasks</h1>

        <SelectAll
          totalCount={totalCount}
          selectedCount={selectedCount}
          onToggleSelectAll={handleToogleSelectAll}
          onMarkComplete={handleMarkComplete}
          onDeleteSelected={handleRequestDeleteSelected}
        />

        <TaskList
          tasks={tasks}
          selectedIds={selectedIds}
          onToggleSelect={handleToogleSelect}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleRequestDeleteTask}
          onEditTask={handleEditTask}
        />

        <AddTask onAddTask={handleAddTask} />

        <ConfirmDialog
          isOpen={pendingDelete !== null}
          title={dialogTitle}
          message={dialogMessage}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </main>
    </div>
  );
};

export default App;
