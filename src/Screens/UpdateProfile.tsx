import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {Button, Text} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {updateUser} from '../Api/userApis';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {updateMeState} from '../Redux/slices/MeSlice';

const {width} = Dimensions.get('screen');

interface Props {
  navigation: {navigate: object};
}

const UpdateProfile = ({navigation}: Props) => {
  const [fName, setFName] = useState<string>();
  const [lName, setLName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [gender, setGender] = useState<string>();

  const [date, setDate] = useState<Date>(new Date('Mar 25 2015'));
  const [open, setOpen] = useState(false);
  const me = useSelector((state: RootState) => state.me.value);
  const dispatch = useDispatch();
  const genders = [
    {
      id: 1,
      gender: 'Male',
    },
    {
      id: 2,
      gender: 'Female',
    },
  ];
  console.log(
    'DATE:',
    date.toLocaleDateString().replace('/', '-').replace('/', '-'),
  );
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{backgroundColor: 'white', flex: 0.875}}>
        <View style={{alignItems: 'center'}}>
          <TextInput
            onChangeText={text => setFName(text)}
            style={styles.textInput}
            placeholder="First Name"
            selectionColor={'orange'}
          />
          <TextInput
            onChangeText={text => setLName(text)}
            style={styles.textInput}
            placeholder="Last Name"
            selectionColor={'orange'}
          />
          <TextInput
            onChangeText={text => setEmail(text)}
            style={styles.textInput}
            placeholder="Email"
            selectionColor={'orange'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
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
              <Icon
                color={'white'}
                name={data.gender == 'Male' ? 'male' : 'female'}
                size={data.gender === gender ? 28 : 24}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
        </View>
        <Button
          onPress={() => {
            updateUser(
              me._id,
              fName,
              lName,
              email,
              gender,
              date,
              dispatch,
              updateMeState,
            );
          }}
          color="white"
          style={{
            backgroundColor: '#1d4ed8',
            width: width * 0.5,
            alignSelf: 'center',
          }}>
          Update
        </Button>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    padding: 10,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    width: '85%',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
  dobButton: {
    flexDirection: 'row',
    width: width * 0.5,
    backgroundColor: '#10b981',
    height: 40,
    marginVertical: 20,
  },
});
