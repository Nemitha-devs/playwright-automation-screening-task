import { expect, test } from '@playwright/test';
import { TodoPage } from './todo-page';

test('adds three todos from an array of test data', async ({ page }) => {
  const todos = new TodoPage(page);
  await todos.goto();
  await todos.addTodos(['Buy groceries', 'Read a book', 'Go for a walk']);

  await expect(todos.todoItems).toHaveCount(3);
});

test('completing one todo updates the remaining count', async ({ page }) => {
  const todos = new TodoPage(page);
  await todos.goto();
  await todos.addTodos(['Buy groceries', 'Read a book', 'Go for a walk']);
  await todos.completeTodo('Buy groceries');

  await expect(todos.remainingCount()).toHaveText('2 items left');
});

test('Active and Completed filters show the matching todos', async ({ page }) => {
  const todos = new TodoPage(page);
  await todos.goto();
  await todos.addTodos(['Buy groceries', 'Read a book', 'Go for a walk']);
  await todos.completeTodo('Buy groceries');

  await todos.showActiveTodos();
  await expect(todos.todoItems).toHaveCount(2);
  await expect(todos.todoItems.filter({ hasText: 'Buy groceries' })).toHaveCount(0);

  await todos.showCompletedTodos();
  await expect(todos.todoItems).toHaveCount(1);
  await expect(todos.todoItems.filter({ hasText: 'Buy groceries' })).toHaveCount(1);
});

test('edits a todo after a double-click', async ({ page }) => {
  const todos = new TodoPage(page);
  await todos.goto();
  await todos.addTodo('Draft interview notes');
  await todos.editTodo('Draft interview notes', 'Review interview notes');

  await expect(todos.todoItems).toContainText('Review interview notes');
  await expect(todos.todoItems).not.toContainText('Draft interview notes');
});

test('deletes a todo', async ({ page }) => {
  const todos = new TodoPage(page);
  await todos.goto();
  await todos.addTodos(['Keep this task', 'Remove this task']);
  await todos.deleteTodo('Remove this task');

  await expect(todos.todoItems).toHaveCount(1);
  await expect(todos.todoItems).toContainText('Keep this task');
  await expect(todos.todoItems).not.toContainText('Remove this task');
});

test('Clear completed removes completed todos only', async ({ page }) => {
  const todos = new TodoPage(page);
  await todos.goto();
  await todos.addTodos(['Finish report', 'Keep reading', 'Submit form']);
  await todos.completeTodo('Finish report');
  await todos.completeTodo('Submit form');
  await todos.clearCompleted();

  await expect(todos.todoItems).toHaveCount(1);
  await expect(todos.todoItems).toContainText('Keep reading');
  await expect(todos.todoItems).not.toContainText('Finish report');
  await expect(todos.todoItems).not.toContainText('Submit form');
});
