import { createRoot } from 'react-dom/client'
import './index.scss'
import { routes } from './router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(routes(queryClient));

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/*  <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" /> */}
    </QueryClientProvider>,
)
