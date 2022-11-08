import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
import { Button } from "react-bootstrap";
import {actionCreators, State} from "../state"
import { bindActionCreators } from "redux";
import { useEthers } from "@usedapp/core";
import axios, { AxiosRequestConfig } from "axios";

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export default function Sign(){  
  const { account, chainId } = useEthers();
  const dispatch = useDispatch();
  

  const { updateWalletInfo } = bindActionCreators(actionCreators, dispatch);
  const walletInfo = useSelector((state: State) => state.wallet);


const signInWithEthereum = async () => {
    
    const nowDateString:string = new Date().toISOString();

    const address = await signer.getAddress();

    const statement = 'Sign in with Ethereum to the app.';
    
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: 1,
      nonce: "UC2HszhC2IBBll90p",
      issuedAt: nowDateString
  });
    
    //console.log("to message,"+ message.toMessage());
    const jsonObj = {
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: 1,
      nonce: "UC2HszhC2IBBll90p",
      issuedAt: nowDateString
  };
  
  
  const signedMessage: string = await signer.signMessage(message.prepareMessage());
  console.log(signedMessage);

  const objToEncode = {
    "signature": signedMessage,
    "message": jsonObj
  }

  if(account){
    let newWalletInfo: WalletInfo = {
      netWorkId: chainId? chainId:0,
      address: account,
      signedMessage: JSON.stringify(objToEncode), 
      loggedIn: false
    }

    updateWalletInfo(newWalletInfo);
  }

  
}

const signIn =async () => {
  try{
    
    const axiosConfig:AxiosRequestConfig = {
      method: 'GET',
      url: '/siwe/me',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${walletInfo.signedMessage}`
      }
    }

    const { data } = await axios(axiosConfig);

  console.log(JSON.stringify(data, null, 4));

  if(data.loggedIn){
    let newWalletInfo: WalletInfo = {
      ...walletInfo,
      loggedIn: true
    }
    updateWalletInfo(newWalletInfo);
  }
  }catch(error){
    console.log(error);
  }
}


return (
    <>
      <div>
        {!walletInfo.signedMessage && <Button onClick={signInWithEthereum}>Sign Message</Button>}
        {(walletInfo.signedMessage && !walletInfo.loggedIn)  && <Button onClick={signIn}>Login</Button>}
        {walletInfo.loggedIn && <p>You are logged in.</p>}
      </div>
    </>
  )


}