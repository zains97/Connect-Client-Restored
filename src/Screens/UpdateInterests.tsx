import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {tags} from '../Utilities/tags';
import {Button} from 'react-native-paper';
import {updateInterests} from '../Api/userApis';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {data} from 'browserslist';
import {updateMeState} from '../Redux/slices/MeSlice';

const UpdateInterests = () => {
  const me = useSelector((state: RootState) => state.me.value);
  const [selectedTags, setSelectedTags] = useState<string[]>(me.interests);
  const dispatch = useDispatch();
  console.log('ME update interests screen:  ', me.interests);
  return (
    <View style={styles.container}>
      <Text
        style={{
          width: '100%',
          fontSize: 16,
          color: 'black',
          fontWeight: '700',
          marginVertical: 5,
        }}>
        Select your interests:
      </Text>
      {tags.map((data, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.6}
          onPress={() => {
            if (selectedTags.includes(data.name)) {
              setSelectedTags(selectedTags.filter(tag => tag != data.name));
            } else {
              setSelectedTags(oldArr => [...oldArr, data.name]);
            }
            // setSelectedTags(data.name);
          }}>
          <View
            style={{
              marginVertical: 5,
              marginHorizontal: 2,
              width: 110,
              padding: 5,
              borderRadius: 5,
              backgroundColor: selectedTags.includes(data.name)
                ? 'blue'
                : '#3b82f6',
              borderColor: selectedTags.includes(data.name)
                ? '#1d4ed8'
                : '#3b82f6',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: selectedTags.includes(data.name) ? 18 : 16,
                fontWeight: selectedTags.includes(data.name)
                  ? 'bold'
                  : 'normal',
                alignSelf: 'center',
              }}>
              {data.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <View style={{width: '100%', marginVertical: 10}}>
        <Button
          onPress={() => {
            updateInterests(selectedTags, me._id)
              .then(res => {
                console.log(res);
                if (res.success) {
                  setTimeout(() => {
                    dispatch(updateMeState(res.user));
                    Alert.alert('Interests Updated');
                  }, 1000);
                } else {
                  Alert.alert('Failed to update, try again,');
                }
              })
              .catch(() => {
                Alert.alert('Failed to update, try again,');
              });
          }}
          color="white"
          style={styles.button}>
          Update Interests
        </Button>
      </View>
    </View>
  );
};

export default UpdateInterests;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 2,
  },
  button: {
    backgroundColor: '#0369a1',
    width: '50%',
    alignSelf: 'center',
  },
});
