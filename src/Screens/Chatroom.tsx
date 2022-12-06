import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Button, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store/store';
import {connect, Socket} from 'socket.io-client';
import {sendMessage} from '../Api/userApis';
import {text} from '@cloudinary/url-gen/qualifiers/source';
import {IMessage} from '../Interfaces/IMessage';
import {getAllMessages} from '../Api/chatroomApi';

const SERVER = 'https://whispering-mesa-47615.herokuapp.com/';
let socket: Socket;
type Props = {
  route: any;
  navigation: any;
};

const {width} = Dimensions.get('screen');

const Chatroom = (props: Props) => {
  let [messageArr, setMessageArr] = useState<IMessage[]>([]);
  const [messageBody, setMessageBody] = useState('');
  const [toggler, setToggler] = useState(false);
  const me = useSelector((state: RootState) => state.me.value);
  const [chatroomId, setChatroomId] = useState('');

  let {chatroom, otherParticipant} = props.route.params;
  const startCall = () => {
    props.navigation.navigate('VideoCall');
    // socket.emit('callUser', {message: 'Starting call'});
  };

  socket = useSelector(state => state.socket.value);

  const sendMessage = (messageBody: string) => {
    socket.emit(
      'sendMessage',
      {
        messageBody,
        sender: me,
        chatroomId: chatroom._id,
      },
      (hasError: boolean, message: IMessage) => {
        if (!hasError) {
          setMessageBody('');
          setMessageArr(oldArr => [message, ...oldArr]);
        } else {
          Alert.alert('Something went wrong');
        }
      },
    );
  };

  useEffect(() => {
    // socket = connect(SERVER);
    socket.emit('joinRoom', {chatroomId: chatroom._id});
    socket.on('message', message => {
      setMessageArr(oldArr => [message, ...oldArr]);
    });
    return () => {};
  }, []);

  useEffect(() => {
    getAllMessages(chatroom._id)
      .then(res => {
        if (res.success == true) {
          setMessageArr(res.messages);
        } else {
          Alert.alert('Failed to load messages');
        }
      })
      .catch(() => {
        Alert.alert('Failed to load messages');
      });
  }, []);
  return (
    <View style={styles.chatRoomContainer}>
      <View style={styles.chatRoomHeader}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            source={{
              uri: otherParticipant?.profilePic,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.headerNameContainer}>
          <Text style={styles.headerName}>
            {chatroom?.participants.length > 2 ? (
              <>{chatroom?.chatroomName}</>
            ) : (
              <>{otherParticipant?.firstName}</>
            )}
          </Text>
        </View>
        {/* <View style={styles.headerIconsContainer}>
          <TouchableOpacity onPress={startCall}>
            <FontAwesome5Icon size={20} name="phone" color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5Icon size={20} name="video" color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5Icon size={20} name="ellipsis-v" color={'white'} />
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={styles.chatRoomBody}>
        <FlatList
          inverted
          style={{backgroundColor: '#eeeeee'}}
          data={messageArr}
          renderItem={({item, index}) => {
            if (item.sender._id == me._id) {
              return (
                <View
                  style={{
                    backgroundColor: '#0078fe',
                    padding: 10,
                    marginTop: 5,
                    marginRight: '5%',
                    maxWidth: '70%',
                    alignSelf: 'flex-end',
                    borderRadius: 20,
                    marginBottom: 1,
                  }}
                  key={index}>
                  <Text style={{fontSize: 16, color: '#fff'}} key={index}>
                    {item.messageBody}
                  </Text>
                  <View style={styles.rightArrow}></View>
                  <View style={styles.rightArrowOverlap}></View>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    backgroundColor: '#dedede',
                    padding: 10,
                    marginTop: 5,
                    marginLeft: '5%',
                    maxWidth: '70%',
                    alignSelf: 'flex-start',
                    borderRadius: 20,
                    marginBottom: 1,
                  }}
                  key={index}>
                  <Text style={{fontSize: 12}}>
                    {item.sender.firstName + ' ' + item.sender.lastName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                      justifyContent: 'center',
                    }}
                    key={index}>
                    {item.messageBody}
                  </Text>
                  <View style={styles.leftArrow}></View>
                  <View style={styles.leftArrowOverlap}></View>
                </View>
              );
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={messageBody}
          onChangeText={text => {
            setMessageBody(text);
          }}
          style={styles.msgInput}
          placeholder={'Chat away!'}
        />
        <Button
          onPress={() => {
            if (messageBody.length > 0) {
              sendMessage(messageBody);
            }
          }}
          style={{backgroundColor: '#1d4ed8', margin: 10}}>
          <FontAwesome5Icon name="paper-plane" color="white" size={20} />
        </Button>
      </View>
    </View>
  );
};

export default Chatroom;

const styles = StyleSheet.create({
  chatRoomContainer: {width, flex: 1},
  chatRoomHeader: {flex: 0.8, flexDirection: 'row', backgroundColor: '#1d4ed8'},
  headerNameContainer: {flex: 2.9, justifyContent: 'center'},
  headerName: {color: 'white', fontWeight: 'bold', fontSize: 18},
  headerIconsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingRight: 2,
  },
  chatRoomBody: {flex: 9.2, paddingTop: 5},
  image: {height: 45, width: 45, borderRadius: 50},
  imageContainer: {flex: 1.1, justifyContent: 'center', alignItems: 'center'},
  rightArrow: {
    position: 'absolute',
    backgroundColor: '#0078fe',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#eeeeee',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  /*Arrow head for recevied messages*/
  leftArrow: {
    position: 'absolute',
    backgroundColor: '#dedede',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#eeeeee',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  msgInput: {height: 40, width: '70%'},
});
