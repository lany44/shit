/**
 * Created by lany44 on 17/3/25.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Button,
  AlertIOS,
  AsyncStorage
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {rem, windowHeight} from '../config/sys_config';
import {API, myFetch} from '../lib/myFetch';

const styles = StyleSheet.create({
  containerWrap: {
    flex: 1,
    marginLeft: .2*rem
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: .2*rem,
    marginRight: .2*rem
  },
  textLabel: {
    width: 2.5*rem
  },
  textInput: {
    flex: 1,
    height: 1*rem,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: .2*rem,
  },
  textareaInput: {
    flex: 1,
    height: 3*rem,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: .2*rem,
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
  button: {
    width: 4*rem,
    height: 1*rem,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    padding: .2*rem,
    lineHeight: .5*rem
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  verify_fix: {
    marginLeft: .5*rem,
    width: 3*rem
  }
});

class ResigteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      verify_text: '获取验证码',
      phoneNumber: null,
      nickname: null,
      password: null,
      password_again: null,
      verifyCode: null
    };
  }

  setVerifyText = () => {
    let _timer = setInterval(()=>{
      var {verify_text, timer} = this.state;
      if (!timer) {
        return this.setState({
          timer: _timer,
          verify_text: 60
        })
      } else if (verify_text===0) {
        clearInterval(timer)
        return this.setState({
          timer: null,
          verify_text: '获取验证码'
        })
      } else {
        return this.setState({
          verify_text: verify_text-1
        })
      }
    }, 1000)

  }

  handleGetVerifyCode = () => {
    const {phoneNumber, timer} = this.state;
    if (!phoneNumber || timer) {
      return AlertIOS.alert('提示', '错误');
    }
    myFetch(API.signup, {
      phoneNumber: this.state.phoneNumber
    })
      .then((res) => {
        const data = res.data;
        if (res.err) {
          return AlertIOS.alert('提示', res.err);
        }
        this.setVerifyText();
      })
  }

  handleSubmit = () => {
    const {password, password_again} = this.state;
    if(password !== password_again) {
      return AlertIOS.alert('提示', '密码输入不一致');
    }
    this.props.isUploading(true)
    myFetch(API.verify, {
      phoneNumber: this.state.phoneNumber,
      nickname: this.state.nickname,
      password: this.state.password,
      verifyCode: this.state.verifyCode,
    })
      .then((res) => {
        const data = res.data;
        if (res.err) {
          this.props.isUploading(false)
          return AlertIOS.alert('提示', res.err);
        }
        AsyncStorage.multiSet([
          ['phoneNumber', JSON.stringify(data.phoneNumber)],
          ['accessToken', JSON.stringify(data.accessToken)]
        ], () => {
          this.props.registeSuccess({
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

  render() {
    return (
      <View style={styles.containerWrap}>
        <ScrollView>
          <View style={styles.rowWrap}>
            <View style={styles.usrContainer}>
              <Image source={require('../asset/2.jpg')} style={styles.usr_pic}/>
            </View>
          </View>
          <View style={styles.rowWrap}>
            <Text ref={'phoneNumber'} style={styles.textLabel}>手机号:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(phoneNumber) => this.setState({phoneNumber})}
            />
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>用户名:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(nickname) => this.setState({nickname})}
            />
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>密码:</Text>
            <TextInput
              style={styles.textInput}
              password={true}
              onChangeText={(password) => this.setState({password})}
            />
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>再次输入密码:</Text>
            <TextInput
              style={styles.textInput}
              password={true}
              onChangeText={(password_again) => this.setState({password_again})}
            />
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>验证码:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(verifyCode) => this.setState({verifyCode})}
            />
            <Text style={[styles.button, styles.verify_fix]} onPress={this.handleGetVerifyCode}>{this.state.verify_text}</Text>
          </View>
          <View style={[styles.rowWrap, styles.buttonContainer]}>
            <Text style={styles.button} onPress={this.handleSubmit}>提交</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ResigteContainer;
