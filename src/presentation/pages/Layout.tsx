import {type PropsWithChildren} from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import "./Layout.scss";
import "../../themes.scss";

const Layout = ({ children }: PropsWithChildren) => {

return (
    <div className="layout">
        <Sidebar />
        <main className="layout__content">{children}</main>
    </div>
)
}

export default Layout