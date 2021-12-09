import { makeAutoObservable, runInAction } from "mobx";
import { Priority } from "../models/priority";
import agent from "../api/agent";

export default class PriorityStore {
  priorities: Priority[] = [];
  prioritiesRegistry = new Map<string, Priority>();

  constructor() {
    makeAutoObservable(this);
  }
  loadPriorities = async () => {
    try {
      const priorities = await agent.Priorities.list();
      this.priorities = priorities;
      runInAction(() => {
        priorities.forEach((priority) => {
          this.setPriority(priority);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
  private setPriority = (priority: Priority) => {
    this.prioritiesRegistry.set(priority.id, priority);
  };

  get prioritiesTypes() {
    return Array.from(this.prioritiesRegistry.values()).reduce(
      (acc, priority): any => [
        ...acc,
        { value: priority.id, text: priority.type },
      ],
      []
    );
  }
}
