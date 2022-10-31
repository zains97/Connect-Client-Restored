import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../Interfaces/UserInterface';

export interface UserState {
  value: IUser;
}
const initialState: UserState = {
  value: {
    __v: 0,
    _id: '',
    blockedUsers: [],
    chatID: [],
    email: '',
    firstName: '',
    friendsId: [],
    gender: '',
    interests: [],
    isAdmin: false,
    lastName: '',
    password: '',
    postID: [],
    profilePic: '',
    sentFriendRequests: [],
    recievedFriendRequests: [],
    currentLocation: '',
    dob: 0,
    suspendedTill: 0,
  },
};

export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    updateMeState: (state, action: PayloadAction<IUser>) => {
      console.log('UPDATE STATE FUNC: ', action.payload.profilePic);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateMeState} = meSlice.actions;

export default meSlice.reducer;
