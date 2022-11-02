import { ActionType } from "../action-types";

export interface HeadProfile {
  userId: number;
  address: string;
  displayName: string;
  email: string;
  isEmailVerified: boolean;
}

interface UpdateProfileAction {
  type: ActionType.UPDATE;
  payload: HeadProfile;
}

export type Action = UpdateProfileAction;
