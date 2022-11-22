import { useEffect, useState } from "react";
import { headProfileContract } from "..";
import { useMetaMask } from "metamask-react";
import { actionCreators, State } from "../../state";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";


export const useGetHeadProfile = () => {
  //const [profile, setProfile] = useState<HeadProfile>();
  const { account } = useMetaMask();
  const dispatch = useDispatch();
  const { updateUser } = bindActionCreators(actionCreators, dispatch);

  const user = useSelector((state: State) => state.user);

  useEffect(() => {
    if (account) {
      retrieveData();
    }
  }, [account]);

  const retrieveData = async () => {
    //console.log("getting profile.....");
    headProfileContract
      .getProfileInfo()
      .catch((error: any) => {
        console.log(error);
        //assume not exists
        let initialProfile: HeadProfile = {
          userId: 0,
          address: "",
          displayName: "Guest",
          email: "",
          isEmailVerified: false
        }
        updateUser(initialProfile);
      })
      .then((result: any) => {
        //console.log(result);
        if (result) {
          let tempProfile: HeadProfile = {
            userId: result[0].toNumber(),
            address: account!,
            displayName: result[2],
            email: result[3],
            isEmailVerified: result[4],
          };

          //setProfile(tempProfile);
          updateUser(tempProfile);
        }
      });
  }

  
  return {
    user,
    retrieveData
  };
};
