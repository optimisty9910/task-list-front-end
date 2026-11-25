/*
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList Renders', () => {
  const tasks = [
    {
      id: 1,
      title: 'task one',
      isComplete: false,
    },
    {
      id: 42,
      title: 'task 2',
      isComplete: true,
    },
  ];

  test('renders tasks', () => {
    // Act
    render(
      <TaskList
        tasks={tasks}
        onTaskClickCallback={() => {}}
        onTaskDeleteCallback={() => {}}
      />
    );

    // Assert
    expect(screen.getByText('task one')).toBeInTheDocument();
    expect(screen.getByText('task 2')).toBeInTheDocument();
  });
}); */



import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList Renders', () => {
  const tasks = [
    {
      id: 1,
      title: 'task one',
      description: 'First task',
      complete: false,
    },
    {
      id: 42,
      title: 'task 2',
      description: 'Second task',
      complete: true,
    },
  ];

  test('renders tasks', () => {
    render(
      <TaskList
        tasks={tasks}
        selectedIds={[]}
        onToggleSelect={() => {}}
        onCompleteTask={() => {}}
        onDeleteTask={() => {}}
        onEditTask={() => {}}
      />
    );

    expect(screen.getByText('task one')).toBeInTheDocument();
    expect(screen.getByText('task 2')).toBeInTheDocument();
  });
});

