import TaskList from './components/TaskList.jsx';
import AddTask from './components/AddTask.jsx';
import {useState} from 'react';
import './App.css';

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

  const handleAddTask = (newTaskTitle) => {
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      isComplete: false,
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
        <AddTask onAddTask={handleAddTask} />
        <TaskList tasks={tasks} />
      </main>
    </div>
  );
};

export default App;
