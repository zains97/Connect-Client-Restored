import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Socket} from 'socket.io-client';

export interface SocketState {
  value: Socket;
}

const initialState: Socket | any = {
  value: {},
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    updateSocketState: (state, action: PayloadAction<Socket>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateSocketState} = socketSlice.actions;

export default socketSlice.reducer;
