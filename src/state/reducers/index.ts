import { combineReducers } from "redux";
import userReducer from "./userReducer";
import walletReducer from "./walletReducer";

const reducers = combineReducers({
  user: userReducer,
  wallet: walletReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;
