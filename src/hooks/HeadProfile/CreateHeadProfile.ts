import { useState } from "react";
import { headProfileContract } from "..";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import { useGetHeadProfile } from "./GetHeadProfile";

export const useCreateHeadProfile = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>();
  const dispatch = useDispatch();
  const { updateUser } = bindActionCreators(actionCreators, dispatch);
  const { retrieveData } = useGetHeadProfile();

  const send = async (profile: HeadProfileCreation) => {
    console.log("sending create profile......");
    try {
      setLoading(true);
      const tx = await headProfileContract.createProfile(profile);
      tx.wait().then(function (receipt: any) {
        console.log(receipt);
        setLoading(false);
        setSuccess(true);

        let newUser: HeadProfile = {
          userId: 0,
          address: profile.userAddress,
          displayName: profile.displayName,
          email: profile.email,
          isEmailVerified: false,
        };
        updateUser(newUser);
        retrieveData();
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
