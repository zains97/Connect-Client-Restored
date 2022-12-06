import {EventEmitter, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
import GettingCall from './video-call/GettingCall';
import Video from './video-call/Video';
import Button from '../Components/video-call/Button';
import VideoCallManager from '../Utilities/VideoCallManager';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

type Props = {};

const VideoCall = (props: Props) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [gettingCall, setGettingCall] = useState(false);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);

  const configuration = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };

  const setupWebrtc = async () => {
    pc.current = new RTCPeerConnection(configuration);
    const stream = await VideoCallManager.getStream();
    if (stream) {
      setLocalStream(stream);
      pc.current.addStream(stream);
      //Get remote stream
      pc.current.addEventListener('addstream', (event: any) => {
        setRemoteStream(event.stream);
      });
    }
  };

  const create = async () => {
    console.log('Calling');
    connecting.current = true;
    await setupWebrtc();
    // const cRef = firestore().collection('meet').doc('chatId');
    // //Collect ice cantidates
    // collectIceCandidate(cRef, 'caller', 'callee');
    // if (pc.current) {
    //   const offer = await pc.current.createOffer();
    //   pc.current.setLocalDescription(offer);
    //   const cWithOffer = {
    //     offer: {
    //       type: offer.type,
    //       sdp: offer.sdp,
    //     },
    //   };
    //   cRef.set(cWithOffer);
    // }
  };

  const join = async () => {};
  const hangup = async () => {};

  const collectIceCandidate = async (
    cRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string,
  ) => {
    const candidateCollection = cRef.collection(localName);
    if (pc.current) {
      pc.current.addEventListener('icecandidate', (event: any) => {
        if (event.candidate) {
          candidateCollection.add(event.candidate);
        }
      });
    }
    cRef.collection(remoteName).onSnapshot(snapshot => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type == 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current?.addIceCandidate(candidate);
        }
      });
    });
  };

  //Display getting call
  if (gettingCall) {
    return <GettingCall hangUp={hangup} join={join} />;
  }

  //Display local stream on calling and both streams when connected
  if (localStream) {
    return (
      <Video
        hangUp={hangup}
        localStream={localStream}
        remoteStream={remoteStream}
      />
    );
  }
  //Display call button
  return (
    <View style={styles.container}>
      <Button iconName="video" backgroundColor="grey" onPress={create} />
    </View>
  );
};

export default VideoCall;

const styles = StyleSheet.create({
  container: {},
});
