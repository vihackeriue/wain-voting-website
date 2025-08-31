import { memo, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Make sure to import Row and Col
import './style.css';
import PollListSections from '../../../components/pollListSections';
import Slider from 'react-slick';
import CandidateSection from '../../../components/CandidateSection';
import { Link, useNavigate } from 'react-router-dom';
import PollCard from '../../../components/card/PollCard';
import request from '../../../utils/request';


const HomePage = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await request.get('/poll/get-all-without-candidate');
        setPolls(response.data.content);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Lỗi khi gọi API');
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);


  const getStatusText = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) return 'Chưa diễn ra';
    if (now >= start && now <= end) return 'Đang diễn ra';
    return 'Đã kết thúc';
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <>
      <section id="hero" className="hero d-flex align-items-center">
        <div className="container text-center">
          <h1 className="fw-bold mb-3" data-aos="fade-up" data-aos-delay="100">
            Voting App<br />
          </h1>
          <p className="lead mb-4" data-aos="fade-up" data-aos-delay="200">
            “Hệ thống Bình chọn minh bạch”
          </p>

        </div>
      </section>


      <section id="about" className="about section py-5">
        <Container>
          <Row className="align-items-center gy-4">
            {/* Hình ảnh bên phải */}
            <Col lg={6} className="order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
              <img
                src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
                className="img-fluid rounded"
                alt="Blockchain Voting"
              />
            </Col>

            {/* Nội dung bên trái */}
            <Col lg={6} className="order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h3 className="fw-bold" style={{ fontSize: '1.75rem' }}>
                Nền tảng bình chọn minh bạch ứng dụng Blockchain
              </h3>
              <p className="fst-italic text-muted">
                Hệ thống của chúng tôi đảm bảo mọi lá phiếu được ghi nhận và không thể bị thay đổi, nhờ vào công nghệ Blockchain hiện đại.
              </p>

              {/* Danh sách có icon */}
              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Mọi cuộc bình chọn đều được ghi nhận minh bạch trên hệ thống sổ cái phân tán.
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Không ai có thể chỉnh sửa, xóa bỏ hay gian lận kết quả sau khi đã ghi nhận.
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Người dùng có thể kiểm tra lại lịch sử bình chọn bất kỳ lúc nào, hoàn toàn công khai.
                </li>
              </ul>

              {/* Nút Read More */}
              <a href="#" className="btn btn-success px-4 py-2 rounded-pill d-inline-flex align-items-center">
                <span className="me-2">Tìm hiểu thêm</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </Col>
          </Row>
        </Container>
      </section>


      <Container className="py-5">
        <h2 className="text-center mb-4"><b>Các Cuộc Bình Chọn Nổi Bật</b></h2>
        <Slider {...sliderSettings}>
          {polls.map((poll) => {
            const status = getStatusText(poll.startTime, poll.endTime);
            return (
              <div key={poll.id} className="px-3">
                <PollCard
                  id={poll.id}
                  img={poll.urlImage}
                  title={poll.title}
                  desc={poll.description}
                  status={status}
                  onClick={() => navigate(`/poll-detail/${poll.id}`)}
                />
              </div>
            );
          })}
        </Slider>
      </Container>
      <div className="text-center py-5">
        <Link
          to="/poll-list"
          className="btn btn-outline-success px-4 py-2 rounded-pill d-inline-flex align-items-center"
        >
          <span className="me-2">Xem thêm</span>
          <i className="bi bi-arrow-right-circle"></i>
        </Link>
      </div>

    </>
  );
}

export default memo(HomePage);
