import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useCreateHeadProfile, useGetHeadProfile } from "../hooks/HeadProfile"
import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import { useMetaMask } from 'metamask-react';
import { bindActionCreators } from "redux";


export default function ProfilePage(){
    const [status, setStatus] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email , setEmail] = useState("");
    
    const { account } = useMetaMask();
    //const { loading, success, error, send } = useCreateHeadProfile();
    const { send,loading, success, error } = useCreateHeadProfile(account!);
    const { user } = useGetHeadProfile();

    // useEffect(()=>{

    //     if(loading){
    //         setStatus("loading...");
    //     }
        
    //     if(success){
    //         setStatus("Succeed.");
    //     }

    // },[success, loading])
    
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
                <Row className="d-flex justify-content-center align-items-center">
                    <Col lg="8">
                        <Card className='my-5 rounded-3'>
                            <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp" className="w-100 rounded-top"/>
                            <Card.Body className="px-5">
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Create Profile</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Card.Body>
                </Card>
                </Col>
                </Row>
            
            </>
        );
    }

    


 
    return (
        <Container fluid>
            {user.userId == 0 && renderCreateProfileForm()}
            <p>{status}</p>
            {user.userId != 0 && <p>{user!.displayName}</p>}
            {loading && <p>Creating profile...</p>}
            {success && <p>Profile created.</p>}
            {error && <div><p>Something went wrong..</p><p>{error}</p></div>}
        </Container>
    )
}