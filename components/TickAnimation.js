import React from 'react';
import LottieView from 'lottie-react-native';

export default class TickAnimation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/26538-tick-animation.json')}
      style={{width:"20%"}}
      autoPlay
      loop/>
    )
  }
}
