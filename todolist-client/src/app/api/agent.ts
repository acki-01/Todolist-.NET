import axios, { AxiosError, AxiosResponse } from "axios";
import { Todo, TodoWithParticipants } from "../models/todo";
import { toast } from "react-toastify";
import { history } from "../../index";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { Category } from "../models/category";
import { SORT_TYPES } from "../stores/todoStore";
import { object } from "yup";

axios.defaults.baseURL = "http://localhost:5000/";

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (res) => {
    await sleep(1000);
    return res;
  },
  (error: AxiosError) => {
    const { status, data, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const errors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              errors.push(data.errors[key]);
            }
          }
          throw errors.flat();
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        history.push("./not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const resBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, params).then(resBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(resBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(resBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(resBody),
};

export const Todos = {
  list: (sortBy: SORT_TYPES) =>
    requests.get<TodoWithParticipants[]>("/todos", { params: { sortBy } }),
  details: (id: string) => requests.get<Todo>(`/todos/${id}`),
  create: (todo: TodoWithParticipants) => requests.post<void>("/todos", todo),
  update: (todo: TodoWithParticipants) =>
    requests.put<void>(`/todos/${todo.id}`, todo),
  delete: (id: string) => requests.delete<void>(`/todos/${id}`),
};

const Account = {
  current: () => requests.get<User>("/user"),
  login: (user: UserFormValues) => requests.post<User>("/user/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/user/register", user),
};

const Categories = {
  list: () => requests.get<Category[]>("/categories"),
  create: (category: Category) => requests.post<void>("/categories", category),
  update: (category: Category) =>
    requests.put<void>(`/categories/${category.id}`, category),
  delete: (id: string) => requests.delete<void>(`/categories/${id}`),
};

const agent = {
  Todos,
  Account,
  Categories,
};

export default agent;
