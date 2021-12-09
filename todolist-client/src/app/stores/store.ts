import TodoStore from "./todoStore";
import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import CategoryStore from "./categoryStore";
import PriorityStore from "./priorityStore";

interface Store {
  todoStore: TodoStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  categoryStore: CategoryStore;
  priorityStore: PriorityStore;
}

export const store: Store = {
  todoStore: new TodoStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  categoryStore: new CategoryStore(),
  priorityStore: new PriorityStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
