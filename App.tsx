import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Splash, MainApp, AuthStack} from './src/Screens';
import {Provider as PaperProvider} from 'react-native-paper';
import {store} from './src/Redux/store/store';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {
  notificationListener,
  requestUserPermission,
} from './src/config/notificationHelper';

type Props = {};

const App = (props: Props) => {
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage.notification);
      Alert.alert(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
      );
    });

    return unsubscribe;
  }, []);
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
