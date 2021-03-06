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
  TextInput,
  AlertIOS,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import {rem} from '../config/sys_config'
import MdseItem from '../component/mdseItem';
import {API, myFetch} from '../lib/myFetch';

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
    paddingLeft: .2*rem,
    marginTop: 1*rem
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
  },
  fav: {
    flex: 1,
    alignSelf: 'center',
  }
});

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: null,
      password: null,
      fav_mdse_list: []
    }
  }
  componentDidMount() {
    this.getFavList()
  }

  getFavList = () => {
    const {islogin, phoneNumber, accessToken} = this.props.app
    if (islogin) {
      this.props.isloading(true)
      myFetch(API.getFav, {phoneNumber, accessToken})
        .then((res) => {
          this.props.isloading(false)
          if (res.err) {
            return AlertIOS.alert('提示', res.err);
          }
          this.setState({
            fav_mdse_list: res.data
          })
        })
    }
  }

  handleLogin = () => {
    const {phoneNumber, password} = this.state;
    this.props.isloading(true)
    myFetch(API.login, {phoneNumber, password})
      .then((res) => {
        const data = res.data;
        this.props.isloading(false)
        if (res.err) {
          return AlertIOS.alert('提示', res.err);
        }
        AsyncStorage.multiSet([
          ['phoneNumber', data.phoneNumber],
          ['accessToken', data.accessToken]
        ], () => {
          this.props.loginSuccess({
            phoneNumber: data.phoneNumber,
            accessToken: data.accessToken,
            nickname: data.nickname,
            isUploading: false,
            islogin: true
          });
          this.props.routeTo('list')
        });
      })
  }

  handleLogout = () => {
    this.setState({
      phoneNumber: null,
      password: null
    })
    this.props.logout();
  }

  render() {
    const {app, clickHandle, routeTo} = this.props;
    const fav_mdse_list = this.state.fav_mdse_list;
    return app.islogin ? <ScrollView
      style={styles.profileContainer}
      refreshControl={
        <RefreshControl
          refreshing={app.isloading}
          onRefresh={this.getFavList}
        />
      }
    >
      <Text style={styles.logout} onPress={this.handleLogout}>注销</Text>
      <View style={styles.usrContainer}>
        <Image source={require('../asset/2.jpg')} style={styles.usr_pic}/>
        <Text style={styles.usr_name}>{app.nickname}</Text>
      </View>
      <Text style={styles.fav}>我的收藏</Text>
      <View style={styles.fav_list}>
        {fav_mdse_list.map((item, index) => <MdseItem key={index} data={item} clickHandle={()=>clickHandle(item)}/>)}
      </View>
    </ScrollView>
    : <View style={styles.usrContainer}>
        <View style={styles.rowWrap}>
          <Text>账号:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
          />
        </View>
        <View style={styles.rowWrap}>
          <Text>密码:</Text>
          <TextInput
            style={styles.textInput}
            password={true}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        <View style={styles.rowWrap}>
          <Text style={styles.button} onPress={this.handleLogin}>登陆</Text>
          <Text style={styles.button} onPress={()=>routeTo('registe')}>注册</Text>
        </View>
      </View>
  }
}

export default ProfileContainer;
