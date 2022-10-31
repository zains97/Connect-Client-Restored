import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import logo from '../Assets/ConnectLogo.png';
import {getMe, storeMe} from '../Utilities/StoreMe';
import {useDispatch} from 'react-redux';
import {updateMeState} from '../Redux/slices/MeSlice';
import {getUser} from '../Api/userApis';

type Props = {
  navigation: any;
};

const Splash = ({navigation}: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getMe().then(res => {
      // console.log('SPLASH RES: ', res);
      if (res) {
        getUser(res._id)
          .then(res2 => {
            dispatch(updateMeState(res2.data));
            storeMe(res2.data);
          })
          .catch(() => {
            Alert.alert('Something went wrong, please restart the app.');
          });
      }
      setTimeout(() => {
        if (res) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('Login');
        }
      }, 2000);
    });
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Image
        source={logo}
        resizeMode="contain"
        style={{width: 300, height: 300}}
      />
      <Text style={styles.text}>Connect</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
