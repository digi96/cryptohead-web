import { ethers } from "ethers";
import { useState } from "react";
import { headProfileContract } from "..";

export const useCreateHeadProfile = (address: string) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>();

  const send = async (profile: HeadProfileCreation) => {
    console.log("sending create profile......");
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
