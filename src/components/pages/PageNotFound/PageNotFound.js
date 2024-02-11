import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ButtonTable from '../../common/ButtonTable/ButtonTable';


const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className='mt-5'>
        <Col md={{ span: 6, offset: 3 }} className="text-center mt-5">
          <h1 className="text-outline mt-5">404</h1>
          <h2 className="text-outline mt-5">Page Not Found</h2>
          <p className="fs-3 text-outline mt-5">We're sorry, the page you are looking for does not exist, has been removed, name changed, or is temporarily unavailable.</p>
          <ButtonTable className="mt-5" onClick={() => navigate('/')}>Go Back to Homepage</ButtonTable>
        </Col>

      </Row>
    </Container>
  );
};

export default PageNotFound;