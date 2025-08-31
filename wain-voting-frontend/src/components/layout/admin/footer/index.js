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
              <span className="h4 fw-bold">Mentor</span>
            </a>
            <div className="footer-contact pt-3">
              <p>A108 Adam Street</p>
              <p>New York, NY 535022</p>
              <p className="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
              <p><strong>Email:</strong> <span>info@example.com</span></p>
            </div>
            <div className="social-links d-flex gap-3 mt-4">
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </Col>

          <Col lg={2} md={3} className="footer-links">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </Col>

          <Col lg={2} md={3} className="footer-links">
            <h5>Our Services</h5>
            <ul className="list-unstyled">
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Product Management</a></li>
              <li><a href="#">Marketing</a></li>
              <li><a href="#">Graphic Design</a></li>
            </ul>
          </Col>

          <Col lg={4} md={12} className="footer-newsletter">
            <h5>Our Newsletter</h5>
            <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
            <Form>
              <InputGroup className="mb-3">
                <Form.Control type="email" placeholder="Your email" />
                <Button variant="success" type="submit">Subscribe</Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>

    </footer>
    );
}
export default memo(Footer);