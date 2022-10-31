import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Paragraph,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {IPost} from '../Interfaces/PostInterfaces';
import {
  deletePost,
  getTrendingPosts,
  likePost,
  reportPost,
} from '../Api/postApis';
import {checkBlocked} from '../Utilities/checkBlocked';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TrendingPosts = ({navigation}: any) => {
  //Component start
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.me.value);

  const LeftContent = (image: any, userId: string) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OtherProfile', {userId}); //Add props for navigation UserID
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
    getTrendingPosts()
      .then(res => setPosts(res))
      .catch(() => Alert.alert('Failed to retrieve posts'));
    setLoading(false);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTrendingPosts()
      .then(res => {
        setPosts(res);
        setRefreshing(false);
      })
      .catch(() => {
        Alert.alert('Failed to retrieve posts');
        setRefreshing(false);
      });
  }, []);

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

                <Card.Actions>
                  <Button
                    onPress={() => {
                      likePost(me._id, item._id, item);
                    }}>
                    <MaterialCommunityIcons
                      name="thumb-up-outline"
                      color="#1d4ed8"
                      size={22}
                    />
                  </Button>
                  <Text style={{color: 'blue'}}>
                    {item.likeCount == undefined ? 0 : item.likeCount}
                  </Text>
                  <Button
                    onPress={() => {
                      navigation.navigate('ViewPost', {selectedPost: item});
                    }}
                    color="#1d4ed8">
                    Comments
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
            ) : (
              <></>
            )
          }
        />
      )}
    </View>
  );
};

export default TrendingPosts;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignContent: 'center'},
});
