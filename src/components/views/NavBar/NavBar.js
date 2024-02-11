import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import RadioPlayer from '../../features/RadioPlayer/RadioPlayer';

const NavBar = () => {
  return (
    <Navbar variant="outline-success" className="align-items-center">
      <Container>
        <Navbar.Brand className="text-light fs-4">Fjellheim</Navbar.Brand>
        <Nav className='ms-auto d-flex align-items-center'>
          <RadioPlayer />
          <Nav.Link
            className="text-light p-3 fs-4 text-outline"
            as={NavLink}
            to='/'
          >
            Home
          </Nav.Link>
          <Nav.Link
            className="text-light p-3 fs-4 text-outline"
            href='https://github.com/jerzyszajner'
            target="_blank"
            rel="noopener noreferrer">
            About
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;