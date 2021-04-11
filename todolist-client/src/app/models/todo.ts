export interface Todo {
    id: string;
    title: string;
    description: string;
    comment: string;
    category: number;
    priority: number;
    created_At: string;
    updated_At: string;
    done: boolean;
    user_Id: number;
}