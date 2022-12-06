import {
  Modal,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {storeMe} from '../Utilities/StoreMe';

const {width} = Dimensions.get('screen');
interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  navigation: any;
}
const OtherProfileModal = ({
  navigation,
  modalVisible,
  setModalVisible,
}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.modalPress}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('UpdateProfile');
            }}>
            <Text style={styles.textStyle}>Update Profile Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalPress}
            onPress={() => {
              navigation.navigate('UploadProfilePic');
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.textStyle}>Upload picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalPress}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('FriendRequests');
            }}>
            <Text style={styles.textStyle}>Friend Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalPress}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('UpdateInterests');
            }}>
            <Text style={styles.textStyle}>Update Interests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalPress}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('BlockedUsers');
            }}>
            <Text style={styles.textStyle}>Blocked users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalPressWarning}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.textStyle}>Close Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalPressWarning}
            onPress={() => {
              storeMe(null);
              setModalVisible(!modalVisible);
              navigation.replace('Login');
            }}>
            <Text style={styles.textStyle}>Log Out</Text>
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
    padding: 35,
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
    width: width * 0.4,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
    marginVertical: 10,
  },

  modalPressWarning: {
    padding: 10,
    width: width * 0.4,
    borderRadius: 5,
    backgroundColor: '#f43f5e',
    marginVertical: 10,
  },
});
