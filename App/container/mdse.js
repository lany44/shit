/**
 * Created by lany44 on 17/3/25.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text
} from 'react-native';
import {rem, windowHeight} from '../config/sys_config'

const styles = StyleSheet.create({
  containerWrap: {
    flex: 1,
    margin: .1*rem,
    position: 'relative'
  },
  img: {
    width: '100%',
    height: windowHeight * .4
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  marginTop: {
    marginTop: .1*rem
  },
  price: {
    fontSize: .8*rem,
    color: 'red',
    fontWeight: 'bold',
    marginRight: .3*rem
  },
  title: {
    fontSize: .5*rem
  },
  desc: {
    fontSize: .3*rem,
    color: 'gray'
  },
  detail: {
    marginTop: .3*rem,
    flex: 1,
    padding: .2*rem,
    paddingTop: 0,
  },
  back: {
    width: 1*rem,
    height: 1*rem,
    position: 'absolute',
    bottom: .3*rem,
    right: .3*rem,
    borderRadius: 100000,
    shadowColor: 'black',
    shadowOffset:{
     width: 0,
     height: -1,
    },
    shadowOpacity: .1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backText: {

  }
});
class MdseContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.containerWrap}>
        <ScrollView>
          <Image source={require('../asset/1.jpg')} style={styles.img}/>
          <View style={[styles.rowWrap, styles.marginTop]}>
            <View style={styles.rowWrap}>
              <View>
                <Text>名称: </Text>
              </View>
              <View>
                <Text style={styles.title} numberOfLines={1}>ahhahah</Text>
                <Text style={styles.desc} numberOfLines={1}>哈哈哈哈</Text>
              </View>
            </View>
            <View>
              <Text style={styles.price}>¥99</Text>
            </View>
          </View>
          <Text style={styles.marginTop}>校区: 东北校区</Text>
          <Text style={styles.marginTop}>成色: 100%</Text>
          <Text style={styles.marginTop}>电话: 10101000101010101</Text>
          <Text style={styles.marginTop}>入手时间: 1990-90-90</Text>
          <Text style={styles.detail}>
            描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
            描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
            描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
            描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
            描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
          </Text>
        </ScrollView>
        <View style={styles.back}>
          <Text style={styles.backText}>返回</Text>
        </View>
      </View>
    );
  }
}

export default MdseContainer;
