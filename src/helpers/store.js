import { createStore, applyMiddleware } from "redux";
import rootReducer from "../@reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewares =
    process.env.NODE_ENV === "production"
        ? applyMiddleware(thunk)
        : applyMiddleware(thunk , logger);

export const store = createStore(rootReducer, middlewares);
