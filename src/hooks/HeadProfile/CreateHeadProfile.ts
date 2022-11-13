import { useContractFunction } from "@usedapp/core";
import { headProfileContract } from "..";

export const useCreateHeadProfile = () => {
  const { state, send } = useContractFunction(headProfileContract, "createProfile");
  const loading =
    state.status === "PendingSignature" || state.status === "Mining";
  const success = state.status === "Success";
  const error = state.status === "Fail" || state.status === "Exception";
  return {
    loading,
    success,
    error,
    send,
  };
};