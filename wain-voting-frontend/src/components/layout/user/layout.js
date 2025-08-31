import { memo } from 'react';
import Header from './header';
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserMasterLayout = ({ children, ...props }) => {

    console.log('HomePage Rendered');
    return (
        <div {...props}>
            <Header />
            {children}
            < Footer />
        </div>
    );
}
export default memo(UserMasterLayout);