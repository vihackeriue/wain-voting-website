import { memo, useEffect, useState } from 'react';
import { Navbar, Container, Dropdown } from 'react-bootstrap';

import './style.css';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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

    const handleProfile = () => {
        // Chuyển hướng hoặc xử lý khi nhấn tài khoản
        console.log("Redirect to profile...");
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




    console.log('HomePage Rendered');
    return (
        <>
            <Navbar bg="light" expand="lg" className="shadow-sm">
                <Container fluid className="justify-content-end d-flex align-items-center gap-3">
                    {!wallet && (
                        <ConnectWalletButton />
                    )}
                    <Dropdown>
                        <Dropdown.Toggle variant="light" className="d-flex align-items-center">
                            <FaUserCircle size={40} className="me-2 text-black" />
                            <div className="text-start">
                                <div className="fw-bold">{username}</div>
                                <div className="text-muted small">[ROLE_MANAGER]</div>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                            <Dropdown.Item href="#/profile">👤 Thông tin cá nhân</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout}>🚪 Đăng xuất</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </>

    );
}
export default memo(Header);