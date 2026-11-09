import { type Locator, type Page } from '@playwright/test';

export class TodoPage {
  private readonly newTodoInput: Locator;
  private readonly todoList: Locator;
  readonly todoItems: Locator;

  constructor(private readonly page: Page) {
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoList = page.getByRole('list').filter({
      has: page.getByRole('checkbox').first(),
    });
    this.todoItems = this.todoList.getByRole('listitem');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(todos: string[]): Promise<void> {
    for (const todo of todos) {
      await this.addTodo(todo);
    }
  }

  async completeTodo(text: string): Promise<void> {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.getByRole('checkbox').check();
  }

  async showActiveTodos(): Promise<void> {
    await this.page.getByRole('link', { name: 'Active' }).click();
  }

  async showCompletedTodos(): Promise<void> {
    await this.page.getByRole('link', { name: 'Completed' }).click();
  }

  async editTodo(oldText: string, newText: string): Promise<void> {
    const todo = this.todoItems.filter({ hasText: oldText });
    await todo.getByText(oldText, { exact: true }).dblclick();
    const editInput = this.page.getByRole('textbox').last();
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  async deleteTodo(text: string): Promise<void> {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByRole('button').click();
  }

  async clearCompleted(): Promise<void> {
    await this.page.getByRole('button', { name: 'Clear completed' }).click();
  }

  remainingCount(): Locator {
    return this.page.getByText(/\d+ items? left/);
  }
}
