import { configureStore } from '@reduxjs/toolkit';

import conversationReducer from '@/store/conversation/conversationSlice';
import userReducer from '@/store/user/userSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      conversation: conversationReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
