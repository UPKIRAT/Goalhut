import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import ViewPosts from './screens/PostsViewScreen'
import * as Font from 'expo-font'
import { AppLoading } from 'expo';
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'
import { AppTabNavigator } from './components/AppTabNavigator'
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }



const getFonts = () => Font.loadAsync({
  'pacifico-regular': require('./assets/fonts/Pacifico-Regular.ttf'),
  'FredokaOne-Regular': require('./assets/fonts/FredokaOne-Regular.ttf'),
  'mansalva' : require('./assets/fonts/Mansalva-Regular.ttf'),
  'spartan-med': require('./assets/fonts/Spartan-Medium.ttf'),
  'spartan-semiB': require('./assets/fonts/Spartan-Bold.ttf'),
  'marck': require('./assets/fonts/MarckScript-Regular.ttf'),
  'balsamiq': require('./assets/fonts/BalsamiqSans-Regular.ttf'),
  'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
  'montserrat-med': require('./assets/fonts/Montserrat-Medium.ttf'),
  'anders': require('./assets/fonts/Anders.ttf'),
  'nunito-l': require('./assets/fonts/Nunito-Light.ttf'),
  'frontage': require('./assets/fonts/frontage-regular.ttf')
})

export default function App() {
  const [fontsLoaded, steFontsLoaded] = useState(false)

  if (fontsLoaded){
    return (
      <AppContainer/>
    );
  } else {
    return (
      <AppLoading
      startAsync = {getFonts}
      onFinish = {()=> steFontsLoaded(true)}
      />
    );

  }
  
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator},
  BottomTab: {screen: AppTabNavigator},
})

const AppContainer = createAppContainer(switchNavigator)
