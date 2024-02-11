import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <Container fluid className={styles.footerContainer}>
            <Row className='text-center border-0 mt-auto'>
                <Col>Copyright © WaiterApp 2024</Col>
            </Row>
        </Container>
    );
};

export default Footer;