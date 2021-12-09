import { makeAutoObservable, runInAction } from "mobx";
import { Todo, TodoWithParticipants } from "../models/todo";
import agent from "../api/agent";
import { format } from "date-fns";
import { store } from "./store";
import { message } from "antd";

export enum SORT_TYPES {
  ALL = "ALL",
  DONE = "DONE",
  UNDONE = "UNDONE",
}

export default class TodoStore {
  todos: TodoWithParticipants[] = [];
  todoRegistry = new Map<string, TodoWithParticipants>();
  selectedTodo: TodoWithParticipants | undefined = undefined;
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
        const date = format(todo.updated_At!, "dd MMM yyyy");
        todos[date] = todos[date] ? [...todos[date], todo] : [todo];
        return todos;
      }, {} as { [key: string]: Todo[] })
    );
  }

  loadTodos = async (sortBy: SORT_TYPES = SORT_TYPES.ALL) => {
    this.loadingInitial = true;
    try {
      const todos = await agent.Todos.list(sortBy);
      if (this.todoRegistry.size) {
        this.todoRegistry.clear();
      }
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

  private setTodo = (todo: TodoWithParticipants) => {
    const user = store.userStore.user;
    if (user) {
      todo.isOwner = todo.ownerName === user.userName;
      todo.owner = todo.participants?.find(
        (participant) => participant.userName === todo.ownerName
      );
    }
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
      window.location.href = `/todos/${todo.id}`;
      message.success("Todo created successfully", 10);
      runInAction(() => {
        this.todoRegistry.set(todo.id, todo);
        this.selectedTodo = todo;
        this.editMode = false;
      });
    } catch (e) {
      message.error(`Problem with adding. Error: ${e.message}`, 10);
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
      window.location.href = `/todos/${todo.id}`;
      message.success("Todo updated successfully", 10);
      runInAction(() => {
        this.todoRegistry.set(todo.id, todo);
        this.selectedTodo = todo;
        this.editMode = false;
      });
    } catch (e) {
      message.error(`Problem with updating. Error: ${e.message}`, 10);
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
      message.success("Todo deleted successfully", 10);
      runInAction(() => {
        this.todoRegistry.delete(id);
      });
    } catch (e) {
      message.error(`Problem with deleting. Error: ${e.message}`, 10);
      console.log(e);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
