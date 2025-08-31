import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';


const candidates = [
    {
        img: 'https://randomuser.me/api/portraits/men/32.jpg',
        name: 'Walter White',
        role: 'Business',
        desc: 'Aliquam iure quaerat voluptatem praesentium possimus unde laudantium vel dolorum distinctio dire flow'
    },
    {
        img: 'https://randomuser.me/api/portraits/women/45.jpg',
        name: 'Sarah Jhonson',
        role: 'Marketing',
        desc: 'Labore ipsam sit consequatur exercitationem rerum laborum laudantium aut quod dolores exercitationem ut'
    },
    {
        img: 'https://randomuser.me/api/portraits/men/46.jpg',
        name: 'William Anderson',
        role: 'Maths',
        desc: 'Illum minima ea autem doloremque ipsum quidem quas aspernatur modi ut praesentium vel tque sed facilis at qui'
    },
    {
        img: 'https://randomuser.me/api/portraits/women/24.jpg',
        name: 'Amanda Jepson',
        role: 'Science',
        desc: 'Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur est laborum'
    },
    {
        img: 'https://randomuser.me/api/portraits/women/24.jpg',
        name: 'Amanda Jepson',
        role: 'Science',
        desc: 'Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur est laborum'
    }
];

const CandidateSection = () => {
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

    return (
        <section className="py-5" id="candidates">
            <Container>
                <Row className="gy-5">
                    {candidates.map((c, idx) => (
                        <Col md={6} lg={4} key={idx} className="text-center">
                            <div className="candidate-box position-relative">
                                <div className="candidate-image-wrapper">
                                    <img src={c.img} alt={c.name} className="img-fluid rounded-circle candidate-img" />
                                    <button className="vote-button" onClick={() => handleShow(c)}>Chi tiết</button>
                                </div>
                                <h5 className="mt-3 mb-1 fw-bold">{c.name}</h5>
                                <p className="fst-italic text-muted">{c.role}</p>
                            </div>
                        </Col>
                    ))}
                </Row>

                {/* Modal hiển thị chi tiết ứng viên */}
                <Modal show={show} onHide={handleClose} centered>
                    {selectedCandidate && (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>{selectedCandidate.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <img
                                    src={selectedCandidate.img}
                                    alt={selectedCandidate.name}
                                    className="rounded-circle mb-3"
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                />
                                <p className="text-muted fst-italic">{selectedCandidate.role}</p>
                                <p>{selectedCandidate.desc}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={() => alert(`Bạn đã bình chọn cho ${selectedCandidate.name}`)}>
                                    Bình chọn
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </>
                    )}
                </Modal>
            </Container>
        </section>
    );
};

export default CandidateSection;
