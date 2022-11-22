import { Button, Card, Col, Container, Form, Row, Spinner, Alert, Badge } from "react-bootstrap"
import { useCreateHeadProfile, useGetHeadProfile } from "../hooks/HeadProfile"
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BigNumber } from "ethers";
import { useMetaMask } from 'metamask-react';
import { bindActionCreators } from "redux";




export default function ProfilePage(){
    const { account } = useMetaMask();
    //const { loading, success, error, send } = useCreateHeadProfile();
    const { user } = useGetHeadProfile();
    const history = useNavigate();


    const renderProfile = () => {
        return (
            <>
                <Row>
                    <Col className="mt-5"><p className="fs-2 text-dark bg-light">Your Profile</p></Col>
                    
                </Row>
                <Row>
                    <Col xs={2}></Col>
                    <Col className="mt-3 text-start fw-bold">{user!.displayName}</Col>
                    <Col xs={2}></Col>
                </Row>
                <Row>
                    <Col xs={2}></Col>
                    <Col className="mt-3 text-start fw-bold">{user!.email} {user!.isEmailVerified && <Badge bg="success">Verified</Badge>}</Col>
                    <Col xs={2}></Col>
                </Row>
                <Row>
                    <Col xs={12} lg={12} className="mt-5">
                        <div className="d-grid gap-2">
                        {!user!.isEmailVerified && <Button size="lg" onClick={()=> history("verify")}>Go to verify</Button>}
                        </div>
                    </Col>
                    
                </Row>
                
            </>
        )
    }

    const renderGoToCreate = () => {
        return (
            <>
                <Row><Col lg={12} xs={12} className="mt-5"></Col></Row>
                <Row>
                    <Col lg={12} xs={12} >
                        <Alert key="info" variant="info">
                            You haven't created your profile.
                            Click <Alert.Link href="#" onClick={()=>history("create")}>here</Alert.Link> to create a new one
                        </Alert></Col>
                </Row>
                <Row>
                     <Col lg={12} xs={12} className="text-start">Why should I create a profile?</Col>
                </Row>
            </>
        )
    }

    return (
        <>
            <div className="App">
            <Container fluid="md">
                {user!.userId!=0 && renderProfile()}
                {user!.userId==0 && renderGoToCreate()}
            </Container>
            </div>
        </>
    )
}