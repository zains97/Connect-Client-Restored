import {StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {VideoCall, VoiceCall, TextChat} from '.';

const ChatTab = createMaterialTopTabNavigator();

type Props = {};

const Chat = (props: Props) => {
  return (
    <ChatTab.Navigator transitionStyle="scroll">
      <ChatTab.Screen name="Text Chat" component={TextChat} />
      <ChatTab.Screen name="Voice Call" component={VoiceCall} />
      <ChatTab.Screen name="Video Call" component={VideoCall} />
    </ChatTab.Navigator>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
