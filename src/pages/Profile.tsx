import { Button, Card, Col, Container, Form, Row, Spinner, Alert, Badge } from "react-bootstrap"
import { useCreateHeadProfile, useGetHeadProfile } from "../hooks/HeadProfile"
import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import { useMetaMask } from 'metamask-react';
import { bindActionCreators } from "redux";


enum profileStatus {
    empty,
    justCreated,
    exists
}


export default function ProfilePage(){
    const [status, setStatus] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email , setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [userProfileStatus, setUserProfileStatus] = useState<profileStatus>(profileStatus.empty);
    const { account } = useMetaMask();
    //const { loading, success, error, send } = useCreateHeadProfile();
    const { send, loading, success: createSuccess, error } = useCreateHeadProfile(account!);
    const { user } = useGetHeadProfile();

    useEffect(()=>{

        if(user.userId!=0){
            setUserProfileStatus(profileStatus.exists);
        }

        if(user.userId==0){
            setUserProfileStatus(profileStatus.empty);
        }


        if(createSuccess){
            console.log('create success...')
            setUserProfileStatus(profileStatus.justCreated);
        }

    },[createSuccess, user])
    
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
        send(profile).then(()=>{
            if(createSuccess){
                setShowAlert(true);
            }
        });

    }


    function CreateProfileForm () {
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
                
            </>
        );
    }

    function ProfileInfo () {
        return (
            <>
                <p className="fs-1 text-center">Your Profile</p>
                <Row>
                    <Col xs={2} className="text-end fw-bold">Display Name</Col>
                    <Col className="mb-3 text-start">{user!.displayName}</Col>
                </Row>
                <Row>
                    <Col xs={2} className="text-end fw-bold">Email</Col>
                    <Col className="mb-3 text-start">{user!.email} {user!.isEmailVerified && <Badge bg="success">Success</Badge>}</Col>
                </Row>
                {!user!.isEmailVerified && <VerificationForm/>}
            </>
        )
    }

    function VerificationForm() {
        return(
        <>
            <Form>
            <Row>
                <Col xs={2} className="text-end fw-bold">Verification Code</Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={verificationCode} placeholder="123456"
                        onChange={(e)=>{setVerificationCode(e.target.value)}}></Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={2}></Col>
                <Col className="text-end">
                    <Button variant="primary" type="submit">
                        Verify
                    </Button>
                </Col>
            </Row>
            </Form>
        </>);
    }

    function ProfileCreatedAlert() {
        return (
            <>
                <Alert show={showAlert} variant="success">
                    <Alert.Heading>Your profile has been created!</Alert.Heading>
                </Alert>
            </>
        )
    }

   
    
    const renderContent = () => {
        if(userProfileStatus == profileStatus.empty){
            return <CreateProfileForm/>
        }else if(userProfileStatus == profileStatus.justCreated){
            return (<div><ProfileCreatedAlert/><ProfileInfo/></div>)
        }else if(userProfileStatus == profileStatus.exists){
            return <ProfileInfo/>
        }    
    }
   


 
    return (
        <div className="App">
        <Container fluid="md">
            <p>{status}</p>
            {renderContent()}
            {error && <div><p>Something went wrong..</p><p>{error}</p></div>}
        </Container>
        </div>
    )
}