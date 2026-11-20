import TaskList from './components/TaskList.jsx';
import AddTask from './components/AddTask.jsx';
import {useState} from 'react';
import './App.css';
//import { describe } from 'vitest';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>

      <main>
        <TaskList tasks={tasks} />
        <AddTask onAddTask={handleAddTask} />
      </main>
    </div>
  );
};

export default App;
