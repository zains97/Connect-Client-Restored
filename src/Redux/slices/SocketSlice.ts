import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Socket} from 'socket.io-client';
import {IUser} from '../../Interfaces/UserInterface';

export interface UserState {
  value: Socket;
}

const initialState = {
  value: null,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    updateSocketState: (state, action) => {
      console.log('socket saved: ', action.payload);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateSocketState} = socketSlice.actions;

export default socketSlice.reducer;
