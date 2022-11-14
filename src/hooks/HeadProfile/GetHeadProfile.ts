import { useEffect, useState } from "react";
import { headProfileContract } from "..";
import { useMetaMask } from "metamask-react";

export const useGetHeadProfile = () => {
  const [profile, setProfile] = useState<HeadProfile>();
  const { account } = useMetaMask();

  useEffect(() => {
    if (account) {
      console.log("getting profile.....");
      headProfileContract.getProfileInfo().then((result: any) => {
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
  }, [account]);

  return {
    profile,
  };
};
