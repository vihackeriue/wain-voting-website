import React, { memo, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PollCard from '../../../components/card/PollCard';
import { BsBarChart, BsClock, BsPlayCircle, BsCheckCircle } from 'react-icons/bs';
import request from '../../../utils/request';


const AdminPollListPage = () => {
    const navigate = useNavigate();
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPolls = async (pageNum) => {
        setLoading(true);
        setError(null);
        try {
            const response = await request.get('/poll/get-all-without-candidate', {
                params: {
                    page: pageNum,
                    size: 6,
                },
            });
            const data = response.data;

            setPolls(data.content);
            setTotalPages(data.page.totalPages);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Lỗi khi gọi API');
            setPolls([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolls(page);
    }, [page]);

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };

    const getStatusText = (startTime, endTime) => {
        const now = new Date();
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (now < start) return 'Chưa diễn ra';
        if (now >= start && now <= end) return 'Đang diễn ra';
        return 'Đã kết thúc';
    };

    const stats = [
        { icon: <BsBarChart size={24} />, value: 5, label: 'Tổng số cuộc bình chọn đã tạo', color: '#0d6efd' },
        { icon: <BsClock size={24} />, value: 1, label: 'Sắp diễn ra', color: '#fd7e14' },
        { icon: <BsPlayCircle size={24} />, value: 3, label: 'Đang diễn ra', color: '#198754' },
        { icon: <BsCheckCircle size={24} />, value: 1, label: 'Đã kết thúc', color: '#6f42c1' }
    ];


    return (
        <>
            <Container className="py-5" >
                <section className="py-4 bg-light">
                    <Container>
                        <Row className="g-0 bg-white border rounded shadow-sm text-center">
                            {stats.map((item, idx) => (
                                <Col
                                    key={idx}
                                    md={3}
                                    sm={6}
                                    xs={12}
                                    className={`p-4 d-flex flex-column align-items-center justify-content-center border-end ${idx === stats.length - 1 ? 'border-end-0' : ''
                                        }`}
                                >
                                    <div className="mb-2" style={{ color: item.color }}>
                                        {item.icon}
                                    </div>
                                    <h5 className="fw-bold mb-1">{item.value} {item.up && <span className="text-success">↑</span>}</h5>
                                    <div className="fw-semibold text-dark">{item.label}</div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
                <h3 className="mb-4">Danh sách cuộc bình chọn</h3>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : error ? (
                    <Alert variant="danger">Lỗi: {error}</Alert>
                ) : (
                    <>
                        <Row className="gy-4">
                            {polls.map((poll) => {
                                const status = getStatusText(poll.startTime, poll.endTime);
                                return (
                                    <Col key={poll.id} lg={4} md={6}>
                                        <PollCard
                                            id={poll.id}
                                            img={poll.urlImage}
                                            title={poll.title}

                                            desc={poll.description}
                                            status={status} // Nếu cần truyền vào trong PollCard
                                            onClick={() => navigate(`/manager/poll-detail/${poll.id}`)}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                        <div className="d-flex justify-content-between mt-4">
                            <Button onClick={handlePrev} disabled={page === 0}>
                                Trang trước
                            </Button>
                            <span>Trang {page + 1} / {totalPages}</span>
                            <Button onClick={handleNext} disabled={page >= totalPages - 1}>
                                Trang sau
                            </Button>
                        </div>
                    </>
                )}
            </Container>
        </>

    );
};

export default memo(AdminPollListPage);
