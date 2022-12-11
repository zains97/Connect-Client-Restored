import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllUsers, getMyFriends} from '../Api/userApis';
import {IUser} from '../Interfaces/UserInterface';
import {Button, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {createChatroom} from '../Api/chatroomApi';

type Props = {};

const PersonView = () => {
  const me = useSelector((state: RootState) => state.me.value);

  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([me._id]);
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');

  console.log('Selected user', selectedUsers);
  useEffect(() => {
    getMyFriends(me._id)
      .then(res => {
        setUsers(res.friends);
      })
      .catch(() => {
        Alert.alert('Failure', 'Could not get friends');
      });

    return () => {};
  }, []);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: '800'}}>Please enter group name</Text>
            <TextInput
              onChangeText={text => setGroupName(text)}
              value={groupName}
              style={{
                marginVertical: 10,
                height: 30,
                width: '100%',
              }}></TextInput>
            <Button
              onPress={() => {
                if (selectedUsers.length >= 2 && groupName.length >= 2) {
                  createChatroom(selectedUsers, groupName).then(res => {
                    if (res.success) {
                      Alert.alert('Successfully created chatrrom');
                    } else {
                      console.log(res);
                      Alert.alert('Failed');
                    }
                  });
                } else {
                  Alert.alert(
                    'Either not enough participants or name to short ',
                  );
                }
              }}
              color="white"
              style={{backgroundColor: 'blue'}}>
              Create Group
            </Button>
            <Button
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              color="white"
              style={{backgroundColor: 'red', marginVertical: 5}}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <Button
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          color="white"
          style={{
            marginVertical: 5,
            height: 40,
            width: '50%',
            backgroundColor: 'blue',
            alignSelf: 'center',
          }}>
          Create Room
        </Button>
        {users?.map((user, index) =>
          me._id != user._id ? (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (selectedUsers?.includes(user._id)) {
                  let temp = selectedUsers.filter(userId => {
                    return user._id != userId;
                  });
                  setSelectedUsers(temp);
                } else {
                  setSelectedUsers(oldArr => [...oldArr, user._id]);
                }
              }}
              style={[
                styles.container,
                {
                  backgroundColor: !selectedUsers.includes(user._id)
                    ? 'white'
                    : 'gray',
                },
              ]}>
              <View style={styles.info}>
                <Image
                  source={{
                    uri: user.profilePic as any,
                  }}
                  style={styles.image}
                />
                <Text style={styles.name}>
                  {user?.firstName + ' ' + user.lastName}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <></>
          ),
        )}
      </ScrollView>
    </View>
  );
};

const SelectPersonToChat = (props: Props) => {
  return (
    <View>
      <PersonView />
    </View>
  );
};

export default SelectPersonToChat;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    backgroundColor: 'white',
  },
  info: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
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
  image: {height: 40, width: 40, borderRadius: 50, marginHorizontal: 10},
  name: {fontSize: 16, fontWeight: '900', color: 'black'},
});
