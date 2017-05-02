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
  Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {rem, windowHeight} from '../config/sys_config';

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
  }
});

class ResigteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImagePicker: false,
      avatarSource: null
    };
  }

  handlePick = () => {
    const options = {
      title: '选择一张图片',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response)  => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };
        console.log(source)
        this.setState({
          avatarSource: source
        });
      }
    });
  }

  handleSubmit = () => {

  }

  render() {
    return (
      <View style={styles.containerWrap}>
        <ScrollView>
          <View style={styles.rowWrap} onPress={this.handlePick}>
            <View style={styles.usrContainer}>
              <Image source={require('../asset/2.jpg')} style={styles.usr_pic}/>
            </View>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>手机号:</Text>
            <TextInput style={styles.textInput}/>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>用户名:</Text>
            <TextInput style={styles.textInput}/>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>密码:</Text>
            <TextInput style={styles.textInput}/>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>再次输入密码:</Text>
            <TextInput style={styles.textInput}/>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>验证码:</Text>
            <TextInput style={styles.textInput}/>
            <Text style={[styles.button, {marginLeft: .5*rem, width: 3*rem}]} onPress={this.handleSubmit}>获取验证码</Text>
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
