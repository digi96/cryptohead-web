import { Button, Card, Col, Container, Form, Row, Spinner, Alert, Badge } from "react-bootstrap"
import { useCreateHeadProfile, useGetHeadProfile } from "../hooks/HeadProfile"
import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import { useMetaMask } from 'metamask-react';
import { bindActionCreators } from "redux";


export default function CreateProfilePage() {
  const [displayName, setDisplayName] = useState("");
  const [email , setEmail] = useState("");
  const { account } = useMetaMask();
  const { send, loading, success , error } = useCreateHeadProfile(account!);
  const { user } = useGetHeadProfile();

  
  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const profile: HeadProfileCreation = {
        userId: 0,
        userType: 1,
        userAddress: account!,
        displayName: displayName,
        email: email,
        isEmailVerified: false,
        lastUpdate: new Date().getTime().toString(),
        emailVerifyNumber: 0,
      };
    send(profile).then(()=>{
        console.log("create complete...");
        
    });

  }
  
  const renderProfileCreationForm = () => {
    return (
      <>
        <p className="fs-1 text-center">Create Profile</p>
        <Form onSubmit={handleSubmit}>
            <Row >
                <Col xs={2} className="text-end fw-bold">Name</Col>
              
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={displayName} placeholder="Joseph Lin" onChange={(e) => setDisplayName(e.target.value)}/>
                    </Form.Group>    
                </Col>
                
            </Row>
            <Row>
                <Col xs={2} className="text-end fw-bold">Email</Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" value={email} placeholder="joseph@example.com" onChange={(e)=> setEmail(e.target.value)}/>
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
          {user!.userId==0 && renderProfileCreationForm()}
          <Alert show={success} variant="success" className="mt-5">
            <Alert.Heading>Your profile has been created!</Alert.Heading>
            <Button className="mt-3">verify your email</Button>
          </Alert>
      </Container>
      </div>
    </>
  )

}