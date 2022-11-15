import { Button, Form } from "react-bootstrap"
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
    const { profile } = useGetHeadProfile();

    // useEffect(()=>{

    //     if(loading){
    //         setStatus("loading...");
    //     }
        
    //     if(success){
    //         setStatus("Succeed.");
    //     }

    // },[success, loading])


    const renderCreateProfileForm = () => {
        return (
            <>
                <Form>
                    <Form.Group>
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" value={displayName}/>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" value={email}/>
                    </Form.Group>
                    <Button variant="primay" type="submit" onClick={onCreateHeadProfileClick}>
                        Create Profile
                    </Button>
                </Form>
            </>
        );
    }

    const onCreateHeadProfileClick = async () => {
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


 
    return (
        <div>
        <p>Profile Page</p>
        {!profile && renderCreateProfileForm()}
        <p>{status}</p>
        {profile && <p>{profile!.displayName}</p>}
        {loading && <p>Creating profile...</p>}
        {success && <p>Profile created.</p>}
        {error && <div><p>Something went wrong..</p><p>{error}</p></div>}
        </div>
    )
}