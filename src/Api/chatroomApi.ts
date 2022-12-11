import axios from 'axios';
import {Alert} from 'react-native';

// const hostURL = `https://whispering-mesa-47615.herokuapp.com/api/chatroom`;
// const hostURL = 'http://192.168.0.106:5000/api/chatroom';
const hostURL = 'https://connect-fyp-zain.herokuapp.com/api/chatroom';

export const createChatroom = async (
  participants: string[],
  chatName: string,
) => {
  try {
    let {data} = await axios.post(hostURL, {participants, chatName});
    return data;
  } catch (error) {
    return {success: false};
  }
};

export const getChats = async (userId: string) => {
  try {
    let {data} = await axios.get(`${hostURL}/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
    return {success: false};
  }
};

export const getAllMessages = async (chatroomId: string) => {
  try {
    let {data} = await axios.get(`${hostURL}/all-messages/${chatroomId}`);
    return data;
  } catch (error) {
    return {success: false};
  }
};

export const getOneChatroom = async (chatroomId: string) => {
  try {
    let {data} = await axios.get(`${hostURL}/get-chatroom/${chatroomId}`);
    return data;
  } catch (error) {
    return {success: false, error};
  }
};

export const deleteChatroom = async (chatroomId: string) => {
  try {
    let {data} = await axios.delete(`${hostURL}/${chatroomId}`);
    Alert.alert('Successfully deleted chatroom');
  } catch (error) {
    return {success: false};
  }
};
