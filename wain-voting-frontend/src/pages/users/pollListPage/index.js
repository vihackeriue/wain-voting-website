import React, { memo, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PollCard from '../../../components/card/PollCard';
import request from '../../../utils/request';


const PollListPage = () => {
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

            // Giả sử cấu trúc data từ axios là response.data
            const data = response.data;

            setPolls(data.content);
            // Nếu data.page.totalPages đúng như backend trả về
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

    return (
        <Container className="py-5">
            <h2 className="mb-4">Danh sách cuộc bình chọn</h2>
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
                                        onClick={() => navigate(`/poll-detail/${poll.id}`)}
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
    );
};

export default memo(PollListPage);
