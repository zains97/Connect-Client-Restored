import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button} from 'react-native-paper';
import {IUser} from '../Interfaces/UserInterface';
import {getBlockedUsers, getUser, unblockUser} from '../Api/userApis';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {useUpdateMe} from '../Utilities/UserUtils';
import {updateMeState} from '../Redux/slices/MeSlice';

type Props = {};

const BlockedUsers = (props: Props) => {
  const [blockedUsers, setBlockedUsers] = useState<IUser[]>();
  const [loading, setLoading] = useState(true);

  const me = useSelector((state: RootState) => state.me.value);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    getBlockedUsers(me._id)
      .then(res => {
        if (res.success) {
          setBlockedUsers(res.blockedUsers);
        } else {
          Alert.alert('Failed to load users');
        }
      })
      .catch(err => {
        Alert.alert('Failed to load users');
      });
    setLoading(false);
  }, []);

  const unblockOnPress = (userId: string, otherId: string) => {
    unblockUser(userId, otherId)
      .then(() => {
        console.log('\n\nTESTING');
        setTimeout(() => {
          getUser(userId)
            .then(res => {
              console.log(res.data.blockedUsers);
              dispatch(updateMeState(res.data));
            })
            .catch(() => {});
        }, 2000);
      })
      .catch(() => {});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.text}>Blocked users</Text>
      </View>
      {!loading ? (
        blockedUsers?.length > 0 ? (
          blockedUsers?.map((user, index) => (
            <View key={index}>
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
                  onPress={() => unblockOnPress(me._id, user._id)}
                  color="white"
                  style={styles.button}>
                  <Text>Unblock</Text>
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
            You haven't blocked anyone.
          </Text>
        )
      ) : (
        <ActivityIndicator style={{marginVertical: '50%'}} />
      )}
    </ScrollView>
  );
};

export default BlockedUsers;

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
