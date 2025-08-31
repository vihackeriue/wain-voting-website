import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Login } from "../../../service/authService";
import { getUserRole } from "../../../utils/jwt";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await Login({
        username,
        password,
      });

      const { data } = response;

      // Lưu token và thông tin vào localStorage hoặc context
      localStorage.setItem("token", data.token);

      // Điều hướng tuỳ theo vai trò
      const role = getUserRole();
      if (role === "ROLE_ADMIN") {
        navigate("/manager/home");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
    }
  };

  return (
    <div className="login-page vh-100 vw-100 d-flex align-items-center justify-content-center m-0 p-0">
      <Container fluid className="g-0">
        <Row className="g-0 w-100 h-100">
          {/* Cột trái: Form đăng nhập */}
          <Col
            md={4}
            className="bg-white p-5 d-flex flex-column justify-content-center"
          >
            <div className="text-start mb-4">
              {/* <img src="/logo.png" alt="Logo" style={{ height: 30 }} className="mb-3" /> */}
              <h4 className="fw-bold">ĐĂNG NHẬP</h4>
              <p className="text-muted mb-4">
                Nhập tên đăng nhập và mật khẩu để vào hệ thống
              </p>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Tên đăng nhập</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Check
                className="mb-3"
                type="checkbox"
                label="Remember me"
              />

              <Button variant="success" type="submit" className="w-100">
                <i className="bi bi-box-arrow-in-right me-2"></i> Đăng nhập
              </Button>
            </Form>

            <div className="text-center mt-4">
              <p className="text-muted mb-2">Đăng nhập với</p>
              <div className="d-flex justify-content-center gap-3">
                <i className="bi bi-google fs-4 text-danger"></i>
                <i className="bi bi-facebook fs-4 text-primary"></i>
                <i className="bi bi-twitter fs-4 text-info"></i>
                <i className="bi bi-github fs-4"></i>
              </div>
            </div>
            <div>
              <a href="#" className="float-end small">
                Quên mật khẩu?
              </a>
            </div>
            <div className="text-center mt-4">
              <p className="small text-muted">
                Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
              </p>
            </div>
          </Col>

          {/* Cột phải: Ảnh + Quote */}
          <Col
            md={8}
            className="d-none d-md-flex align-items-center justify-content-center"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100vh",
            }}
          >
            <div className="text-white text-center px-4">
              <h4 className="fw-bold">Chào mừng bạn đến với website!</h4>
              <p className="fst-italic">
                “Hệ thống Bình chọn minh bạch”
                <br />
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
