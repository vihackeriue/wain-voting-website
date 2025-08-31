import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PollCard from './card/PollCard';

const PollListSections = ({ data }) => (
  <Row className="gy-4">
    {data.map((item, idx) => (
      <Col key={idx} lg={4} md={6}>
        <PollCard {...item} />
      </Col>
    ))}
  </Row>
);

export default PollListSections;
