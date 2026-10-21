import { create } from "zustand";
import type { CategoryType } from "./CategoryType";
import Category from "../api/Category";

type CategoryStore = {
  categories: CategoryType[];
  loading: boolean;
  error: string | null;
  getCategories: () => Promise<void>;
};

export const categoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,
  getCategories: async () => {
    try {
      set({
        loading: true,
        error: null,
      });
      const data = await Category.GetAllCategories();
      set({
        loading: false,
        error: null,
        categories: data ?? [],
      });
    } catch (error) {
      set({
        loading: false,
        error: "Не вдалось отримати категорії " + error,
      });
    }
  },
}));
