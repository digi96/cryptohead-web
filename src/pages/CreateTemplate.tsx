import { useState } from "react"
import { Button, Col, Container, Form, Row, Spinner, Alert } from "react-bootstrap";
import { useMetaMask } from "metamask-react";
import { useCreateHeadTemplate } from "../hooks/HeadTemplate";
import { useNavigate } from "react-router-dom";


export default function CreateTemplatePage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [quantity, setQuantity] = useState(0);

    
    const { account } = useMetaMask();
    const { send, loading, success , error } = useCreateHeadTemplate();

    const history = useNavigate();

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        const template: HeadTemplate = {
            templateId: 0,
            title: title,
            description: description,
            imageURL: imageURL,
            quantity: quantity,
            issued: 0,
            owner: account!
        }

        send(template).then(()=>{
            console.log("create template complete...")
        });

    }

    const renderTemplateCreationForm = () => {
        return (
            <>
                <p className="fs-1 text-center">Create Template</p>
                <Form onSubmit={handleSubmit}>
                    <Row >
                        <Col xs={2} className="text-end fw-bold">Title</Col>
              
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" value={title} placeholder="Tiger Coffee Premium" onChange={(e) => setTitle(e.target.value)}/>
                            </Form.Group>    
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col xs={2} className="text-end fw-bold">Description</Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" value={description} placeholder="For coffee afficionado " onChange={(e)=> setDescription(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        
                     </Row>
                     <Row>
                        <Col xs={2} className="text-end fw-bold">Token URI</Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" value={imageURL} placeholder="http://xxx " onChange={(e)=> setImageURL(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        
                     </Row>
                     <Row>
                        <Col xs={2} className="text-end fw-bold">Quantity</Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" value={quantity} placeholder="For coffee afficionado " onChange={(e)=> setQuantity(parseInt(e.target.value))}/>
                            </Form.Group>
                        </Col>
                        
                     </Row>
                     <Row>
                        <Col xs={2}></Col>
                        <Col className="text-end">
                            <Button variant="primary" type="submit">
                                {loading && <div><Spinner  as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"/><span>Loading...</span></div>}

                                {!loading && <span>Submit</span>}
                            </Button>
                        </Col>  
                    </Row>
                </Form>

                {error && <div><p>Something went wrong..</p><p>{error}</p></div>}
            </>
        )
    }

    return (
        <>
            <div className="App">
            <Container fluid="md">
                {account && renderTemplateCreationForm()}
                <Alert show={success} variant="success" className="mt-5">
                    <Alert.Heading>Your template has been created!</Alert.Heading>
                    <Button onClick={()=> history('/templates')}>Back to my template list</Button>
                </Alert>
            </Container>
            </div>
        </>
    )

}