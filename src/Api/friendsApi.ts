import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import axios from 'axios';
import {Dispatch} from 'react';
import {Alert} from 'react-native';
import {IUser} from '../Interfaces/UserInterface';

const hostUrl = 'https://connect-fyp-zain.herokuapp.com/api/friends';
// const hostURL = `http://192.168.0.106:5000/api/friends`;
// const hostURL = `https://whispering-mesa-47615.herokuapp.com/api/friends`;

export const getFriendRequests = async (recipientId: string) => {
  try {
    let {data} = await axios.get(`${hostURL}/get-requests/${recipientId}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const acceptFriendRequest = async (
  requesterId: String,
  recipientId: String,
  requestId: String,
) => {
  try {
    let {data} = await axios.put(`${hostURL}/confirm-request`, {
      requesterId,
      recipientId,
      requestId,
    });
    return data.success ? data.user : {success: false};
  } catch (error) {
    return {success: false};
  }
  // .then(res => {
  //   console.log(res);
  // })
  // .catch(e => Alert.alert(e.message));
};

export const sendFriendRequest = async (
  requester: string,
  recipient: string,
) => {
  try {
    const {data} = await axios.post(`${hostURL}/send-request`, {
      requester,
      recipient,
    });
    data.success == true ? Alert.alert('Success') : Alert.alert('Failed');
    console.log('sendFriendRequest RES: ', data);
    return data;
  } catch (err) {
    return {success: false};
  }
};
//CLIENT SE REQUEST CLEAR HAI
export const cancelFriendRequest = async (
  senderId: string,
  recipientId: string,
) => {
  try {
    let {data} = await axios.put(`${hostURL}/cancel-request`, {
      senderId,
      recipientId,
    });
    return data;
  } catch (error) {
    return {success: false};
  }
};

const getFriends = async (userId: string) => {
  try {
    let {data} = await axios.get(`${hostURL}/${userId}`);
    return data;
  } catch (error) {
    return {success: false};
  }
};

export const unfriend = async (userId: string, unfriendedId: string) => {
  try {
    let {data} = await axios.patch(`${hostURL}/unfriend`, {
      userId,
      unfriendedId,
    });
    return data.success ? data : {success: false};
  } catch (error) {
    return {success: false};
  }
};
