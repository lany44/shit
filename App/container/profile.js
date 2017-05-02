/**
 * Created by lany44 on 17/3/25.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TextInput
} from 'react-native';
import {rem} from '../config/sys_config'
import MdseItem from '../component/mdseItem';

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    position: 'relative'
  },
  usrContainer: {
    flex: 1,
    margin: 2*rem,
    alignItems: 'center',
    justifyContent: 'center'
  },
  usr_pic: {
    width: 3*rem,
    height: 3*rem,
    borderRadius: 60,
  },
  usr_name: {
    marginTop: .5*rem,
    fontSize: .5*rem,
    fontWeight: 'bold'
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: .2*rem,
    marginRight: .2*rem
  },
  textInput: {
    flex: 1,
    height: 1*rem,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: .2*rem,
  },
  fav_list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: .2*rem
  },
  button: {
    width: 2*rem,
    height: 1*rem,
    marginLeft: .7*rem,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    padding: .2*rem,
    lineHeight: .5*rem
  },
  logout: {
    width: 1.2*rem,
    height: .6*rem,
    lineHeight: .5*rem,
    fontSize: .4*rem,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: .5*rem,
    right: .5*rem
  }
});

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {islogin, fav_mdse_list, clickHandle} = this.props;
    return true ? <ScrollView style={styles.profileContainer}>
      <Text style={styles.logout}>注销</Text>
      <View style={styles.usrContainer}>
        <Image source={require('../asset/2.jpg')} style={styles.usr_pic}/>
        <Text style={styles.usr_name}>卡卡bibi</Text>
      </View>
      <View style={styles.fav_list}>
        {fav_mdse_list.map((item, index) => <MdseItem key={index} id={item.id} clickHandle={()=>clickHandle(item.id)}/>)}
      </View>
    </ScrollView>
    : <View style={styles.usrContainer}>
        <View style={styles.rowWrap}>
          <Text>账号:</Text>
          <TextInput style={styles.textInput}/>
        </View>
        <View style={styles.rowWrap}>
          <Text>密码:</Text>
          <TextInput style={styles.textInput}/>
        </View>
        <View style={styles.rowWrap}>
          <Text style={styles.button}>登陆</Text>
          <Text style={styles.button}>注册</Text>
        </View>
      </View>
  }
}

export default ProfileContainer;
