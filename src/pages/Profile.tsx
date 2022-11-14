import { Button } from "react-bootstrap"
import { useCreateHeadProfile, useGetHeadProfile } from "../hooks/HeadProfile"
import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import { useMetaMask } from 'metamask-react';


export default function ProfilePage(){
    const [status, setStatus] = useState("");
    const { account } = useMetaMask();
    //const { loading, success, error, send } = useCreateHeadProfile();
    const { send } = useCreateHeadProfile(account!);
    const { profile } = useGetHeadProfile();

    // useEffect(()=>{

    //     if(loading){
    //         setStatus("loading...");
    //     }
        
    //     if(success){
    //         setStatus("Succeed.");
    //     }

    // },[success, loading])

    const onCreateHeadProfileClick = async () => {
        console.log('ddddd');
        // await send([BigNumber.from(0),
        //     1,account,"Bevis Lin","bevis.tw@gmail.com",false,BigNumber.from("1655445559"),0]);
        send();

    }
 
    return (
        <div>
        <p>Profile Page</p>
        {!profile && <Button onClick={onCreateHeadProfileClick}>Create Profile</Button>}
        <p>{status}</p>
        {profile && <p>{profile!.displayName}</p>}
        </div>
    )
}