import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducer/auth";
import { ProfileReducer } from "./reducer/profile";
import { ServiceReducer } from "./reducer/service";
import { BannerReducer } from "./reducer/banner";
import { HistoryReducer } from "./reducer/transaction";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    profile: ProfileReducer,
    services: ServiceReducer,
    banner: BannerReducer,
    history_transaction: HistoryReducer,
  },
});

export default store;
