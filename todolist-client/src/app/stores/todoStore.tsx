import { makeAutoObservable, runInAction } from "mobx";
import { Todo } from "../models/todo";
import agent from "../api/agent";

export default class TodoStore {
  todos: Todo[] = [];
  todoRegistry = new Map<string, Todo>();
  selectedTodo: Todo | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get todosByDate() {
    return Array.from(this.todoRegistry.values()).sort(
      (a, b) => Date.parse(a.created_At) - Date.parse(b.created_At)
    );
  }

  get groupedTodos() {
    return Object.entries(
      this.todosByDate.reduce((todos, todo) => {
        const date = todo.finish_Time;
        todos[date] = todos[date] ? [...todos[date], todo] : [todo];
        return todos;
      }, {} as { [key: string]: Todo[] })
    );
  }

  loadTodos = async () => {
    this.loadingInitial = true;
    try {
      const todos = await agent.Todos.list();
      runInAction(() => {
        todos.forEach((todo) => {
          this.setTodo(todo);
        });
      });
    } catch (err) {
      console.log(err);
    } finally {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadTodo = async (id: string) => {
    let todo = this.getTodo(id);
    if (todo) {
      this.selectedTodo = todo;
      return todo;
    } else {
      this.loadingInitial = true;
      try {
        todo = await agent.Todos.details(id);
        this.setTodo(todo);
        runInAction(() => {
          this.selectedTodo = todo;
        });
        return todo;
      } catch (err) {
        console.log(err);
      } finally {
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  private setTodo = (todo: Todo) => {
    todo.created_At = todo.created_At.split("T")[0];
    todo.updated_At = todo.created_At.split("T")[0];
    todo.finish_Time = todo.finish_Time.split("T")[0];
    this.todoRegistry.set(todo.id, todo);
  };

  private getTodo = (id: string) => {
    return this.todoRegistry.get(id);
  };

  createTodo = async (todo: Todo) => {
    this.loading = true;
    todo.created_At = new Date().toISOString();
    todo.updated_At = new Date().toISOString();
    try {
      await agent.Todos.create(todo);
      runInAction(() => {
        this.todoRegistry.set(todo.id, todo);
        this.selectedTodo = todo;
        this.editMode = false;
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateTodo = async (todo: Todo) => {
    this.loading = true;
    todo.updated_At = new Date().toISOString();
    try {
      await agent.Todos.update(todo);
      runInAction(() => {
        this.todoRegistry.set(todo.id, todo);
        this.selectedTodo = todo;
        this.editMode = false;
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteTodo = async (id: string) => {
    this.loading = true;
    try {
      await agent.Todos.delete(id);
      runInAction(() => {
        this.todoRegistry.delete(id);
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
