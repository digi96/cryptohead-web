import { ActionType } from "../action-types";


interface UpdateProfileAction {
  type: ActionType.UPDATE_HEAD_PROFILE;
  payload: HeadProfile;
}

interface UpdateWalletInfoAction {
  type: ActionType.UPDATE_WALLET_IFNO;
  payload: WalletInfo
}

export type Action = UpdateProfileAction | UpdateWalletInfoAction;
