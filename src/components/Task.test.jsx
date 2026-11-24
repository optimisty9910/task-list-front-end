/*import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Task from './Task';

describe('Task', () => {
  test('Renders title content', () => {
    // Act
    render(
      <Task
        id={1}
        title={'Test Title'}
        isComplete={true}
        onClickCallback={() => { }}
        onDeleteCallback={() => { }}
      />
    );

    // Assert
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test.skip('Runs callbacks when buttons clicked', () => {
    // Arrange
    const clickCallback = vi.fn();
    const deleteCallback = vi.fn();

    // Act
    render(
      <Task
        id={42}
        title={'Test Title'}
        isComplete={true}
        onClickCallback={clickCallback}
        onDeleteCallback={deleteCallback}
      />
    );

    screen.getByText('Test Title').click();
    screen.getByTestId('delete button 42').click();

    // Assert
    expect(clickCallback).toHaveBeenCalledTimes(1);
    expect(deleteCallback).toHaveBeenCalledTimes(1);
    // Check parameters passed to callbacks
    expect(clickCallback).toHaveBeenCalledWith(42);
    expect(deleteCallback).toHaveBeenCalledWith(42);
  });

  test('Task has class "tasks__item__toggle--completed" if done is true', () => {
    // Act
    render(
      <Task
        id={1}
        title={'Test Title'}
        isComplete={true}
        onClickCallback={() => { }}
        onDeleteCallback={() => { }}
      />
    );

    expect(screen.getByText('Test Title')).toHaveClass(
      'tasks__item__toggle--completed'
    );
  });

  test('Task does not have class "tasks__item__toggle--completed" if done is false', () => {
    // Act
    render(
      <Task
        id={1}
        title={'Test Title'}
        isComplete={false}
        onClickCallback={() => { }}
        onDeleteCallback={() => { }}
      />
    );

    // Assert
    expect(screen.getByText('Test Title')).not.toHaveClass(
      'tasks__item__toggle--completed'
    );
  });
});*/




import { render, screen } from '@testing-library/react';
import Task from './Task';

describe('Task', () => {
  const renderTask = (isComplete) => {
    render(
      <Task
        id={1}
        title="Test Title"
        description="Test description"
        isComplete={isComplete}
        selectedIds={[]}
        onToggleSelect={() => {}}
        onCompleteTask={() => {}}
        onDeleteTask={() => {}}
        onEditTask={() => {}}
      />
    );
  };

  test('Renders title content', () => {
    renderTask(true);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('Task has class "is-complete" if done is true', () => {
    renderTask(true);

    expect(screen.getByText('Test Title')).toHaveClass(
      'task-title',
      'is-complete'
    );
  });

  test('Task does not have class "is-complete" if done is false', () => {
    renderTask(false);

    expect(screen.getByText('Test Title')).toHaveClass('task-title');
    expect(screen.getByText('Test Title')).not.toHaveClass('is-complete');
  });
});

