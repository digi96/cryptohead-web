import { ActionType } from "../action-types";
import { HeadProfile } from "../interfaces/index"

interface UpdateProfileAction {
  type: ActionType.UPDATE;
  payload: HeadProfile;
}

export type Action = UpdateProfileAction;
