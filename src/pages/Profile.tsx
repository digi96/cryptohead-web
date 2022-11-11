import { Button } from "react-bootstrap"
import { useEthers } from "@usedapp/core";
import { useCreateHeadProfile } from "../hooks/CreateHeadProfile"
import { useState, useEffect } from "react";
import { BigNumber } from "ethers";

export default function ProfilePage(){
    const [status, setStatus] = useState("");
    const { account } = useEthers();
    const { loading, success, error, send } = useCreateHeadProfile();

    useEffect(()=>{

        if(loading){
            setStatus("loading...");
        }
        
        if(success){
            setStatus("Succeed.");
        }
    },[success, loading])

    const onCreateHeadProfileClick = async () => {
        await send([BigNumber.from(0),
            1,account,"Bevis Lin","bevis.tw@gmail.com",false,BigNumber.from("1655445559"),0]);

    }

    return (
        <div>
        <p>Profile Page</p>
        <Button onClick={onCreateHeadProfileClick}>Create Profile</Button>
        <p>{status}</p>
        </div>
    )
}