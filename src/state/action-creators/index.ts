import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";

export const updateUser = (headProfile: HeadProfile) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.UPDATE_HEAD_PROFILE,
      payload: headProfile,
    });
  };
};

export const updateWalletInfo = (walletInfo: WalletInfo) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.UPDATE_WALLET_IFNO,
      payload: walletInfo
    })
  }
}