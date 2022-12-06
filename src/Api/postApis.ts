import axios from 'axios';
import {Alert} from 'react-native';
import {IPost} from '../Interfaces/PostInterfaces';

// http://172.20.10.8:5000
// const hostURL = 'https://whispering-mesa-47615.herokuapp.com';
const hostURL = 'http://192.168.0.106:5000';

export const getAllPosts = async () => {
  const {data} = await (await fetch(`${hostURL}/api/posts`)).json();
  return data;
};

export const newPost = (
  postBody: string,
  tags: string,
  creator: string,
  creatorImage: string,
  creatorName: string,
  postImage: string | undefined,
) => {
  const url = `${hostURL}/api/posts`;
  axios
    .post(url, {postBody, tags, creator, creatorImage, creatorName, postImage})
    .then(res => {
      Alert.alert('Post created');
    })
    .catch(e => {
      if (e.message == 'Request failed with status code 413') {
        Alert.alert('Image too large');
      } else {
        Alert.alert('Failed to create post');
      }
    });
};

export const newComment = async (
  creatorName: string,
  commentBody: string,
  creatorImage: string,
  postId: string,
) => {
  const url = `${hostURL}/api/posts/new-comment/${postId}`;
  try {
    let {data} = await axios.put(url, {creatorName, commentBody, creatorImage});
    return data;
  } catch (error) {
    return {success: false};
  }
};

export const getFriendsPosts = async (friendsId: string[]) => {
  console.log(friendsId);
  const url = `${hostURL}/api/posts/friends-post`;
  let res = await axios.post(url, {friendsId});
  return res.data;
};

export const reportPost = async (reporterId: string, postId: string) => {
  axios
    .post(`${hostURL}/api/posts/report`, {reporterId, postId})
    .then(() => Alert.alert('Success', 'Post reported'))
    .catch(e => Alert.alert('Sorry', e.message));
};

export const likePost = (likerId: string, postId: string, item: IPost) => {
  axios
    .patch(`${hostURL}/api/posts/like-post/${postId}`, {likerId})
    .then(res => {
      console.log(res.data);
      if (res.data.success == true) {
        item.likers = [...item.likers, likerId];
        item.likeCount = item.likeCount + 1;
        Alert.alert('Successfully liked post');
      }
    })
    .catch(e => {
      console.log(e);
    });
};

export const unlikePost = async (unlikerId: string, postId: string) => {
  try {
    let {data} = await axios.patch(
      `${hostURL}/api/posts/unlike-post/${postId}`,
      {
        unlikerId,
      },
    );
    Alert.alert('Unliked post successfully');
  } catch (error) {
    Alert.alert('Failed to unlike post');
  }
};

export const getOnePost = async (postId: string) => {
  try {
    const url = `${hostURL}/api/posts/onepost/${postId}`;
    let {data} = await axios.get(url);
    return data;
  } catch (error) {
    return {success: false};
  }
};

export const getTrendingPosts = async () => {
  let {data} = await axios.get(`${hostURL}/api/posts/trending`);
  return data.data;
};

export const getInterestedPosts = async (interests: string[]) => {
  console.log(interests);

  let {data} = await axios.patch(`${hostURL}/api/posts/interest-post`, {
    interests,
  });
  return data;
};

export const deletePost = (postId: string) => {
  let url = `${hostURL}/api/posts/onepost/${postId}`;
  axios
    .delete(url)
    .then(res => {
      res.data.success == true
        ? Alert.alert('Deleted post successfully')
        : Alert.alert('Failed to delete post');
    })
    .catch(() => {
      Alert.alert('Failed to delete post');
    });
};
