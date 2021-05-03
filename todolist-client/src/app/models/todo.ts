export interface Todo {
  id: string;
  title: string;
  description: string;
  comment: string;
  category: number;
  priority: number;
  created_At: Date | null;
  updated_At: Date | null;
  finish_Time: Date | null;
  done: boolean;
  user_Id: number;
}
