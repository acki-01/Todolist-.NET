import { makeAutoObservable, runInAction } from "mobx";
import { Category } from "../models/category";
import agent from "../api/agent";

export default class CategoryStore {
  categories: Category[] = [];
  categoriesRegistry = new Map<string, Category>();

  constructor() {
    makeAutoObservable(this);
  }
  loadCategories = async () => {
    try {
      const categories = await agent.Categories.list();
      this.categories = categories;
      runInAction(() => {
        categories.forEach((category) => {
          this.setCategory(category);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
  private setCategory = (category: Category) => {
    this.categoriesRegistry.set(category.id, category);
  };

  get categoriesTypes() {
    return Array.from(this.categoriesRegistry.values()).reduce(
      (acc, category): any => [
        ...acc,
        { value: category.id, text: category.type },
      ],
      []
    );
  }
}
