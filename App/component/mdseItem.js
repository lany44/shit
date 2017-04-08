/**
 * Created by lany44 on 17/4/8.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import {rem} from '../config/sys_config';


const styles = StyleSheet.create({
  mdseWrap: {
    width: (5-0.05-0.2)*rem,
    height: 6*rem,
    marginRight: .1*rem
  },
  img: {
    width: '100%',
    height: (5-0.05-0.2)*rem
  },
  title: {

  },
  percent: {

  }
});

class Mdse extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <View style={styles.mdseWrap}>
        <Image source={require('../asset/1.jpg')} style={styles.img} />
        <View>
          <Text>哈哈哈哈哈哈哈哈哈</Text>
          <Text>哈哈哈哈哈哈哈哈哈</Text>
          <Text>80%</Text>
        </View>
      </View>
  }
}

export default Mdse;