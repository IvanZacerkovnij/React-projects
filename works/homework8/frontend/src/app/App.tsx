import { RouterProvider } from 'react-router';
import { ProductsProvider } from '@/features/catalog';
import { routes } from './routes/routes';

export default function App() {
    return (
        <ProductsProvider>
            <RouterProvider router={routes} />
        </ProductsProvider>
    );
}
