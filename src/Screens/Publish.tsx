import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {ITags} from '../Interfaces/PostInterfaces';
import {newPost} from '../Api/postApis';
import {RootState} from '../Redux/store/store';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {tags} from '../Utilities/tags';
interface Props {
  navigation: {jumpTo: any};
}

const Publish = ({navigation}: Props) => {
  const me = useSelector((state: RootState) => state.me.value);

  const {width} = Dimensions.get('screen');

  const [postImage, setImage] = useState<string>();
  const [postBody, setPostBody] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const publishPost = () => {
    if (postBody.length < 10) {
      Alert.alert('Post must be more than 10 characters long.');
    } else {
      if (selectedTags != '') {
        newPost(
          postBody,
          selectedTags,
          me._id,
          me.profilePic,
          me.firstName,
          postImage,
        );
        setSelectedTags('');
        setImage(undefined);
        setPostBody('');
        setTimeout(() => navigation.jumpTo('Home'), 2000);
      } else {
        Alert.alert('You must select a tag.');
      }
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 0.875}}>
        <View style={{marginBottom: 5, justifyContent: 'center'}}>
          <TextInput
            onChangeText={text => setPostBody(text)}
            value={postBody}
            style={{
              width: '100%',
              height: 60,
              padding: 10,
              color: 'black',
              fontSize: 16,
            }}
            placeholder="What's on your mind"
            selectionColor={'orange'}
          />
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: me.profilePic}}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: 'black',
              }}
              resizeMode="cover"
            />
            <Text style={{color: 'black', fontSize: 16, left: 10}}>
              {me.firstName}
            </Text>
          </View>
          <View
            style={{width: '100%', height: 1, backgroundColor: 'lightgrey'}}
          />
          <ScrollView horizontal={true}>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                flexDirection: 'row',
              }}>
              {tags.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  onPress={() => {
                    setSelectedTags(data.name);
                  }}>
                  <View
                    style={{
                      padding: 6,
                      borderRadius: 5,
                      backgroundColor: '#3b82f6',
                      marginHorizontal: 5,
                      borderWidth: 3,
                      borderColor:
                        selectedTags == data.name ? '#1d4ed8' : '#3b82f6',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: selectedTags == data.name ? 18 : 16,
                        fontWeight:
                          selectedTags == data.name ? 'bold' : 'normal',
                      }}>
                      {data.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {postImage != undefined ? (
            <Image
              style={{
                width: width * 0.8,
                height: width * 0.9,
                resizeMode: 'contain',
                borderWidth: 1,
                borderColor: 'red',
              }}
              source={{uri: `data:image/jpeg;base64,${postImage}`}}
            />
          ) : null}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              if (postImage == undefined) {
                launchImageLibrary({
                  includeBase64: true,
                  mediaType: 'photo',
                })
                  .then(res => {
                    if (!res) {
                      return Alert.alert(
                        'Sorry',
                        'Could not fetch image. Please try again',
                      );
                    }
                    setImage(res.assets[0].base64);
                  })
                  .catch(e => Alert.alert(e));
              } else {
                setImage(undefined);
              }
            }}
            style={{
              width: width * 0.5,
              padding: 6,
              borderRadius: 5,
              backgroundColor: postImage == undefined ? '#3b82f6' : '#ef4444',
              marginHorizontal: 5,
              marginVertical: 5,
              borderWidth: 2,
              borderColor: postImage == undefined ? '#1e40af' : '#b91c1c',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 16}}>
              {postImage == undefined ? 'Upload Image' : 'Remove Image'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              publishPost();
            }}
            style={{
              width: width * 0.5,
              padding: 6,
              borderRadius: 5,
              backgroundColor: '#3b82f6',
              marginHorizontal: 5,
              marginVertical: 5,
              borderWidth: 2,
              borderColor: '#1e40af',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 16}}>Publish Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Publish;
