import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Chat, Maps, Profile, Publish, Test, TextChat} from './index';
import {Header} from '../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

const BottomTab = createBottomTabNavigator();

const App = (props: any) => {
  return (
    <BottomTab.Navigator
      backBehavior="history"
      screenOptions={{
        headerTitle: props => <Header />,
        headerStyle: styles.headerStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: true,
        tabBarInactiveBackgroundColor: '#1d4ed8',
        tabBarInactiveTintColor: '#eff6ff',
        tabBarActiveTintColor: '#22c55e',
        tabBarActiveBackgroundColor: '#1d4ed8',
      }}>
      <BottomTab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={32} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5Icons name="user-alt" color={color} size={28} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={34}
            />
          ),
        }}
        name="Publish"
        component={Publish}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="message" color={color} size={28} />
          ),
        }}
        name="Chat"
        component={TextChat}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="google-maps"
              color={color}
              size={32}
            />
          ),
        }}
        name="Maps"
        component={Maps}
      />
    </BottomTab.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#1d4ed8',
    height: 45,
  },
  tabBarStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
