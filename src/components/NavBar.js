import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar expand="md" className={styles.NavBar} fixed="top">
      <Container>
        <Navbar.Brand href="#home">FocusNest</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home"><i className="fa-solid fa-house"></i>Home</Nav.Link>
            <Nav.Link href="#link"><i className="fa-solid fa-door-open"></i>Sign In</Nav.Link>
            <Nav.Link href="#link"><i className="fa-solid fa-user-plus"></i>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;