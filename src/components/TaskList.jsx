import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({
  tasks,
  selectedIds,
  onToggleSelect,
  onCompleteTask,
  onDeleteTask,
  onEditTask,
}) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          isComplete={task.complete}
          selectedIds={selectedIds}
          onToggleSelect={onToggleSelect}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleSelect: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default TaskList;
