import { createBrowserRouter } from "react-router";
import Layout from "@/app/layout/Layout";
import Home from "@/app/pages/Home";
import { Categories, CategoriesList, CategoryDetail, ProductsList } from "@/features/catalog";
import NotFoundPage from "@/app/pages/NotFound";
import Error from "@/app/pages/Error";
import AppRoutes from "@/shared/config/AppRoutes";
import { Register } from "@/features/auth";

export const routes = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: `${AppRoutes.SUBCATEGORIES}/:id`, //params
        Component: CategoriesList,
      },
      {
        path: AppRoutes.CATEGORIES,
        Component: CategoriesList,
      },
      {
        path: AppRoutes.TEST_CATEGORIES,
        Component: Categories,
      },
      {
        path: AppRoutes.ABOUT,
        //Component: About
        lazy: async () => {
          const module = await import("@/app/pages/About");
          return {
            Component: module.default,
          };
        },
      },
      {
        path: AppRoutes.PRODUCTS,
        Component: ProductsList,
      },
      {
        path: `${AppRoutes.CATEGORIES}/:slug`,
        Component: CategoryDetail,
      },
      {
        path: AppRoutes.SEARCH,
        Component: CategoriesList,
      },
      {
        path: AppRoutes.REGISTER,
        Component: Register,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
