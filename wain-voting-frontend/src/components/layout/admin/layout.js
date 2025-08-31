import { memo } from 'react';
import Header from './header';

import Menu from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';





const AdminMasterLayout = ({ children, ...props }) => {

    console.log('HomePage Rendered');
    return (
        <div className="d-flex">
            <Menu />
            <div className="flex-grow-1 d-flex flex-column" style={{ minHeight: '100vh' }}>
                <Header />
                <main className="p-4 bg-light flex-grow-1" style={{
                    height: 'calc(100vh - 120px)', overflowY: 'auto', scrollbarWidth: 'none',       // Firefox
                    msOverflowStyle: 'none'
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
export default memo(AdminMasterLayout);