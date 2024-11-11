import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root.reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root-saga";
import { userAuthenticatedListener } from "./ducks/auth";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(sagaMiddleware)
      .prepend(userAuthenticatedListener.middleware);
  },
});

sagaMiddleware.run(rootSaga);

export default store;
