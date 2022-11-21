import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Splash, MainApp, AuthStack} from './src/Screens';
import {Provider as PaperProvider} from 'react-native-paper';
import {store} from './src/Redux/store/store';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

type Props = {};

const App = (props: Props) => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
