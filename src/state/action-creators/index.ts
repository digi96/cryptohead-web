import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { HeadProfile } from "../actions";

export const updateUser = (profile: HeadProfile) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.UPDATE,
      payload: profile,
    });
  };
};
