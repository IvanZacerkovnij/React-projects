import { categoryStore } from "../../model/categoryStore";
import { useEffect } from "react";

export const Categories = () => {
  const categories = categoryStore((state) => state.categories);
  const loading = categoryStore((state) => state.loading);
  const error = categoryStore((state) => state.error);
  const getCategories = categoryStore((state) => state.getCategories);
  useEffect(() => {
    void getCategories();
  }, [getCategories]);
  if (loading) {
    return <>Loading...</>;
  }
  if (error != null) {
    return <p role="alert">{error}</p>;
  }
  if (categories.length === 0) return <p role="status">Категорій поки немає.</p>;
  return (
    <>
      Data
      {categories.map((c) => {
        return (
          <p key={c.id}>
            {c.name} {c.slug}
          </p>
        );
      })}
    </>
  );
};
