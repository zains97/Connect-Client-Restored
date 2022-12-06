import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MediaStream, RTCView} from 'react-native-webrtc';
import Button from '../../Components/video-call/Button';

type Props = {
  hangUp: () => void;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
};

const ButtonContainer = (props: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <Button backgroundColor="red" iconName="phone" onPress={props.hangUp} />
    </View>
  );
};

const Video = (props: Props) => {
  if (props.localStream && !props.remoteStream) {
    //Only display my stream when call starts
    return (
      <View>
        <RTCView
          streamURL={props.localStream.toURL()}
          objectFit="cover"
          style={styles.video}
        />
      </View>
    );
  }

  if (props.localStream && props.remoteStream) {
    //Only display my stream when call starts
    return (
      <View>
        <RTCView
          streamURL={props.remoteStream.toURL()}
          objectFit="cover"
          style={styles.video}
        />
        <RTCView
          streamURL={props.localStream.toURL()}
          objectFit="cover"
          style={styles.localVideo}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Video</Text>
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    bottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  localVideo: {
    position: 'absolute',
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 10,
  },
});
