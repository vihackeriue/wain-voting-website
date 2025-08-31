import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Card, Table, Image, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { zeroPadValue } from 'ethers';
import { contractAbi, contractAddress } from '../../../constrants/constrant';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BrowserProvider } from 'ethers';
import { Contract } from 'ethers';
import request from '../../../utils/request';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const COLORS = ['#6366f1', '#f43f5e', '#10b981']; // tím, đỏ, xanh lá

const AdminPollDetailPage = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState(null);
    const [pollResult, setPollResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleShow = (candidate) => {
        setSelectedCandidate(candidate);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedCandidate(null);
    };

    const fetchPoll = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await request.get(`/poll/${id}`);
            setPoll(res.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Không thể lấy dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const fetchPollResultFromBlockchain = async () => {
        try {
            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new Contract(contractAddress, contractAbi, provider);

            const bytesPollId = zeroPadValue(poll.chainId, 32);
            console.log("bytesPollId", bytesPollId);
            const result = await contract.getPollResult(bytesPollId);

            const [winnerId, highestVoteCount, totalVotes, candidateIds, voteCounts] = result;


            setPollResult({
                winnerId,
                highestVoteCount: Number(highestVoteCount),
                totalVotes: Number(totalVotes),
                candidates: candidateIds.map((cId, idx) => ({
                    id: cId,
                    voteCount: Number(voteCounts[idx])
                }))
            });

        } catch (err) {
            console.error(err);
            setError('Lỗi khi lấy kết quả bình chọn từ blockchain');
        }
    };

    useEffect(() => {
        fetchPoll();
    }, [id]);

    useEffect(() => {
        if (poll) {
            fetchPollResultFromBlockchain();
        }
    }, [poll]);

    if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger" className="my-4 text-center">{error}</Alert>;
    if (!pollResult) return null;
    console.log("pollResult", pollResult);
    // Mapping dữ liệu
    const candidatesWithVotes = poll.candidates.map(c => {
        const found = pollResult.candidates.find(r => r.id === c.chainId);
        return {
            ...c,
            voteCount: found ? found.voteCount : 0
        };
    }).sort((a, b) => b.voteCount - a.voteCount);

    const topCandidates = candidatesWithVotes.slice(0, 3);

    const pieChartData = topCandidates.map(c => ({
        name: c.name,
        value: pollResult.totalVotes === 0 ? 0 : (c.voteCount / pollResult.totalVotes) * 100
    }));

    const barChartData = {
        labels: candidatesWithVotes.map(c => c.name),
        datasets: [
            {
                label: 'Số lượt bình chọn',
                data: candidatesWithVotes.map(c => c.voteCount),
                backgroundColor: 'rgba(66, 133, 244, 0.6)',
                borderRadius: 4,
                barThickness: 30,
            },
        ],
    };

    return (
        <>
            {/* Section thông tin Poll */}
            <section className="about section py-5">
                <Container>
                    <Row className="align-items-center gy-4">
                        <Col lg={6} className="order-1 order-lg-2">
                            <img
                                src={poll.urlImage}
                                className="img-fluid rounded"
                                alt={poll.title}
                            />
                        </Col>
                        <Col lg={6} className="order-2 order-lg-1">
                            <h3 className="fw-bold" style={{ fontSize: '1.75rem' }}>{poll.title}</h3>
                            <p className="fst-italic text-muted">{poll.description}</p>
                            <ul className="list-unstyled">
                                <li><strong>Thời gian bắt đầu:</strong> {new Date(poll.startTime).toLocaleString()}</li>
                                <li><strong>Thời gian kết thúc:</strong> {new Date(poll.endTime).toLocaleString()}</li>
                                {/* <li><strong>Chain ID:</strong> {poll.chainId}</li> */}
                                <li><strong>Trạng thái:</strong> {poll.status === 1 ? "Công khai" : "Riêng tư"}</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Section người thắng cuộc và top 3 */}
            <Row className="gy-4">
                <Col lg={6}>
                    <Card className="shadow-sm h-100">
                        <Card.Body className="text-center">
                            <Card.Title className="fw-bold">
                                {new Date(poll.endTime) < new Date()
                                    ? 'NGƯỜI THẮNG CUỘC'
                                    : 'NGƯỜI ĐANG DẪN ĐẦU'}
                            </Card.Title>
                            {topCandidates[0] && (
                                <>
                                    <img
                                        src={topCandidates[0].urlImage}
                                        alt={topCandidates[0].name}
                                        className="rounded-circle my-3"
                                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                    />
                                    <h5 className="fw-bold">{topCandidates[0].name}</h5>
                                    <p className="text-muted">
                                        Tỷ lệ bình chọn: {pollResult.totalVotes === 0 ? 0 : ((topCandidates[0].voteCount / pollResult.totalVotes) * 100).toFixed(1)}%
                                    </p>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card className="shadow-sm h-100">
                        <Card.Body>
                            <Card.Title className="fw-bold">TOP 3 ỨNG VIÊN</Card.Title>
                            <div style={{ width: '100%', height: 250 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={pieChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                                        >
                                            {pieChartData.map((_, idx) => (
                                                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <ListGroup variant="flush" className="mt-3">
                                {topCandidates.map((c, idx) => (
                                    <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                                        <span>
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: 12,
                                                    height: 12,
                                                    backgroundColor: COLORS[idx % COLORS.length],
                                                    borderRadius: '50%',
                                                    marginRight: 8
                                                }}
                                            ></span>
                                            {c.name}
                                        </span>
                                        <b>{pollResult.totalVotes === 0 ? 0 : ((c.voteCount / pollResult.totalVotes) * 100).toFixed(1)}%</b>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Section Tasks Overview */}
            <Card className="shadow-sm my-4">
                <Card.Body>
                    <h6 className="mb-3 text-muted fw-bold">TỔNG QUAN ỨNG VIÊN</h6>
                    <div style={{ height: `${poll.candidates.length <= 5 ? 300 : poll.candidates.length * 60}px` }}>
                        <Bar data={barChartData} options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: { enabled: true },
                            },
                            scales: {
                                x: { grid: { display: false }, ticks: { font: { size: 12 } } },
                                y: { beginAtZero: true, grid: { color: '#f0f0f0' }, ticks: { stepSize: 1 } },
                            },
                        }} />
                    </div>
                </Card.Body>
            </Card>

            {/* Section danh sách ứng viên */}
            <section className="py-5" id="candidates">
                <Container>
                    <h2 className="mb-4 text-center"><b>Danh sách các ứng viên</b></h2>
                    <Table bordered hover responsive className="align-middle">
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '80px' }}></th>
                                <th>Họ tên</th>
                                <th>Mô tả</th>
                                <th className="text-center">Số lượt Bình chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidatesWithVotes.map((c) => (
                                <tr key={c.id}>
                                    <td className="text-center">
                                        <Image src={c.urlImage} alt={c.name} roundedCircle width={50} height={50} style={{ objectFit: 'cover' }} />
                                    </td>
                                    <td>{c.name}</td>
                                    <td className="text-muted small">{c.description || 'Không có mô tả'}</td>
                                    <td className="text-center">{c.voteCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </section>
        </>
    );
};

export default AdminPollDetailPage;
