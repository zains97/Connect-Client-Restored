import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const MyChatBubble = (props: Props) => {
  const messages = [
    {id: 1, body: 'Hi there from zain.', sender: 'Me'},
    {id: 2, body: 'Hi there from Ahsan.'},
    {id: 3, body: 'Hi there from zain.', sender: 'Other'},
    {id: 4, body: 'Hi there from Ahsan.', sender: 'Me'},
    {id: 5, body: 'Hi there from Ahsan.', sender: 'Other'},
  ];

  return (
    <FlatList
      //inverted
      style={{backgroundColor: '#eeeeee'}}
      data={messages}
      renderItem={({item, index}) => {
        if ((item.sender = 'Me')) {
          //change as per your code logic
          return (
            <View
              style={{
                backgroundColor: '#0078fe',
                padding: 10,
                marginLeft: '45%',
                // borderRadius: 5,
                marginTop: 5,
                marginRight: '5%',
                maxWidth: '50%',
                alignSelf: 'flex-end',
                borderRadius: 20,
              }}
              key={index}>
              <Text style={{fontSize: 16, color: '#fff'}} key={index}>
                {' '}
                {item.body}
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
                // borderRadius: 5,
                marginTop: 5,
                marginLeft: '5%',
                maxWidth: '50%',
                alignSelf: 'flex-start',
                //maxWidth: 500,
                //padding: 14,

                //alignItems:"center",
                borderRadius: 20,
              }}
              key={index}>
              <Text
                style={{fontSize: 16, color: '#000', justifyContent: 'center'}}
                key={index}>
                {' '}
                {item.body}
              </Text>
              <View style={styles.leftArrow}></View>
              <View style={styles.leftArrowOverlap}></View>
            </View>
          );
        }
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default MyChatBubble;

const styles = StyleSheet.create({
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
});
