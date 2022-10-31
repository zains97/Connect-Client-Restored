import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import {IChatroom} from '../Interfaces/IChatroom';
import {getOneChatroom} from '../Api/chatroomApi';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {IUser} from '../Interfaces/UserInterface';

type Props = {
  navigation: any;
  chatroomId: string;
};

const {width} = Dimensions.get('screen');

const TextChatView = ({navigation, chatroomId}: Props) => {
  const [chatroom, setchatroom] = useState<IChatroom>();
  const [otherParticipant, setOtherParticipant] = useState<IUser>();
  const me = useSelector((state: RootState) => state.me.value);
  const navigateToChatroom = () => {
    navigation.navigate('Chatroom', {
      otherParticipant: otherParticipant,
      chatroom: chatroom,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getOneChatroom(chatroomId)
        .then(res => {
          console.log('TCW', res);
          setchatroom(res.chatroom);
        })
        .then(() => {
          let participants = chatroom?.participants;
          let temp = participants?.filter(
            participant => participant?._id != me._id,
          );
          setOtherParticipant(temp[0]);
        })
        .catch(e => {
          console.log(e);
        });
    }, 1000);
  }, [chatroomId]);

  const isSingleChat = (chatroom: IChatroom) => {
    if (chatroom?.participants.length > 2) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <TouchableOpacity
      style={styles.textChatContainer}
      onPress={navigateToChatroom}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={{
            uri: otherParticipant?.profilePic || null,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={{flex: 4}}>
        <Text style={styles.heading}>
          {!isSingleChat(chatroom) ? (
            <>
              {otherParticipant?.firstName + ' ' + otherParticipant?.lastName}
            </>
          ) : (
            <>{chatroom?.chatroomName}</>
          )}
        </Text>
        <Text style={styles.message}>Hi there, this is my first message!</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: 5,
        }}></View>
    </TouchableOpacity>
  );
};

export default TextChatView;

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
});
