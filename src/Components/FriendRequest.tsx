import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {acceptFriendRequest, cancelFriendRequest} from '../Api/friendsApi';
import {IFriendRequest} from '../Interfaces/UserInterface';
import {useDispatch} from 'react-redux';
import {updateMeState} from '../Redux/slices/MeSlice';

type Props = {
  requesterFirstName: string;
  requesterLastName: string;
  requesterId: string;
  profilePic: string;
  recipientId: string;
  requestId: String;
  setfriendRequests: any;
  friendRequests: any;
};

const FriendRequest = ({
  requesterFirstName,
  requesterLastName,
  profilePic,
  recipientId,
  requesterId,
  requestId,
  setfriendRequests,
  friendRequests,
}: Props) => {
  let dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          source={{
            uri: profilePic as any,
          }}
          style={styles.image}
        />
        <Text style={styles.name}>
          {requesterFirstName + ' ' + requesterLastName}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            acceptFriendRequest(requesterId, recipientId, requestId)
              .then(res => {
                setTimeout(() => {
                  dispatch(updateMeState(res));
                }, 500);
              })
              .catch(error => {});
            setfriendRequests(
              friendRequests.filter(
                (req: IFriendRequest) => req._id != requestId,
              ),
            );
          }}
          style={styles.buttonBlue}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            cancelFriendRequest(requesterId, recipientId)
              .then(res => {
                console.log('cancelFriendRequest RES: ', res);
                if (res.success != true) {
                  Alert.alert('Something went wrong');
                } else {
                  dispatch(updateMeState(res.user));
                  setfriendRequests(
                    friendRequests.filter(
                      (req: IFriendRequest) => req._id != requestId,
                    ),
                  );
                }
              })
              .catch(e => {
                Alert.alert('Something went wrong');
              });
          }}
          style={styles.buttonRed}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  info: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {height: 40, width: 40, borderRadius: 50, marginHorizontal: 10},
  name: {fontSize: 16, fontWeight: '900', color: 'black'},
  buttonBlue: {
    backgroundColor: '#22c55e',
    height: 30,
    marginHorizontal: 5,
    fontSize: 10,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonRed: {
    backgroundColor: '#ef4444',
    height: 30,
    marginHorizontal: 10,
    fontSize: 10,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
