import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  navigation: any;
  route: any;
};

const ChatroomDetails = ({navigation, route}: Props) => {
  let {chatroom} = route.params;
  console.log('CHAT: ', chatroom);
  return (
    <View style={styles.container}>
      <Image source={{uri: ''}} style={styles.image}></Image>
      <Text>{chatroom.chatroomName}</Text>
    </View>
  );
};

export default ChatroomDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    backgroundColor: 'black',
    height: '58%',
    width: '70%',
    borderRadius: 600,
  },
});
