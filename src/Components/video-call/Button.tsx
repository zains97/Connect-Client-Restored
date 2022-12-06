import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {
  onPress: any;
  iconName: string;
  backgroundColor: string;
  style?: any;
}

const Button = (props: Props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          {backgroundColor: props.backgroundColor},
          props.style,
          styles.button,
        ]}>
        <FontAwesome5 name={props.iconName} color="white" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
