import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import GoalPostScreen from '../screens/GoalPostScreen';


export const AppTabNavigator = createBottomTabNavigator({
  ViewPostScreen : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/list.png")} style={{width:30, height:30}}/>,
      tabBarLabel : "View posts",
    }
  },
  MakePost: {
    screen: GoalPostScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/post.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Post goals",
    }
  }
});
