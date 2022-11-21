import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
  Touchable,
} from 'react-native';
import React from 'react';
import {
  deletePost,
  getAllPosts,
  getInterestedPosts,
  likePost,
  reportPost,
  unlikePost,
} from '../Api/postApis';
import {IPost} from '../Interfaces/PostInterfaces';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Paragraph,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {checkBlocked} from '../Utilities/checkBlocked';
import {connect, Socket} from 'socket.io-client';
import {updateSocketState} from '../Redux/slices/SocketSlice';

type Props = {
  navigation: any;
};
const {width} = Dimensions.get('screen');

const SERVER = 'http://192.168.0.106:5000/';
let socket: Socket;

const MainFeed = ({navigation}: Props) => {
  //Component start
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.me.value);
  const LeftContent = (image: any, userId: string) => (
    <TouchableOpacity
      onPress={() => {
        if (userId != me._id) {
          navigation.navigate('OtherProfile', {userId}); //Add props for navigation UserID}
        } else {
          navigation.navigate('Profile');
        }
      }}>
      <Avatar.Image size={40} source={{uri: image}} />
    </TouchableOpacity>
  );

  const defaultPosts: IPost[] = [];
  const [refreshing, setRefreshing] = React.useState(false);

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] =
    React.useState(defaultPosts);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    socket = connect(SERVER);
    dispatch(updateSocketState(socket));
    // socket.emit('test', {user: me, msg: 'From main'});
  }, []);

  React.useEffect(() => {
    getInterestedPosts(me.interests)
      .then(res => {
        if (res.success == true) {
          setPosts(res.posts);
          setLoading(false);
        } else {
          Alert.alert('Sorry', 'Could not fetch posts');
          setLoading(false);
        }
      })
      .catch(() => {
        Alert.alert('Sorry', 'Could not fetch posts');
        setLoading(false);
      });

    return () => {};
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getInterestedPosts(me.interests)
      .then(res => {
        if (res.success == true) {
          setPosts(res.posts);
          setRefreshing(false);
        } else {
          Alert.alert('Sorry', 'Could not fetch posts');
          setRefreshing(false);
        }
      })
      .catch(() => {
        Alert.alert('Sorry', 'Could not fetch posts');
        setRefreshing(false);
      });
  }, []);
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="#1d4ed8" />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              colors={['blue']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          style={{margin: 20}}
          data={posts}
          renderItem={({item}) =>
            !checkBlocked(item.creator, me.blockedUsers) ? (
              <TouchableOpacity
                onLongPress={() => {
                  setModalVisible(true);
                }}>
                <Card style={{marginVertical: 5}}>
                  <Card.Title
                    title={item.creatorName}
                    subtitle={item.createDate.toString()}
                    left={() => LeftContent(item.creatorImage, item.creator)}
                    titleStyle={{fontSize: 16}}
                  />

                  {item.postImage == undefined ||
                  item.postImage == 'no' ? null : (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('PictureDisplay', {
                          image: item.postImage,
                        });
                      }}>
                      <Card.Cover
                        resizeMethod="resize"
                        resizeMode="cover"
                        source={{
                          uri: `data:image/jpeg;base64,${item.postImage}`,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  <Card.Content>
                    <Paragraph>{item.postBody}</Paragraph>
                  </Card.Content>

                  <Card.Actions
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    <Button
                      onPress={() => {
                        if (item.likers.includes(me._id)) {
                          unlikePost(me._id, item._id);
                        } else {
                          likePost(me._id, item._id, item);
                        }
                      }}>
                      {item.likers.includes(me._id) ? (
                        <MaterialCommunityIcons
                          name="thumb-up"
                          color="#1d4ed8"
                          size={20}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="thumb-up-outline"
                          color="#1d4ed8"
                          size={20}
                        />
                      )}
                    </Button>
                    <Text style={{color: 'blue'}}>
                      {item.likeCount == undefined ? 0 : item.likeCount}
                    </Text>
                    <Button
                      onPress={() => {
                        navigation.navigate('ViewPost', {selectedPost: item});
                      }}
                      color="#1d4ed8">
                      Comments {item.comments.length}
                    </Button>

                    {item.creator == me._id ? (
                      <Button
                        onPress={() => {
                          deletePost(item._id);
                        }}
                        color="white"
                        style={{
                          backgroundColor: 'red',
                          marginHorizontal: '5%',
                        }}>
                        Delete
                      </Button>
                    ) : (
                      <Button
                        onPress={() => {
                          reportPost(me._id, item._id);
                          console.log('Report');
                        }}
                        color="white"
                        style={{
                          backgroundColor: 'red',
                          marginHorizontal: '5%',
                        }}>
                        Report
                      </Button>
                    )}
                  </Card.Actions>
                </Card>
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
        />
      )}
    </View>
  );
};

export default MainFeed;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignContent: 'center'},
});
