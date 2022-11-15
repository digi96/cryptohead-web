import { useEffect, useState } from "react";
import { headProfileContract } from "..";
import { useMetaMask } from "metamask-react";

export const useGetHeadProfile = () => {
  const [profile, setProfile] = useState<HeadProfile>();
  const { account } = useMetaMask();

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
            setProfile({
              userId: result[0],
              address: account!,
              displayName: result[2],
              email: result[3],
              isEmailVerified: result[4],
            });
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
