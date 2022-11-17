import { Button, Card, Col, Container, Form, Row, Spinner, Alert, Badge } from "react-bootstrap"
import { useCreateHeadProfile, useGetHeadProfile } from "../hooks/HeadProfile"
import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import { useMetaMask } from 'metamask-react';
import { bindActionCreators } from "redux";


export default function ProfilePage(){
    const [status, setStatus] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email , setEmail] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    
    const { account } = useMetaMask();
    //const { loading, success, error, send } = useCreateHeadProfile();
    const { send,loading, success, error } = useCreateHeadProfile(account!);
    const { user } = useGetHeadProfile();

    useEffect(()=>{

        if(success && !showAlert && !alertShown){
            setShowAlert(true);
            setAlertShown(true);
        }

    },[success])
    
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
        // await send([BigNumber.from(0),
        //     1,account,"Bevis Lin","bevis.tw@gmail.com",false,BigNumber.from("1655445559"),0]);
        send(profile);

    }


    const renderCreateProfileForm = () => {
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
                <Alert show={showAlert} variant="success">
                    <Alert.Heading>Profile created!</Alert.Heading>
                    <p>
                        We've sent you a confirmation email which contains a verification code , 
                        please use the code to verify your email address.
                    </p>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => {setShowAlert(false)}} variant="outline-success">
                            OK
                        </Button>
                    </div>
                </Alert>
            </>
        );
    }

    const renderProfile = () => {
        return (
            <>
                <Row>
                    <Col xs={4}></Col>
                    <Col>
                        <p className="fs-1 text-start">Your Profile</p>
                        <p className="fs-3 text-start">{user!.displayName}</p>
                        <p className="fs-3 text-start">{user!.email} {user!.isEmailVerified && <Badge bg="success">Success</Badge>}</p>
                    </Col>
                    <Col xs={4}></Col>
                </Row>
                <Row>
                    <Col xs={4}></Col>
                    <Col className="text-start">{!user!.isEmailVerified && <Button>Verify Your Email</Button>}</Col>
                    <Col xs={4}></Col>
                </Row>
            </>
        )
    }

    


 
    return (
        <div className="App">
        <Container fluid="md">
            {user.userId == 0 && renderCreateProfileForm()}
            <p>{status}</p>
            {user.userId != 0 && renderProfile()}
            {success && <p>Profile created.</p>}
            {error && <div><p>Something went wrong..</p><p>{error}</p></div>}
        </Container>
        </div>
    )
}