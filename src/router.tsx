import { QueryClient } from '@tanstack/react-query';
import { type RouteObject } from 'react-router-dom';
import App from './App';
import Layout from './presentation/pages/Layout';
import ErrorPage from './presentation/pages/ErrorPage';
import Loading from './presentation/pages/Loading';
import { PATH_ROUTER } from './presentation/configuration';
import AuthPage from './presentation/pages/Authentication/AuthPage';
import LeadsPage from './presentation/pages/Leads/LeadsPage';
import EventPage from './presentation/pages/Events/EventPage';
import Dashboard from './presentation/pages/Dashboard/Dashboard';
import Profile from './presentation/pages/Users/Profile';
import Analytics from './presentation/pages/Analytics/Analytics';

export const routes: (queryClient:QueryClient) => RouteObject[] = ()=> {
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
                path: PATH_ROUTER.Dashboard,
                index: true,
                element: 
                    <Dashboard/> 
            },
            {
                path: PATH_ROUTER.Lead,
                element: 
                    <Profile/>
            }
            ,
            {
                path: PATH_ROUTER.Leads,
                element: 
                    <LeadsPage/>
            }
            ,
            // {
            //     path: PATH_ROUTER.Lead,
            //     element: 
            //         <LeadPage/>
            // }
            // ,
            {
                path: PATH_ROUTER.Appointment,
                element: 
                    <EventPage/>
            },
            {
                path: PATH_ROUTER.Analytics,
                element:
                    <Analytics/>
            }
            ] 
        }
    ]
}
