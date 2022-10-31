import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MainFeed, TrendingPosts} from '.';
import FriendsFeed from './FriendsFeed';

const Tab = createMaterialTopTabNavigator();

type Props = {};

const Home = (props: Props) => {
  return (
    <Tab.Navigator transitionStyle="scroll">
      <Tab.Screen name="Main Feed" component={MainFeed} />
      <Tab.Screen name="Freinds Feed" component={FriendsFeed} />
      <Tab.Screen name="Trending" component={TrendingPosts} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
