import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import axios from 'axios';
import {Dispatch} from 'react';
import {Alert} from 'react-native';
import {IUser} from '../Interfaces/UserInterface';

const hostURL = `http://192.168.0.107:5000/api/friends`;

export const getFriendRequests = async (recipientId: string) => {
  try {
    let {data} = await axios.get(`${hostURL}/get-requests/${recipientId}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const acceptFriendRequest = (
  requesterId: String,
  recipientId: String,
  requestId: String,
) => {
  axios
    .put(`${hostURL}/confirm-request`, {
      requesterId,
      recipientId,
      requestId,
    })
    .then(res => {
      console.log(res);
    })
    .catch(e => Alert.alert(e.message));
};

export const sendFriendRequest = async (
  requester: IUser,
  recipient: String,
) => {
  try {
    const {data} = await axios.post(`${hostURL}/send-request`, {
      requester,
      recipient,
    });
    // data.success == true ? Alert.alert('Success') : Alert.alert('Failed');
    return data;
  } catch (err) {
    return {success: false};
  }
};

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
  // .then(res => {
  //   res.data.success == true
  //     ? Alert.alert('REQUEST CANCELLED')
  //     : Alert.alert('Failed to cancel request');
  // })
  // .catch(() => Alert.alert('Failed to cancel request'));
};

const getFriends = async (userId: string) => {
  try {
    let {data} = await axios.get(`${hostURL}/${userId}`);
    return data;
  } catch (error) {
    return {success: false};
  }
};
