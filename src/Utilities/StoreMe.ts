import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUser} from '../Interfaces/UserInterface';

export const storeMe = async (value: IUser) => {
  try {
    // console.log('STORE ME VALUE: ', value);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('Me', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getMe = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('Me');

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
