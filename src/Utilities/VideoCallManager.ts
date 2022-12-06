import {mediaDevices} from 'react-native-webrtc';

export default class VideoCallManager {
  //   static async getStream() {
  //     let cameraCount = 0;

  //       const devices = await mediaDevices.enumerateDevices();
  //       console.log('DEVICES:', devices);
  //       console.log('MD LOG', mediaDevices);

  //       for (let index = 0; index < devices.length; index++) {
  //         const element = devices[index];

  //       }
  //     //   devices.map(device => {
  //     //     if (device.kind != 'videoinput') {
  //     //       return;
  //     //     }

  //         cameraCount = cameraCount + 1;
  //       });

  //     let mediaConstraints = {
  //       audio: true,
  //       video: true,
  //     };
  //     let localMediaStream;
  //     let isVoiceOnly = false;
  //     // try {
  //     //   console.log('Before');
  //     //   //Is line mai error
  //     //   const mediaStream = await mediaDevices.getUserMedia({
  //     //     audio: true,
  //     //     video: true,
  //     //   });
  //     // //   console.log('MEDIA STREAM', mediaStream);
  //     // } catch (error) {}

  //     // try {
  //     //   const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);
  //     //   console.log(mediaStream);
  //     //   if (isVoiceOnly) {
  //     //     let videoTrack = await mediaStream.getVideoTracks()[0];
  //     //     videoTrack.enabled = false;
  //     //   }

  //     //   localMediaStream = mediaStream;
  //     //   console.log('LOCAL MEDAI STREAM:', localMediaStream);
  //     //   if (typeof localMediaStream != 'boolean') return localMediaStream;
  //     //   //   return null;
  //     // } catch (err) {
  //     //   console.log('ERROR', err);
  //     //   // Handle Error
  //     // }
  //   }
  static async getStream() {
    let isFront = true;
    const sourceInfos = await mediaDevices.enumerateDevices();
    console.log('DEVICES:', sourceInfos);
    console.log('MD LOG', mediaDevices);
    let videoSourceId;

    for (let index = 0; index < sourceInfos.length; index++) {
      const sourceInfo = sourceInfos[index];
      if (
        sourceInfo.kind == 'videoinput' &&
        sourceInfo.facing == (isFront ? 'front' : 'environment')
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480,
        frameRate: 30,
        facingMode: isFront ? 'front' : 'environment',
        deviceId: videoSourceId,
      },
    });

    if (typeof stream != 'boolean') return stream;
    return null;
  }
}
