import {
  Alert,
  Dimensions,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextChatView} from '../Components';
import {getAllConversations} from '../Api/userApis';
import {Button, TextInput} from 'react-native-paper';
import {deleteChatroom, getChats} from '../Api/chatroomApi';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {IChatroom} from '../Interfaces/IChatroom';
import {IUser} from '../Interfaces/UserInterface';

type Props = {navigation: any};

const {width} = Dimensions.get('screen');

const TextChat = ({navigation}: Props) => {
  const me = useSelector((state: RootState) => state.me.value);
  const [chatrooms, setChatrooms] = useState<IChatroom[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChatroom, setSelectedChatroom] = useState('');
  useEffect(() => {
    getChats(me._id)
      .then(res => {
        if (res?.success) {
          console.log(res);
          setChatrooms(res?.chatrooms);
        } else {
          Alert.alert('Failed to retrieve chats');
        }
      })
      .catch(() => {
        Alert.alert('Failed to retrieve chats');
      });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getChats(me._id)
      .then(res => {
        if (res?.success) {
          setChatrooms(res?.chatrooms);
          setRefreshing(false);
        } else {
          Alert.alert('Failed to retrieve chats');
          setRefreshing(false);
        }
      })
      .catch(() => {
        Alert.alert('Failed to retrieve chats');
        setRefreshing(false);
      });
  };

  const isSingleChat = (chatroom: IChatroom) => {
    if (chatroom?.participants.length > 2) {
      return true;
    } else {
      return false;
    }
  };
  const getOtherParticipant = (participants: IUser[], meId: string) => {
    return participants.filter(participant => me._id != participant._id)[0];
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '700'}}>
              Are you sure you want to delete chatroom?
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                color="white"
                style={[styles.button, {backgroundColor: 'crimson'}]}
                onPress={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  deleteChatroom(
                    selectedChatroom.participants.map(
                      participant => participant._id,
                    ),
                    selectedChatroom._id,
                  );
                }}
                color="white"
                style={[styles.button, {backgroundColor: 'blue'}]}>
                Delete
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Button
        onPress={() => navigation.navigate('SelectChat')}
        color="white"
        style={{backgroundColor: 'blue', width: '80%', marginTop: 10}}>
        New Conversation
      </Button>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        {
          //Populate the chatroom with participants
          chatrooms?.map((chatroom, index) => (
            <TouchableOpacity
              key={index}
              style={styles.textChatContainer}
              onPress={() =>
                navigation.navigate('Chatroom', {
                  chatroom,
                  otherParticipant: !isSingleChat(chatroom)
                    ? getOtherParticipant(chatroom?.participants, me._id)
                    : null,
                })
              }
              onLongPress={() => {
                setSelectedChatroom(chatroom);
                setModalVisible(true);
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri:
                      null ||
                      getOtherParticipant(chatroom.participants, me._id)
                        ?.profilePic, // otherParticipant?.profilePic ,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
              <View style={{flex: 4}}>
                <Text style={styles.heading}>
                  {!isSingleChat(chatroom) ? (
                    <>
                      {getOtherParticipant(chatroom?.participants, me._id)
                        ?.firstName +
                        ' ' +
                        getOtherParticipant(chatroom?.participants, me._id)
                          ?.lastName}
                    </>
                  ) : (
                    <>{chatroom?.chatroomName}</>
                  )}
                </Text>
                <Text style={styles.message}>
                  {/* {chatroom?.lastMessage.messageBody.length > 50
                    ? chatroom?.lastMessage.messageBody.slice(0, 50) + '......'
                    : chatroom?.lastMessage.messageBody} */}
                  {chatroom?.lastMessage ? (
                    <>
                      {chatroom?.lastMessage.messageBody.length > 50
                        ? chatroom?.lastMessage.messageBody.slice(0, 50) +
                          '......'
                        : chatroom?.lastMessage.messageBody}
                    </>
                  ) : (
                    <>No messages yet</>
                  )}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 5,
                }}></View>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
};

export default TextChat;

const styles = StyleSheet.create({
  textChatContainer: {
    width,
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  image: {height: 45, width: 45, borderRadius: 50},
  heading: {color: 'black', fontWeight: 'bold'},
  message: {color: 'black'},
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {},
});
