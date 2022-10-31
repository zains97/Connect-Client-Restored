import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import logo from '../Assets/modifiedConnectLogo.png';

type Props = {};
const {width} = Dimensions.get('screen');

const Header = (props: Props) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={logo} style={styles.logo} />
      <Text
        style={{
          fontWeight: '900',
          color: 'white',
          fontSize: 18,
        }}>
        Connect
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
  },
  logo: {
    width: 33,
    height: 33,
    borderRadius: 50,
    backgroundColor: '#1d4ed8',
    marginRight: 5,
    resizeMode: 'contain',
  },
});
