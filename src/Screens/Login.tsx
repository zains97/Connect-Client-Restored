import {StyleSheet, Text, View, Dimensions, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput, TouchableRipple} from 'react-native-paper';
import logo from '../Assets/modifiedConnectLogo.png';
import {getUser, loginUser} from '../Api/userApis';
import {storeMe} from '../Utilities/StoreMe';
import {updateMeState} from '../Redux/slices/MeSlice';
import {useDispatch} from 'react-redux';

type Props = {
  navigation: any;
};
const {width} = Dimensions.get('screen');

const Login = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  return (
    <View style={styles.loginContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={logo}
          resizeMode="contain"
          style={{height: 100, width: 100}}
        />
        <Text style={styles.logoContainerHeading}>Connect</Text>
      </View>
      <View style={styles.loginForm}>
        <Text style={styles.loginFormHeading}>Login</Text>
        <Text style={styles.loginFormText}>
          Login to connect with people with similar interests.
        </Text>
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.textInput}
            activeUnderlineColor="#1d4ed8"
            left={<TextInput.Icon name="at" color="grey" size={22} />}
            textContentType="emailAddress"
          />
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.textInput}
            activeUnderlineColor="#1d4ed8"
            left={<TextInput.Icon name="key" color="grey" size={22} />}
            right={
              <TextInput.Icon
                name="eye"
                color="grey"
                size={22}
                onPress={() => {
                  setSecureTextEntry(!secureTextEntry);
                }}
              />
            }
            textContentType="password"
          />
        </View>
        <Button
          loading={btnLoading}
          mode="contained"
          style={styles.loginButton}
          onPress={async () => {
            setBtnLoading(true);
            loginUser(email, password)
              .then(res => {
                console.log('LOGIN RES: ', res.user);
                if (!res.user.isSuspended) {
                  storeMe(res.user);
                  dispatch(updateMeState(res.user));
                  setBtnLoading(false);
                  navigation.navigate('MainApp');
                } else {
                  Alert.alert('You have been suspended');
                  setBtnLoading(false);
                }
              })
              .catch(e => {
                Alert.alert(e);
                setBtnLoading(false);
              });
          }}>
          Log In
        </Button>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.loginFormText}>Don't have an account yet? </Text>
          <TouchableRipple onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: 'blue', fontSize: 14, fontWeight: '900'}}>
              Register here.
            </Text>
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#1d4ed8',
  },
  loginForm: {
    flex: 0.8,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  logoContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoContainerHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
  },
  loginFormHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    margin: 25,
  },
  loginFormText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  textInput: {
    width: width * 0.9,
    height: 40,
    marginTop: 20,
  },
  loginButton: {
    width: width * 0.7,
    backgroundColor: '#1d4ed8',
    height: 40,
    marginVertical: 20,
  },
});
