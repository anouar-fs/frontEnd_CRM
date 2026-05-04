import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../router';
import {type ReactNode } from 'react';

export const renderWithRoute = (initialEntries: (string | Partial<Location>)[]) => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

    const router = createMemoryRouter(routes(queryClient), { initialEntries });

    const renderResult = render(<RouterProvider router={router}/>,{
        wrapper: ({ children }: { children: ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    })
    
    return {
        router,
        renderResult,
    };
};
