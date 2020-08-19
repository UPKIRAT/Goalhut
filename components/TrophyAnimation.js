import React from 'react';
import LottieView from 'lottie-react-native';

export default class TrophyAnimation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/21188-target-hit.json')}
      style={{width:"19%"}}
      autoPlay loop />
    )
  }
}
