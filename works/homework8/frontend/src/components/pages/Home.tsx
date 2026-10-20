import { categoryStore } from "@/store/categoryStore";

const Home = () => {
  const categories = categoryStore((state) => state.categories);
  return (
    <>
      <h1 className="text-4xl font-bold">Welcome to MyShop</h1>
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

export default Home;
