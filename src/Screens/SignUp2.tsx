import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import logo from '../Assets/modifiedConnectLogo.png';
import Icon from 'react-native-vector-icons/Fontisto';
import {signUpUser} from '../Api/userApis';
import {tags} from '../Utilities/tags';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const genders = [
  {
    id: 1,
    gender: 'male',
  },
  {
    id: 2,
    gender: 'female',
  },
];

const SignUp2 = ({navigation}: any) => {
  const [gender, setGender] = useState<string>('Male');
  const [tag, setTag] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState('');
  let route = useRoute();
  let {info} = route.params;
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
        <Text style={styles.signUpFormHeading}>Select Interests</Text>
        {/* {image == '' ? (
          <>
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
                Select Image:
              </Text>
              <Button
                mode="contained"
                style={styles.signUpButton}
                onPress={() => {
                  if (image == '') {
                    launchImageLibrary({
                      includeBase64: true,
                      mediaType: 'photo',
                    })
                      .then(res => {
                        if (!res) {
                          return Alert.alert(
                            'Sorry',
                            'Could not fetch image. Please try again',
                          );
                        }
                        setImage(res.assets[0].base64);
                      })
                      .catch(e => Alert.alert(e));
                  } else {
                    setImage('');
                  }
                }}>
                Pick Image
              </Button>
            </View>
          </>
        ) : (
          <>
            <Image
              style={{
                borderRadius: 10,
                width: width * 0.5,
                height: width * 0.5,
                resizeMode: 'contain',
                borderWidth: 1,
              }}
              source={{uri: `data:image/jpeg;base64,${image}`}}
            />
            <Button
              onPress={() => {
                setImage('');
              }}
              color="white"
              style={{backgroundColor: '#f43f5e', marginTop: 5}}>
              Remove image
            </Button>
          </>
        )} */}

        <View style={{height: '40%'}}>
          <Text
            style={{
              marginHorizontal: 20,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Select Interests{' '}
          </Text>
          <ScrollView style={{marginTop: 10}} horizontal={true}>
            <View
              style={{
                marginHorizontal: 10,
                flexDirection: 'row',
              }}>
              {tags.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  onPress={() => {
                    if (!tag.includes(data.name)) {
                      setTag([...tag, data.name]);
                      console.log(tag);
                    } else {
                      setTag(tag.filter(item => item != data.name));
                    }
                  }}>
                  <View
                    style={{
                      padding: 6,
                      borderRadius: 5,
                      backgroundColor: '#3b82f6',
                      marginHorizontal: 5,
                      borderWidth: 3,
                      borderColor: tag.includes(data.name)
                        ? '#1d4ed8'
                        : '#3b82f6',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: tag.includes(data.name) ? 18 : 16,
                        fontWeight: tag.includes(data.name) ? 'bold' : 'normal',
                      }}>
                      {data.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Text
              style={{alignSelf: 'center', fontWeight: 'bold', color: 'black'}}>
              Select gender:
            </Text>
            {genders.map((data, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setGender(data.gender)}
                activeOpacity={0.6}
                style={{
                  width: 45,
                  height: 45,
                  backgroundColor: '#3b82f6',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 40,
                  marginHorizontal: 5,
                  borderWidth: 3,
                  borderColor: data.gender === gender ? '#1d4ed8' : '#3b82f6',
                }}>
                <View>
                  <Icon
                    color={'white'}
                    name={data.gender}
                    size={data.gender === gender ? 28 : 24}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            disabled={isLoading}
            mode="contained"
            style={styles.signUpButton}
            onPress={async () => {
              setIsLoading(true);

              await signUpUser(
                info.firstName,
                info.lastName,
                info.email,
                info.password,
                gender,
                tag,
              ),
                setTimeout(() => {
                  navigation.navigate('Login');
                }, 2000);
              setIsLoading(false);
            }}>
            Sign Up
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SignUp2;

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
    display: 'flex',
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
    margin: 10,
    textAlign: 'center',
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
    width: width * 0.4,
    backgroundColor: '#1d4ed8',
    height: 40,
    marginVertical: 20,
    alignSelf: 'center',
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
