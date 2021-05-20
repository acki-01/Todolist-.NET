import TodoStore from "./todoStore";
import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import CategoryStore from "./categoryStore";

interface Store {
  todoStore: TodoStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  categoryStore: CategoryStore;
}

export const store: Store = {
  todoStore: new TodoStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  categoryStore: new CategoryStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
