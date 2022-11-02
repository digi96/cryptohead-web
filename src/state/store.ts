// import { configureStore } from "@reduxjs/toolkit";
// import reducers from "./reducers";

// export default configureStore({
//   reducer: reducers,
// });

import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
