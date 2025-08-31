import { memo } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.css';
import { FaVoteYea } from 'react-icons/fa';



const Menu = () => {
    console.log('HomePage Rendered');
    return (
        <div className="bg-dark text-white vh-100" style={{ width: '250px' }}>

            <div className="p-3 d-flex align-items-center ">
                <FaVoteYea size={28} className="me-2" />
                <strong>Quản lý bình chọn</strong>
            </div>
            <Nav className="flex-column p-2">
                <Nav.Link as={NavLink} to="/manager/home" eventKey="/manager/home" className="custom-nav-link">Trang chủ</Nav.Link>
                <div className="text-uppercase text-secondary mt-3 px-2 small">Hệ thống</div>

                <Nav.Link as={NavLink} to="/manager/poll-list" eventKey="/manager/poll-list" className="custom-nav-link">danh sách cuộc bình chọn</Nav.Link>
                <Nav.Link as={NavLink} to="/manager/poll-add" eventKey="/manager/add-poll" className="custom-nav-link">Tạo Bình chọn</Nav.Link>
                <Nav.Link as={NavLink} to="/manager/user-list" eventKey="/manager/user-list" className="custom-nav-link">Quản lý Người dùng</Nav.Link>
                <Nav.Link as={NavLink} to="/danh-muc" eventKey="/danh-muc" className="text-white">Danh mục</Nav.Link>
                <Nav.Link as={NavLink} to="/manager/setting" eventKey="/manager/setting" className="text-white">Cài đặt hệ thống</Nav.Link>
            </Nav>
        </div>
    );
}
export default memo(Menu);