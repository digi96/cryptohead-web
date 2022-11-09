import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
import { Button } from "react-bootstrap";
import {actionCreators, State} from "../state"
import { bindActionCreators } from "redux";
import { useEthers } from "@usedapp/core";
import axios, { AxiosRequestConfig } from "axios";
import { getNonce, verifySignedMessage } from "../service/FastifySiweService";

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export default function Sign(){  
  const { account, chainId } = useEthers();
  const [ status, setStatus ] = useState<string>("");
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const dispatch = useDispatch();
  
  const { updateWalletInfo } = bindActionCreators(actionCreators, dispatch);
  const walletInfo = useSelector((state: State) => state.wallet);


  const signInWithEthereum = async () => {

    if(!account){
      return;
    }

    setStatus("Signing...");
    setIsLoading(true);

    //here to get nonce from backend
    const newNonce = await getNonce();
    const nowDateString:string = new Date().toISOString();
    const address = await signer.getAddress();
    const statement = 'Sign in with Ethereum to the app.';
    const jsonObj = {
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId: 1,
        nonce: newNonce,
        issuedAt: nowDateString
      };
      
    const message = new SiweMessage(jsonObj);
    const signedMessage: string = await signer.signMessage(message.prepareMessage());
    console.log(signedMessage);

    const objToEncode = {
      "signature": signedMessage,
      "message": jsonObj
    }

    let newWalletInfo: WalletInfo = {
        netWorkId: chainId? chainId:0,
        address: account,
        signedMessage: JSON.stringify(objToEncode), 
        loggedIn: false
    }

    const loggedIn = await verifySignedMessage(JSON.stringify(objToEncode));

    if(loggedIn){
      newWalletInfo.loggedIn = true;
      updateWalletInfo(newWalletInfo);
      setStatus("Logged in.");
    }else{
      setStatus("Log failed.")
    }

    setIsLoading(false);
    
  }

  useEffect(()=>{
    if(walletInfo.loggedIn){
      setStatus("Logged in.");
    }
  },[]);


  return (
    <>
      <div>
        <p>{status}</p>
        {(!walletInfo.loggedIn && !isLoading) && <Button onClick={signInWithEthereum}>Sign Message To Login</Button>}
      </div>
    </>
  )


}