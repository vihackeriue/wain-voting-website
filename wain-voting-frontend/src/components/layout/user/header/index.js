import { memo, useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './style.css';
import { getCurrentUsername, getWalletAddress } from '../../../../utils/jwt';
import ConnectWalletButton from '../../../button/connectWalletButton';


const Header = () => {
    const navigate = useNavigate();
    const username = getCurrentUsername();


    const [wallet, setWallet] = useState(getWalletAddress());
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    // Theo dõi khi token thay đổi để cập nhật ví
    useEffect(() => {
        const handleTokenChange = () => {
            const updatedWallet = getWalletAddress();
            setWallet(updatedWallet);
        };
        // Gọi khi component mount
        handleTokenChange();
        //Lắng nghe sự kiện "storage" nếu thay đổi từ tab khác
        window.addEventListener("storage", handleTokenChange);
        return () => {
            window.removeEventListener("storage", handleTokenChange);
        };
    }, []);

    return (
        <Navbar bg="white" expand="xl" sticky="top" className="shadow-sm py-3">
            <Container fluid="xl">
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <h1 className="m-0 text-success fw-bold text-uppercase">Voting App</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navmenu" />
                <Navbar.Collapse id="navmenu" className="justify-content-between">
                    <Nav className="mx-auto gap-4">
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link text-success fw-semibold" : "nav-link text-dark"}>Trang chủ</NavLink>
                        <NavLink to="/poll-list" className={({ isActive }) => isActive ? "nav-link text-success fw-semibold" : "nav-link text-dark"}>Cuộc bình chọn</NavLink>
                        <NavLink to="/history" className={({ isActive }) => isActive ? "nav-link text-success fw-semibold" : "nav-link text-dark"}>Lịch sử</NavLink>
                        <NavLink to="/trainers" className={({ isActive }) => isActive ? "nav-link text-success fw-semibold" : "nav-link text-dark"}>Nhóm</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link text-success fw-semibold" : "nav-link text-dark"}>Liên hệ</NavLink>
                    </Nav>

                    {username ? (
                        <div className="d-flex align-items-center gap-3">
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="success" className="rounded-pill px-4">
                                    {username}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={NavLink} to="/profile">Thông tin cá nhân</Dropdown.Item>
                                    <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            {!wallet && (
                                <ConnectWalletButton />
                            )}
                        </div>
                    ) : (
                        <Button as={NavLink} to="/login" className="rounded-pill px-4 bg-success border-0 text-white">
                            Login
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default memo(Header);
