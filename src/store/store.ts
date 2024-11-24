import { configureStore } from '@reduxjs/toolkit';

import conversationReducer from '@/store/conversation/conversationSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      conversation: conversationReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
