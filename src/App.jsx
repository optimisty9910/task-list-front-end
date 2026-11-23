import TaskList from './components/TaskList.jsx';
import AddTask from './components/AddTask.jsx';
import {useState} from 'react';
import SelectAll from './components/SelectAll.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import { taskData } from './TaskDATA.js';
import { useState } from 'react';
import './App.css';
//import { describe } from 'vitest';

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: Date.now(),
      title: newTaskData.title,
      description: newTaskData.description,
      isComplete: newTaskData.isComplete,
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
  };

  const [tasks, setTasks] = useState(taskData);
  const taskCompleted = tasks.filter((task) => task.complete);

  const [selectedIds, setSelectedIds] = useState([]);

  const [pendingDelete, setPendingDelete] = useState(null);

  const totalCount = tasks.length;
  const selectedCount = selectedIds.length;

  const handleToogleSelect = (taskId) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(taskId)
        ? prevSelectedIds.filter((id) => id !== taskId)
        : [...prevSelectedIds, taskId],
    );
  };

  const handleToogleSelectAll = () => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.length === tasks.length
        ? []
        : tasks.map((task) => task.id),
    );
  };

  const handleMarkComplete = () => {
    setTasks((prev) =>
      prev.map((task) =>
        selectedIds.includes(task.id) ? { ...task, complete: true } : task,
      ),
    );
    setSelectedIds([]);
  };

  const handleDeleteSelected = () => {
    setTasks((prev) => prev.filter((task) => !selectedIds.includes(task.id)));
    setSelectedIds([]);
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, complete: !task.complete } : task,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.filter((id) => id !== taskId),
    );
  };

  const handleEditTask = (taskId, updateFields) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updateFields } : task,
      ),
    );
  };

  const handleRequestDeleteTask = (taskId) => {
    setPendingDelete({ type: 'single', taskId });
  };

  const handleRequestDeleteSelected = () => {
    setPendingDelete({ type: 'multiple' });
  };

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;

    if (pendingDelete?.type === 'single') {
      handleDeleteTask(pendingDelete.taskId);
    } else if (pendingDelete?.type === 'multiple') {
      handleDeleteSelected();
    }
    setPendingDelete(null);
  };

  const handleCancelDelete = () => {
    setPendingDelete(null);
  };

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
      ? `"${taskToBeDeleted.title}" will be removed. This cannot be undone.`
      : 'The selected tasks will be removed. This cannot be undone.';

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
        <p>
          {taskCompleted.length} of {tasks.length} completed.
        </p>
      </header>

      <main>
        <TaskList tasks={tasks} />
        <AddTask onAddTask={handleAddTask} />
      <main className="main-content">
        <h1>All Tasks</h1>
        <SelectAll
          totalCount={totalCount}
          selectedCount={selectedCount}
          onToggleSelectAll={handleToogleSelectAll}
          onMarkComplete={handleMarkComplete}
          onDeleteSelected={handleRequestDeleteSelected}
        />
        <div>
          <TaskList
            tasks={tasks}
            selectedIds={selectedIds}
            onToggleSelect={handleToogleSelect}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleRequestDeleteTask}
            onEditTask={handleEditTask}
          />
        </div>
        <ConfirmDialog
          isOpen={pendingDelete !== null}
          title={dialogTitle}
          message={dialogMessage}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
        {/* Add a task component here */}
      </main>
    </div>
  );
};

export default App;
