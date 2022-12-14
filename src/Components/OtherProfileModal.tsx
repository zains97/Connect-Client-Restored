import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  cancelFriendRequest,
  sendFriendRequest,
  unfriend,
} from '../Api/friendsApi';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {useDispatch} from 'react-redux';
import {updateMeState} from '../Redux/slices/MeSlice';
import {blockUser, getUser, unblockUser} from '../Api/userApis';

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  userId: any;
  isBlocked: boolean;
}

const {width} = Dimensions.get('screen');
const OtherProfileModal = ({
  modalVisible,
  setModalVisible,
  userId,
  isBlocked,
}: Props) => {
  const me = useSelector((state: RootState) => state.me.value);
  const dispatch = useDispatch();
  const [sendRequestDisabled, setSendRequestDisabled] = useState(false);
  console.log('OtherProfileModal blocked users: ', me.blockedUsers);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        {/* //Unblock */}
        <View style={styles.modalView}>
          {me.blockedUsers.includes(userId) ? (
            <TouchableOpacity
              style={styles.modalPress}
              onPress={async () => {
                let response = await unblockUser(me._id, userId);
                if (response.success) {
                  dispatch(updateMeState(response.user));
                } else {
                  Alert.alert('Failed to unblock user!');
                }
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Unblock User</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.modalPress}
              onPress={async () => {
                //Check
                let response = await blockUser(me._id, userId);
                if (response.success) {
                  dispatch(updateMeState(response.user));
                } else {
                  Alert.alert('Failed to block user');
                }
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Block User</Text>
            </TouchableOpacity>
          )}
          {me.friendsId.includes(userId) ? (
            <>
              <TouchableOpacity
                style={styles.modalPress}
                onPress={() => {
                  setTimeout(async () => {
                    let {success, user} = await unfriend(me._id, userId);
                    console.log('Dispatch user', user);
                    dispatch(updateMeState(user));
                  }, 2000);
                }}>
                <Text style={styles.textStyle}>Unfriend</Text>
              </TouchableOpacity>
            </>
          ) : me.sentFriendRequests.includes(userId) ? (
            //Cancel
            <TouchableOpacity
              style={styles.modalPress}
              onPress={async () => {
                cancelFriendRequest(me._id, userId)
                  .then(res => {
                    if (res.success != true) {
                      Alert.alert('Something went wrong');
                    } else {
                      dispatch(updateMeState(res.user));
                    }
                  })
                  .catch(e => {
                    Alert.alert('Something went wrong');
                  });
              }}>
              <Text style={styles.textStyle}>Cancel Friend Request</Text>
            </TouchableOpacity>
          ) : !me.blockedUsers.includes(userId) ? (
            //Send
            <TouchableOpacity
              style={styles.modalPress}
              disabled={sendRequestDisabled}
              onPress={() => {
                setSendRequestDisabled(true);
                sendFriendRequest(me._id, userId).then(res => {
                  if (res.success == true) {
                    dispatch(updateMeState(res.user));
                  } else {
                    Alert.alert('Sorry', 'Failed to send friend request');
                  }
                });
                setSendRequestDisabled(false);
              }}>
              <Text style={styles.textStyle}>Send Friend Request</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={styles.modalPressWarning}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Close Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OtherProfileModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalPress: {
    padding: 10,
    width: width * 0.5,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
    marginVertical: 10,
  },

  modalPressWarning: {
    padding: 10,
    width: width * 0.5,
    borderRadius: 5,
    backgroundColor: '#f43f5e',
    marginVertical: 10,
  },
});
