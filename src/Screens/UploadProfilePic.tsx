import {Alert, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {uploadPicture} from '../Api/userApis';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {updateMeState} from '../Redux/slices/MeSlice';

type Props = {};

const UploadProfilePic = (props: Props) => {
  const [image, setImage] = useState('');

  const me = useSelector((state: RootState) => state.me.value);
  const dispatch = useDispatch();

  const cloudinaryUpload = (photo: any) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'connect');

    axios
      .post('https://api.cloudinary.com/v1_1/connect123/image/upload', {
        file: photo,
        upload_preset: 'connect',
      })
      .then(async res => {
        if (res.status == 200) {
          return await uploadPicture(me._id, res.data.secure_url);
        } else {
          Alert.alert('Sorry', 'Could not update photo');
        }
      })
      .then(res2 => {
        if (res2.success == true) {
          dispatch(updateMeState(res2.user));
          Alert.alert('Successfully uploaded image');
        } else {
          Alert.alert('Sorry', 'Could not fetch user');
        }
      })
      .catch(e => Alert.alert(e.message));
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {image != '' ? (
        <>
          <Image style={{height: 500, width: '100%'}} source={{uri: image}} />
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                cloudinaryUpload(image);
              }}
              color="white"
              style={{backgroundColor: '#3b82f6'}}>
              Upload
            </Button>
            <Button
              onPress={() => {
                setImage('');
              }}
              color="white"
              style={{backgroundColor: '#ef4444'}}>
              Remove
            </Button>
          </View>
        </>
      ) : (
        <Button
          onPress={() => {
            launchImageLibrary({
              includeBase64: true,
              mediaType: 'photo',
            })
              .then(res => {
                if (res.assets) {
                  setImage(`data:image/jpeg;base64,${res.assets[0].base64}`);
                }
              })
              .catch(e => Alert.alert(e));
          }}
          color="white"
          style={{backgroundColor: '#1d4ed8'}}>
          Upload Profile Pic
        </Button>
      )}
    </View>
  );
};

export default UploadProfilePic;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '80%',
  },
});
