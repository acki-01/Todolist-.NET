import { makeAutoObservable, runInAction } from "mobx";
import { Todo } from "../models/todo";
import agent from "../api/agent";
import { format } from "date-fns";

export default class TodoStore {
  todos: Todo[] = [];
  todoRegistry = new Map<string, Todo>();
  selectedTodo: Todo | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get todosByDate() {
    return Array.from(this.todoRegistry.values()).sort(
      (a, b) => a.created_At!.getTime() - b.created_At!.getTime()
    );
  }

  get groupedTodos() {
    return Object.entries(
      this.todosByDate.reduce((todos, todo) => {
        const date = format(todo.finish_Time!, "dd MMM yyyy");
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
    todo.created_At = new Date(todo.created_At!);
    todo.updated_At = new Date(todo.created_At!);
    todo.finish_Time = new Date(todo.finish_Time!);
    this.todoRegistry.set(todo.id, todo);
  };

  private getTodo = (id: string) => {
    return this.todoRegistry.get(id);
  };

  createTodo = async (todo: Todo) => {
    this.loading = true;
    todo.created_At = new Date();
    todo.updated_At = new Date();
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
    todo.updated_At = new Date();
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
