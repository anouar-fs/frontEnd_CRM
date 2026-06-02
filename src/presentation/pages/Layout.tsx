import {Suspense, type PropsWithChildren} from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import "./Layout.scss";
import "../../themes.scss";
import Loading from './Loading';
import { Toaster } from 'sonner';
import TopNavBar from '../components/TopNavbar/TopNavBar';

const Layout = ({ children }: PropsWithChildren) => {

return (
    <div className="layout">
        <Toaster richColors position="top-right" />
        <TopNavBar/>
        <Sidebar />
        <main className="layout__content">
            <Suspense fallback={<Loading />}>
            {children}
            </Suspense>
        </main>
    </div>
)
}

export default Layout