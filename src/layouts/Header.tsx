import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AccountNav from '../components/AccountNav';
//import NavDropdown from 'react-bootstrap/NavDropdown';



function Header() {
    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">CryptoHead</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Card</Nav.Link>
            <Nav.Link href="#pricing">Store</Nav.Link>
          </Nav>
          <Nav>
            <AccountNav/>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>)
}

export default Header;