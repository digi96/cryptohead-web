import { useEffect, useState } from "react";
import { headProfileContract } from "..";
import { useMetaMask } from "metamask-react";
import { actionCreators, State } from "../../state";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export const useGetHeadProfile = () => {
  const [profile, setProfile] = useState<HeadProfile>();
  const { account } = useMetaMask();
  const dispatch = useDispatch();
  const { updateUser } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    async function callContract() {
      console.log("getting profile.....");
      headProfileContract
        .getProfileInfo()
        .catch((error: any) => {
          console.log(error);
        })
        .then((result: any) => {
          console.log(result);
          if (result) {
            let tempProfile: HeadProfile = {
              userId: result[0],
              address: account!,
              displayName: result[2],
              email: result[3],
              isEmailVerified: result[4],
            };

            setProfile(tempProfile);
            updateUser(tempProfile);
          }
        });
    }

    if (account) {
      callContract();
    }
  }, [account]);

  return {
    profile,
  };
};
