import { useState } from "react";
import { headProfileContract } from "..";

export enum processTypeList {
  RequestCode,
  VerifyCode
}

export const useEmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [processType, setProcessType] = useState<processTypeList | null>(null);
  const [error, setError] = useState<any>();

  const sendRequest = async () => {
    setProcessType(processTypeList.RequestCode);
    setSuccess(false);
    setError(null);
    console.log("requesting verification code......");
    try{
      setLoading(true);
      const tx = await headProfileContract.requestEmailVerificationCode();
      tx.wait().then(function (receipt: any){
        console.log(receipt);
        setLoading(false);
        setSuccess(true);
      });
    }catch(err){
      setLoading(false);
      console.log(err);
      setError(err);
    }
  }

  const verify = async (code:string) => {
    setProcessType(processTypeList.VerifyCode);
    setSuccess(false)
    setError(null);
    console.log("verifying code......");
    try{
      setLoading(true);
      const tx = await headProfileContract.verifyEmail(code);
      tx.wait().then(function (receipt: any){
        console.log(receipt);
        setLoading(false);
        setSuccess(true);
      })
    }catch(err){
      setLoading(false);
      console.log(err);
      setError(err);
    }
  }

  return {
    processType,
    loading,
    success,
    error,
    sendRequest,
    verify,
  };
}