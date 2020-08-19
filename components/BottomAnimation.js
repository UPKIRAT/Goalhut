import React from 'react';
import LottieView from 'lottie-react-native';

export default class BottomAnimation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/28705-student-university-character.json')}
      style={{width:"100%"}}
      autoPlay loop />
    )
  }
}
