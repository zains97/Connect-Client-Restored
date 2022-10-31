import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const MapHeader = (props: Props) => {
  return (
    <View>
      <Text>Map Header</Text>
    </View>
  );
};

export default MapHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'red',
    height: 10,
    position: 'absolute',
    bottom: 24,
  },
});
