import { QueryClient } from '@tanstack/react-query';
import { type RouteObject } from 'react-router-dom';
import App from './App';
import Layout from './presentation/pages/Layout';
import ErrorPage from './presentation/pages/ErrorPage';
import Loading from './presentation/pages/Loading';
import { PATH_ROUTER } from './presentation/configuration';
import Page1 from './presentation/pages/Page1';
import AuthPage from './presentation/pages/Authentication/AuthPage';
import UsersPage from './presentation/pages/Users/UsersPage';
import LeadsPage from './presentation/pages/Leads/LeadsPage';

export const routes: (queryClient:QueryClient) => RouteObject[] = (queryClient)=> {
    return [
        {
            path: PATH_ROUTER.Authentication,
            element:
                <AuthPage/>,
            hydrateFallbackElement: <Loading/>,
            errorElement: <ErrorPage/> 
        },
        {
            element:<App/>,
            errorElement:(
                <Layout>
                    <ErrorPage />
                </Layout>
            ),
            hydrateFallbackElement: (
                <Layout>
                    <Loading />
                </Layout>
            ),
            children:
            [
            {
                path: PATH_ROUTER.Page1,
                index: true,
                element: 
                    <Page1/> 
            },
            {
                path: PATH_ROUTER.Users,
                element: 
                    <UsersPage/>
            }
            ,
            {
                path: PATH_ROUTER.Leads,
                element: 
                    <LeadsPage/>
            }
            ] 
        }
    ]
}
