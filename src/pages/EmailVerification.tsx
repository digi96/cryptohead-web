import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Alert, Form } from "react-bootstrap"
import { useEmailVerification, processTypeList } from "../hooks/HeadProfile";

export default function EmailVerificationPage() {
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [showVerifyAlert, setShowVerifyAlert] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isShowStatus, setIsShowStatus] = useState<boolean>(false);
  const {processType, sendRequest, verify, loading, 
    success, error } = useEmailVerification();

  const history = useNavigate();

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setShowVerifyAlert(false);

    verify(verificationCode).then(()=>{
      console.log("verify process end.")
    });
    
  }

  

  useEffect(()=>{
    if(processType == processTypeList.RequestCode){
      setIsCodeSent(success);
    }

    if(processType == processTypeList.VerifyCode){
      setIsVerified(success);
      setShowVerifyAlert(!success);
    }

    if(error){
      setIsShowStatus(true);
      setStatus(error.message);
    }else{
      setIsShowStatus(false);
      setStatus("");
    }

  },[success, loading, error])

  return (
    <>
      {!isCodeSent && <>
        <Row>
          <Col></Col>
          <Col xs={10} className="text-center mt-5"><p className="fs-2">Your Email</p></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={12} className="text-center mt-3"><p className="fs-3 bg-light text-dark">bevis.tw@gmail.com</p></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={10} className="text-center mt-3"><Button variant="primary" onClick={()=>{
            sendRequest().then(()=>{
              setShowVerifyAlert(true);
              setIsCodeSent(true);
              console.log("request has been sent...");
            });
          }}>Request Verification Code</Button></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={10} className="text-center mt-3">
            <Button variant="primary" onClick={()=> {
              setIsCodeSent(true);
              setShowVerifyAlert(true);
              }}>Verify</Button>
          </Col>
          <Col></Col>
        </Row>
      </>}
      
      <Alert show={showVerifyAlert} className="mt-5">
        <Alert.Heading>Verification Code Sent!</Alert.Heading>
        <Form onSubmit={handleSubmit}>
          <Row className="mt-3">
            <Col xs={2}/>
            <Col>
              <Form.Control type="text" value={verificationCode} placeholder="Input code here" onChange={(e)=> setVerificationCode(e.target.value)}/>
            </Col>
            <Col xs={2}/>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={8} className="text-center mt-3">
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">Verify</Button>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Form>
      </Alert>

      <Alert show={isVerified} className="mt-5">
          <Alert.Heading>Verify Success!</Alert.Heading>
          <Button variant="primary" className="mt-5" onClick={()=>history("../../profile")}>Go to profile</Button>
      </Alert>

      <Alert show={isShowStatus} key="danger" variant="danger" className="mt-5">
          <Alert.Heading>{status}</Alert.Heading>
      </Alert>

      
      
    </>
  )
}