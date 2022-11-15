import { ethers } from "ethers";
import { useState } from "react";
import { headProfileContract } from "..";

export const useCreateHeadProfile = (address: string) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>();

  const send = async () => {
    console.log("sending create profile......");
    const profile = {
      userId: 0,
      userType: 1,
      userAddress: address,
      displayName: "Bevis Lin2",
      email: "bevis.tw@gmail.com",
      isEmailVerified: false,
      lastUpdate: "1655445559",
      emailVerifyNumber: 0,
    };

    try {
      setLoading(true);
      const tx = await headProfileContract.createProfile(profile);
      tx.wait().then(function (receipt: any) {
        console.log(receipt);
        setLoading(false);
        setSuccess(true);
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err);
    }
  };

  return {
    loading,
    success,
    error,
    send,
  };
};
