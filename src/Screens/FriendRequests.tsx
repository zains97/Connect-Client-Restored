import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FriendRequest} from '../Components';
import {getFriendRequests} from '../Api/friendsApi';
import {RootState} from '../Redux/store/store';
import {useSelector} from 'react-redux';
import {IFriendRequest} from '../Interfaces/UserInterface';
import {ActivityIndicator} from 'react-native-paper';

type Props = {};

const FriendRequests = (props: Props) => {
  const me = useSelector((state: RootState) => state.me.value);
  const [friendRequests, setfriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getFriendRequests(me._id).then(res => {
      setfriendRequests(res);
      setLoading(false);
    });
  }, []);

  return (
    <View>
      {!loading ? (
        friendRequests.length > 0 ? (
          friendRequests.map((friendRequest: IFriendRequest, index) => (
            <FriendRequest
              key={index}
              recipientId={me._id}
              requesterId={friendRequest.requester.userId}
              requestId={friendRequest._id}
              requesterName={friendRequest.requester.name}
              profilePic={friendRequest.requester.profilePic}
              setfriendRequests={setfriendRequests}
              friendRequests={friendRequests}
            />
          ))
        ) : (
          <Text
            style={{
              alignSelf: 'center',
              color: 'black',
              fontSize: 16,
              marginVertical: '50%',
            }}>
            You dont have any requests
          </Text>
        )
      ) : (
        <ActivityIndicator style={{marginVertical: '50%'}} />
      )}
    </View>
  );
};

export default FriendRequests;

const styles = StyleSheet.create({});
