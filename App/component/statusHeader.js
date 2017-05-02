/**
 * Created by lany44 on 17/4/7.
 */
import React, {Component} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  Text
} from 'react-native';
import icon from "../asset/font/iconfontConf";
import * as Utils from '../lib/utils';
import {rem} from '../config/sys_config';

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  loading: {
    fontFamily: 'IconFont',
    fontSize: .3*rem,
    color: '#000000'
  },
  time: {
    fontSize: .3*rem
  },
  singleTime: {
    justifyContent: 'flex-end'
  }
});

class statusHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: Utils.getCurrentTime(),
      rotation: new Animated.Value(0)
    };
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
  }

  componentWillMount() {
    setInterval(this.getCurrentTime, 60 * 1000);
    this.startAnimation()
  }

  getCurrentTime() {
    this.setState({time: Utils.getCurrentTime()})
  }

  startAnimation() {
    this.state.rotation.setValue(0);
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start(() => this.startAnimation());
  }

  render() {
    return this.props.isUploading ?
      <View style={styles.wrap}>
        <Animated.Text style={[styles.loading, {
          transform: [{
            rotateZ: this.state.rotation.interpolate({
              inputRange: [0,1],
              outputRange: ['0deg', '360deg']
            })
          }]
        }]}>{icon('guanbi')}</Animated.Text>
        <Text style={styles.time}>{this.state.time}</Text>
      </View>
    : <View style={[styles.wrap, styles.singleTime]}>
        <Text style={styles.time}>{this.state.time}</Text>
      </View>
  }
}

export default statusHeader;
