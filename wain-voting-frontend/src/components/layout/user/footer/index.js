import { memo } from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import './style.css'
const Footer = () => {

  console.log('HomePage Rendered');
  return (
    <footer id="footer" className="footer position-relative bg-light py-5">

      <Container className="footer-top">
        <Row className="gy-4">
          <Col lg={4} md={6} className="footer-about">
            <a href="/" className="logo d-flex align-items-center text-decoration-none">
              <span className="h4 fw-bold">Voting App</span>
            </a>
            <div className="footer-contact pt-3">
              <p>A108 Adam Street</p>
              <p>New York, NY 535022</p>
              <p className="mt-3"><strong>Phone:</strong> <span>0706 768 9422</span></p>
              <p><strong>Email:</strong> <span>vinv.21it@vku.udn.vn</span></p>
            </div>
            <div className="social-links d-flex gap-3 mt-4">
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </Col>

          <Col lg={2} md={3} className="footer-links">
            <h5>Chức năng</h5>
            <ul className="list-unstyled">
              <li><a href="#">Trang chủ</a></li>
              <li><a href="#">Cuộc bình chọn</a></li>
              <li><a href="#">Bình chọn</a></li>
            </ul>
          </Col>

          <Col lg={2} md={3} className="footer-links">
            <h5>Dịch vụ</h5>
            <ul className="list-unstyled">
              <li><a href="#">Bình chọn minh bạch</a></li>
              <li><a href="#">Tạo bình chọn theo yêu cầu</a></li>

            </ul>
          </Col>

          <Col lg={4} md={12} className="footer-newsletter">
            <h5>Email</h5>
            <p>Bạn muốn hỗ trợ!</p>
            <Form>
              <InputGroup className="mb-3">
                <Form.Control type="email" placeholder="Your email" />
                <Button variant="success" type="submit">Gửi Email</Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>

    </footer>
  );
}
export default memo(Footer);