import React from 'react';
import { Button } from 'react-bootstrap';

const getStatusVariant = (status) => {
    switch (status) {
        case 'Chưa diễn ra':
            return 'secondary';
        case 'Đang diễn ra':
            return 'success';
        case 'Đã kết thúc':
            return 'danger';
        default:
            return 'light';
    }
};

const PollCard = ({ id, img, title, status, desc, onClick }) => {
    return (
        <div
            className="shadow rounded overflow-hidden bg-white"
            onClick={onClick}
            style={{ cursor: 'pointer', transition: '0.3s', border: '1px solid #eee' }}
        >
            <div style={{ height: '300px', overflow: 'hidden' }}>
                <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="p-4">
                <h5
                    className="fw-bold mb-2"
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </h5>

                <Button
                    variant={getStatusVariant(status)}
                    size="sm"
                    disabled
                    style={{
                        pointerEvents: 'none',
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        marginBottom: '10px',
                    }}
                >
                    {status}
                </Button>

                <p
                    className="mb-0 text-muted"
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: '0.9rem',
                    }}
                >
                    {desc}
                </p>
            </div>
        </div>
    );
};

export default PollCard;
