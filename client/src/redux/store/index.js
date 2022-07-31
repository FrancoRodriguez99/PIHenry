import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

//createstore deprecado pero no quiero tocarlo porque el readme dice de usar unicamente redux: 4.0.5
