import { useCall } from "@usedapp/core";
import { headProfileContract } from "..";

export const useGetHeadProfile = () => {
  const { value , error } = useCall({
    contract: headProfileContract,
    method: 'getProfileInfo',
    args: []
  }) ?? {};


  let displayName:string = "";
  let email:string = "";
  let isEmailVerified:boolean = false;

  if(error){
    console.log(error);
  }else{
    console.log(value);
    if(value){
      displayName = value[2];
    email = value[3];
    isEmailVerified = value[4];
    }
    
  }

  return {
    displayName,
    email,
    isEmailVerified
  }
}