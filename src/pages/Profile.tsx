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
                <p className="fs-1 text-center">Your Profile</p>
                <Row>
                    <Col xs={2} className="text-end fw-bold">Display Name</Col>
                    <Col className="mb-3 text-start">{user!.displayName}</Col>
                </Row>
                <Row>
                    <Col xs={2} className="text-end fw-bold">Email</Col>
                    <Col className="mb-3 text-start">{user!.email} {user!.isEmailVerified && <Badge bg="success">Success</Badge>}</Col>
                </Row>
                {!user!.isEmailVerified && <Button>Go to verify</Button>}
            </>
        )
    }

    return (
        <>
            <div className="App">
            <Container fluid="md">
                {user!.userId!=0 && renderProfile()}
                {user!.userId==0 && <Button onClick={()=>history("create") } >Create Profile</Button>}
            </Container>
            </div>
        </>
    )
}