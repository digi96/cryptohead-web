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
    const result = await headProfileContract.createProfile(profile);
    console.log(result);
  };

  return {
    loading,
    success,
    error,
    send,
  };
};
