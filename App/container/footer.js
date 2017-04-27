/**
 * Created by lany44 on 17/3/26.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AlertIOS
} from 'react-native';
import icon from "../asset/font/iconfontConf";
import {rem} from '../config/sys_config';

const styles = StyleSheet.create({
  footerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset:{
     width: 0,
     height: -1,
    },
    shadowOpacity: .1,
  },
  routeItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0.2*rem,
    height: 1.5*rem,
  },
  unActiveColor: {
    color: '#c8c8c8',
  },
  activeColor: {
    color: '#000000'
  },
  icon: {
    fontFamily: 'IconFont',
    fontSize: 0.75*rem
  },
  text: {
    fontSize: 0.3*rem
  },
  listFix: {
    fontSize: 0.75*rem
  },
  publishFix: {
    fontSize: 0.7*rem
  },
  profileFix: {
    fontSize: 0.75*rem
  }
});
class FooterContainer extends Component {
  constructor(props) {
    super(props);
  }

  renderItem(key) {
    const footer_item_map = {
      list: {
        icon: 'woyaochushou',
        text: '拾 趣'
      },
      publish: {
        icon: 'chuangjianxiaozu',
        text: '发 布'
      },
      profile: {
        icon: 'wode',
        text: '我'
      }
    };
    const {path, routeTo} = this.props;
    let icon_style_list = [styles.icon];
    let text_style_list = [styles.text];
    if (path === key || (path === 'mdse' && key === 'list')) {
      icon_style_list.push(styles.activeColor);
      text_style_list.push(styles.activeColor);
    } else {
      icon_style_list.push(styles.unActiveColor);
      text_style_list.push(styles.unActiveColor);
    }
    icon_style_list.push(styles[key + 'Fix']);
    return (
      <View style={styles.routeItem}>
        <Text
          onPress={()=>{
            if (key === 'publish' && !this.props.islogin) {
              return AlertIOS.alert('提示', '请先登陆');
            }
            routeTo(key)
          }}
          style={icon_style_list}
        >
          {icon(footer_item_map[key].icon)}
        </Text>
        <Text style={text_style_list}>
          {footer_item_map[key].text}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.footerWrap}>
        {this.renderItem('list')}
        {this.renderItem('publish')}
        {this.renderItem('profile')}
      </View>
    );
  }
}

export default FooterContainer;
