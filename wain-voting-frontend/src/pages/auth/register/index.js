import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './style.css'; // used to retain the full screen layout
import { register } from '../../../service/authService';
import CustomAlert from '../../../components/alert/alert';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: ''
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success'); // success, danger, etc.

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullName, email, phone, password } = formData;

        try {
            const response = await register({
                username: fullName, // assuming 'username' is the full name here
                password: password,
                email: email,
                phone: phone
            });

            if (response) {
                setAlertMessage('Đăng ký thành công!');
                setAlertType('success');
                setShowAlert(true);
                setTimeout(() => navigate('/login'), 3000); // Navigate after the alert
            } else {
                setAlertMessage('Có lỗi xảy ra, vui lòng thử lại.');
                setAlertType('danger');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
            setAlertType('danger');
            setShowAlert(true);
        }
    };

    return (
        <div className="login-page vh-100 vw-100 d-flex align-items-center justify-content-center m-0 p-0">
            <Container fluid className="g-0">
                <Row className="g-0 w-100 h-100">
                    {/* Form đăng ký */}
                    <Col md={4} className="bg-white p-5 d-flex flex-column justify-content-center">
                        <div className="text-start mb-4">
                            <h4 className="fw-bold">ĐĂNG KÝ</h4>
                            <p className="text-muted mb-4">
                                Đăng ký tài khoản để sử dụng hệ thống
                            </p>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formFullName">
                                <Form.Label>Tên đầy đủ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Nhập tên đăng nhập"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Nhập email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Nhập số điện thoại"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Nhập mật khẩu"
                                />
                            </Form.Group>

                            <Button variant="success" type="submit" className="w-100">
                                <i className="bi bi-person-plus-fill me-2"></i> Tạo tài khoản
                            </Button>
                        </Form>

                        <div className="text-center mt-4">
                            <p className="small text-muted">
                                Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                            </p>
                        </div>
                    </Col>

                    {/* Ảnh bên phải */}
                    <Col
                        md={8}
                        className="d-none d-md-flex align-items-center justify-content-center"
                        style={{
                            backgroundImage: 'url(https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: '100vh'
                        }}
                    >
                        <div className="text-white text-center px-4">
                            <h4 className="fw-bold">Chào mừng bạn đến với website!</h4>
                            <p className="fst-italic">
                                “Hệ thống Bình chọn minh bạch”<br />
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Custom Alert Notification */}
            <CustomAlert
                message={alertMessage}
                type={alertType}
                show={showAlert}
                handleClose={() => setShowAlert(false)}
            />
        </div>
    );
};

export default RegisterPage;
