import axios from 'axios';
import {Alert, LogBox} from 'react-native';
import {IUser} from '../Interfaces/UserInterface';

const hostURL = 'http://192.168.0.106:5000';

export const loginUser = async (email: string, password: string) => {
  try {
    const url = `${hostURL}/api/auth/login`;
    const {data} = await axios.post(url, {email, password});
    console.log('RES: ', data);
    if (data.message != 'Login successful') {
      return Alert.alert(data.message);
    }
    return data;
  } catch (error: any) {
    Alert.alert('Failed to login', error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const url = `${hostURL}/api/user/user/${userId}`;
    const user = await axios.get(url);
    // console.log('API: ', user.data);
    return user.data;
  } catch (ex) {
    return Alert.alert('Sorry', String(ex));
  }
};

export const blockUser = async (userId: string, otherId: string) => {
  const url = `${hostURL}/api/user/block/${userId}`;
  axios
    .put(url, {toBlock: otherId})
    .then(res => {
      res.data.success
        ? Alert.alert('Success', 'USER HAS BEEN BLOCKED')
        : Alert.alert('Sorry', 'Failed to block user');
    })
    .catch(e => {
      return Alert.alert('Something went wrong.');
    });
};

export const unblockUser = async (userId: string, otherId: string) => {
  const url = `${hostURL}/api/user/unblock/${userId}`;
  axios.put(url, {toUnBlock: otherId}).then(res => {
    res.data.success
      ? Alert.alert('Success', 'USER HAS BEEN UNBLOCKED')
      : Alert.alert('Sorry', 'Failed to unblock user');
  });
};

export const sendMessage = async (body: string, to: string, from: string) => {
  const url = `${hostURL}/api/message}`;
  let data = await axios.post(url, {to, from, body});
  return data;
};

export const getAllConversations = async () => {
  const url = `${hostURL}/api/message/conversations`;
  let data: any = await axios.get(url);
  return data.data;
};

export const getAllFriends = (
  friendsId: string[],
  setFriends: React.Dispatch<React.SetStateAction<IUser[] | undefined>>,
) => {
  const url = `${hostURL}/api/user/get-friends`;
  axios.put(url, {friendsId}).then(res => {
    if (res.data.success == true) {
      setFriends(res.data.friends);
    } else {
      Alert.alert('Failed to get friends, try again');
    }
  });
};

export const signUpUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  gender: string,
  interests: string[],
) => {
  const url = `${hostURL}/api/auth/register`;

  let body = {
    firstName,
    lastName,
    email,
    password,
    gender,
    interests,
  };

  axios
    .post(url, body)
    .then(() => {
      Alert.alert('Congrats, Successfully created new user!');
    })
    .catch(e => {
      Alert.alert('Sorry', 'Failed to register user');
    });

  console.log('BODY: ', body);
};

export const updateLocation = (userId: string, location: Object) => {
  let url = `${hostURL}/api/user/update-location`;
  axios.patch(url, {userId, location}).catch(() => {});
};
//{{URL}}/api/user/user/61f8431b8c7f11793a626640
export const updateUser = (
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  dob: string,
  dispatch: any,
  updateMeState: any,
) => {
  axios
    .patch(`${hostURL}/api/user/user/${userId}`, {
      firstName,
      lastName,
      email,
      gender,
      dob,
    })
    .then(res => {
      dispatch(updateMeState(res.data.data));
      Alert.alert('Updated user');
    })
    .catch(() => {
      Alert.alert('Could not update user');
    });
};

export const uploadPicture = async (userId: string, profilePic: string) => {
  const url = `${hostURL}/api/user/upload-photo`;
  try {
    const {data} = await axios.put(url, {userId, profilePic});
    return data;
  } catch (err) {
    return {success: false};
  }
};

export const getAllUsers = async () => {
  try {
    let {data} = await axios.get(`${hostURL}/api/user`);
    return data;
  } catch (error) {
    return {success: false};
  }
};

export const updateInterests = async (interests: string[], userId: string) => {
  try {
    let {data} = await axios.put(`${hostURL}/api/user/update-interests`, {
      interests,
      userId,
    });
    Alert.alert('Successfully Updated user interests');
  } catch (error) {
    Alert.alert('Failed to update, try again');
  }
};
