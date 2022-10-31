import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPost} from '../../Interfaces/PostInterfaces';

export interface PostState {
  value: IPost;
}
const initialState: PostState = {
  value: {
    __v: 0,
    _id: '',
    comments: [],
    createDate: 0,
    creator: '',
    creatorImage: '',
    creatorName: '',
    postBody: '',
    postImage: '',
    tags: [],
  },
};

export const selectedPost = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    updateSelectedPostState: (state, action: PayloadAction<IPost>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateSelectedPostState} = selectedPost.actions;

export default selectedPost.reducer;
