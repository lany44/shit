/**
 * Created by lany44 on 17/3/25.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

class ProfileContainer extends Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text>i am pofile!</Text>
    );
  }
}

export default ProfileContainer;