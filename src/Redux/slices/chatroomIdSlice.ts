import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ChatroomIdState {
  value: string;
}
const initialState: ChatroomIdState = {
  value: '',
};

export const chatroomSlice = createSlice({
  name: 'chatroomId',
  initialState,
  reducers: {
    updateChatroomState: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateChatroomState} = chatroomSlice.actions;

export default chatroomSlice.reducer;
