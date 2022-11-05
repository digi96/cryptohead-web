import { ActionType } from "../action-types";
import { Action } from "../actions/index";

const initialState: HeadProfile = {
  userId: 0,
  address: "",
  displayName: "Guest",
  email: "",
  isEmailVerified: false,
};

const userReducer = (state: HeadProfile = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_HEAD_PROFILE:
      return (state = action.payload);
    default:
      return state;
  }
};

export default userReducer;
