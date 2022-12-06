import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../../Components/video-call/Button';

interface Props {
  hangUp: () => void;
  join: () => void;
}

const GettingCall = (props: Props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={{uri: '../../Assets/test/person.jpeg'}}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={props.join}
            iconName={'phone'}
            backgroundColor="green"
            style={{marginRight: 30}}
          />
          <Button
            onPress={props.hangUp}
            iconName={'phone'}
            backgroundColor="red"
            style={{marginRight: 30}}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default GettingCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 30,
  },
});
