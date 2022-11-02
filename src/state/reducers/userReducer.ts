import { ActionType } from "../action-types";
import { Action, HeadProfile } from "../actions/index";

const initialState: HeadProfile = {
  userId: 0,
  address: "",
  displayName: "Guest",
  email: "",
  isEmailVerified: false,
};

const userReducer = (state: HeadProfile = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE:
      return (state = action.payload);
    default:
      return state;
  }
};

export default userReducer;
