import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { STATE } from "../enums/state.enum";

export interface initialState {
  token?: any;
}

const persistConfig = {
  key: "root",
  storage: storage,
};

const changedState = (
  state: initialState | undefined,
  { type, ...rest }: any
) => {
  switch (type) {
    case STATE.SETTOKEN:
      return { ...state, ...rest };
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, changedState);

export default () => {
  let store = configureStore({
    reducer: persistedReducer,
  });
  let persistor = persistStore(store);
  return { store, persistor };
};
