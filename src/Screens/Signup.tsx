import {StyleSheet, Text, View, Dimensions, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput, TouchableRipple} from 'react-native-paper';
import logo from '../Assets/modifiedConnectLogo.png';
import DatePicker from 'react-native-date-picker';

type Props = {
  navigation: any;
};
const {width} = Dimensions.get('screen');

const SignUp = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [date, setDate] = useState<Date>(new Date('Jan 01 2004'));
  const [open, setOpen] = useState(false);
  console.log('\nEmail: ', email);
  console.log('Password: ', password);
  console.log('Confirm Password: ', confirmPassword);
  console.log('NAME: ', firstName, lastName);
  console.log('DOB', date);
  const navigate = (
    email: String,
    password: string,
    firstName: String,
    lastName: String,
    date: Date,
  ) => {
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      date != null &&
      password.length > 0
    ) {
      navigation.navigate('');
    }
  };

  return (
    <View style={styles.signUpContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={logo}
          resizeMode="contain"
          style={{height: 100, width: 100}}
        />
        <Text style={styles.logoContainerHeading}>Connect</Text>
      </View>
      <View style={styles.signUpForm}>
        <Text style={styles.signUpFormHeading}>Sign Up</Text>
        <Text style={styles.signUpFormText}>
          Sign Up to connect with people with similar interests.
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder="Enter first name"
            onChangeText={text => {
              setFirstName(text);
            }}
            value={firstName}
            style={styles.nameInput}
          />
          <TextInput
            placeholder="Enter last name"
            onChangeText={text => {
              setLastName(text);
            }}
            value={lastName}
            style={styles.nameInput}
          />
        </View>
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.textInput}
            activeUnderlineColor="#1d4ed8"
            left={<TextInput.Icon name="at" color="grey" size={22} />}
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
          />
          <TextInput
            secureTextEntry={secureTextEntry2}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            style={styles.textInput}
            activeUnderlineColor="#1d4ed8"
            left={<TextInput.Icon name="key" color="grey" size={22} />}
            right={
              <TextInput.Icon
                name="eye"
                color="grey"
                size={22}
                onPress={() => {
                  setSecureTextEntry2(!secureTextEntry2);
                }}
              />
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Date Of Birth:
          </Text>
          <Button
            style={styles.dobButton}
            color="white"
            onPress={() => setOpen(true)}>
            {date.toDateString()}
          </Button>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <Button
          mode="contained"
          style={styles.signUpButton}
          onPress={() => {
            if (password == confirmPassword) {
              navigation.navigate('SignUp2', {
                info: {
                  firstName,
                  lastName,
                  password,
                  confirmPassword,
                  email,
                  date,
                },
              });
            } else {
              Alert.alert("Passwords don't match");
            }
          }}>
          Next
        </Button>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.signUpFormText}>Already have an account? </Text>
          <TouchableRipple onPress={() => navigation.navigate('Login')}>
            <Text style={{color: 'blue', fontSize: 14, fontWeight: '900'}}>
              Log in here.
            </Text>
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    backgroundColor: '#1d4ed8',
  },
  signUpForm: {
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
  signUpFormHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    margin: 25,
  },
  signUpFormText: {
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
  signUpButton: {
    width: width * 0.7,
    backgroundColor: '#1d4ed8',
    height: 40,
    marginVertical: 20,
  },
  dobButton: {
    flexDirection: 'row',
    width: width * 0.5,
    backgroundColor: '#10b981',
    height: 40,
    marginVertical: 20,
  },
  nameInput: {
    width: width * 0.4,
    height: 40,
    marginTop: 20,
    marginHorizontal: 15,
  },
});
