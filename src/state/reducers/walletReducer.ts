import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState: WalletInfo = {
    netWorkId: 0,
    address: "",
    isSetMetamask: false
}

const walletReducer = (state: WalletInfo = initialState, action: Action) => {
    switch(action.type) {
        case ActionType.UPDATE_WALLET_IFNO:
            return (state = action.payload);
        default:
            return state;
    }
};

export default walletReducer;