import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  //   TextInput,
  Text,
  Alert,
  RefreshControl,
} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
// import { Icon} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CommentComponent from '../Components/CommentComponent';
import {useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getOnePost, newComment} from '../Api/postApis';
import {RootState} from '../Redux/store/store';
import {IPost} from '../Interfaces/PostInterfaces';

const image = require('../Assets/goku.png');
const width = Dimensions.get('screen').width;

const ViewPostScreen = ({navigation, route}: any) => {
  const [commentBody, setCommentBody] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [post, setPost] = useState<IPost>();
  const [loading, setLoading] = useState(true);
  const {Icon} = TextInput;
  const me = useSelector((state: RootState) => state.me.value);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getOnePost(selectedPost._id)
      .then(res => {
        setPost(res.data);
        setRefreshing(false);
      })
      .catch(() => {
        Alert.alert('Failed to retreive post');
      });
  }, []);

  const publishComment = () => {
    if (commentBody.length > 0) {
      newComment(me.firstName, commentBody, me.profilePic, selectedPost._id)
        .then(res => {
          Alert.alert('Success', 'Created new comment');
        })
        .catch(error => {
          Alert.alert('Failed to create comment');
        });
    } else {
      Alert.alert('Failed', 'Comment too short');
    }
  };
  useEffect(() => {
    getOnePost(selectedPost._id)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert('Failed to retreive post');
        setLoading(false);
      });
  }, []);

  const {selectedPost} = route.params;
  return (
    <View style={styles.viewPostContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading</Text>
          <ActivityIndicator color="#1d4ed8" />
        </View>
      ) : (
        <>
          <View style={styles.postContainer}>
            <Text style={{padding: 10, fontSize: 16, color: 'black'}}>
              {post?.postBody}
            </Text>
            <View
              style={{width: '100%', height: 1, backgroundColor: 'lightgrey'}}
            />
            <View style={styles.optionsBar}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Image
                    source={{uri: post?.creatorImage}}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      backgroundColor: 'black',
                      marginRight: width * 0.02,
                    }}
                  />
                </View>
                <Text style={{fontWeight: 'bold'}}>{post?.creatorName}</Text>
              </View>
            </View>
            <View
              style={{width: '100%', height: 1, backgroundColor: 'lightgrey'}}
            />
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={['blue']}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            style={styles.commentContainer}>
            {post?.comments.map((comment: any, index: any) => (
              <CommentComponent
                key={index}
                commentBody={comment?.commentBody}
              />
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              value={commentBody}
              onChangeText={text => setCommentBody(text)}
              style={styles.msgInput}
              placeholder={'Please enter your comment'}
            />
            <Button
              onPress={() => {
                publishComment();
                setCommentBody('');
              }}
              style={{backgroundColor: '#1d4ed8', margin: 10}}>
              <FontAwesome5Icon name="paper-plane" color="white" size={20} />
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default ViewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    backgroundColor: 'white',
  },
  viewPostContainer: {
    backgroundColor: 'white',

    flex: 1,
    width,
  },
  optionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.04,
  },
  commentContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  postContainer: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  msgInput: {height: 40, width: '70%'},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
