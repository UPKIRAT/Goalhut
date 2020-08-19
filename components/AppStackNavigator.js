import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import PostDetailsScreen  from '../screens/PostDetailsScreen';
import ViewPosts from '../screens/PostsViewScreen'
import CommentsGivenToMeScreen from '../screens/CommentsGivenToMeScreen'



export const AppStackNavigator = createStackNavigator({
  PostList : {
    screen : ViewPosts,
    navigationOptions:{
      headerShown : false
    }
  },
  PostDetails : {
    screen : PostDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  CommentsGivenToMeScreen : {
    screen : CommentsGivenToMeScreen,
    navigationOptions:{
      headerShown : false
    }
  },

},
  {
    initialRouteName: 'PostList'
  }
);
