import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button} from 'react-native-paper';
import {IUser} from '../Interfaces/UserInterface';
import {getAllFriends, getMyFriends} from '../Api/userApis';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';

interface Props {
  navigation: any;
}

const MyFriends = ({navigation}: Props) => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<IUser[]>();
  const me = useSelector((state: RootState) => state.me.value);
  console.log('Loading: ', loading);
  useEffect(() => {
    setLoading(true);
    getMyFriends(me._id)
      .then(res => {
        if (res.success) {
          setFriends(res.friends);
        } else {
          Alert.alert('failed to fetch friends');
        }
      })
      .catch(() => {
        Alert.alert('failed to fetch friends');
      });
    setLoading(false);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {!loading ? (
        friends?.length > 0 ? (
          friends?.map((user, index) => (
            <View key={index}>
              <View style={styles.headingContainer}>
                <Text style={styles.text}>Your Friends</Text>
              </View>
              <View style={styles.userContainer}>
                <View style={styles.userInfoContainer}>
                  <Image
                    style={styles.profilePicture}
                    source={{uri: user.profilePic}}
                  />
                  <Text style={styles.text}>
                    {user.firstName + ' ' + user.lastName}
                  </Text>
                </View>
                <Button
                  onPress={() => {
                    navigation.navigate('OtherProfile', {userId: user._id});
                  }}
                  color="white"
                  style={styles.button}>
                  <Text>View Profile</Text>
                </Button>
              </View>
            </View>
          ))
        ) : (
          <Text
            style={{
              alignSelf: 'center',
              color: 'black',
              fontSize: 16,
              marginVertical: '50%',
            }}>
            You don't have any friends yet :(
          </Text>
        )
      ) : (
        <ActivityIndicator style={{marginVertical: '50%'}} />
      )}
    </ScrollView>
  );
};

export default MyFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 60,
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
  },
  userInfoContainer: {flexDirection: 'row', alignItems: 'center'},
  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1d4ed8',
  },
  headingContainer: {
    padding: 10,
  },
});
