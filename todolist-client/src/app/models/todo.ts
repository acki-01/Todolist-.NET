import { Profile } from "./profile";

export interface Todo {
  id: string;
  title: string;
  description: string;
  comment: string;
  priority: number;
  created_At: Date | null;
  updated_At: Date | null;
  finish_Time: Date | null;
  done: boolean;
}

export interface TodoWithParticipants extends Todo {
  ownerName?: string;
  participants?: Profile[];
  owner?: Profile;
  isOwner?: boolean;
  category?: any;
}

export class TodoDTO implements Todo {
  id: string;
  title: string;
  description: string;
  comment: string;
  priority: number;
  created_At: Date | null;
  updated_At: Date | null;
  finish_Time: Date | null;
  done: boolean;
  constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.description = todo.description;
    this.comment = todo.comment;
    this.priority = todo.priority;
    this.created_At = todo.created_At;
    this.updated_At = todo.updated_At;
    this.finish_Time = todo.finish_Time;
    this.done = todo.done;
  }
}
