import {Suspense, type PropsWithChildren} from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import "./Layout.scss";
import "../../themes.scss";
import Loading from './Loading';
import { Toaster } from 'sonner';

const Layout = ({ children }: PropsWithChildren) => {

return (
    <div className="layout">
        <Toaster richColors position="top-right" />
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