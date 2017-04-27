/**
 * Created by lany44 on 17/4/8.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
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
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textWrap: {
    marginTop: .1*rem,
    flex: 1
  },
  title: {
    fontSize: .4*rem,
  },
  desc: {
    marginTop: .1*rem,
    fontSize: .3*rem,
    color: 'gray'
  },
  count: {
    fontSize: .4*rem,
    fontWeight: 'bold',
    color: 'red'
  },
  percent: {
    marginTop: .1*rem,
    fontSize: .3*rem,
    fontWeight: 'bold'
  }
});

class Mdse extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {clickHandle, id} = this.props;
    return <View style={styles.mdseWrap}>
        <TouchableHighlight onPress={()=>clickHandle(id)}>
          <Image source={require('../asset/1.jpg')} style={styles.img}/>
        </TouchableHighlight>
        <View style={styles.container}>
          <View style={styles.textWrap}>
            <Text style={styles.title} onPress={()=>clickHandle(id)} numberOfLines={1}>哈哈哈哈哈哈哈哈哈</Text>
            <Text style={styles.desc} numberOfLines={1}>哈哈哈哈哈哈哈哈哈</Text>
          </View>
          <View>
            <Text style={styles.count} numberOfLines={1}>¥99</Text>
            <Text style={styles.percent}>100%</Text>
          </View>
        </View>
      </View>
  }
}

export default Mdse;
