import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {

    const style ={
        backgroundColor: 'black',
        color: 'white'
    }
  
    return (
        <Container fluid style={style}>
         <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
      </Container>
           
    )
}

export default Footer;