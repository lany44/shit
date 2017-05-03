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
  TouchableHighlight,
  Button,
  AlertIOS
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {rem, windowHeight} from '../config/sys_config';
import {API} from '../lib/myFetch';

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
    paddingLeft: .5*rem,
    width: 2*rem
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
  img: {
    width: '100%',
    height: windowHeight * .4
  },
  imgText: {
    width: '100%',
    height: windowHeight * .4,
    textAlign: 'center',
    paddingTop: windowHeight * .2
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

class PublishContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImagePicker: false,
      img: null,
      author: null,
      title: null,
      desc: null,
      price: null,
      percent: null,
      detail: null,
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
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };
        this.setState({
          img: source
        });
      }
    });
  }

  handleSubmit = () => {
    const {app} = this.props;
    const {img, title, desc, position, price, percent, detail} = this.state;
    const data = new FormData()
    data.append('image', {uri: img.uri, name: 'image.jpg', type: 'image/jpg'})
    data.append('title', title)
    data.append('desc', desc)
    data.append('position', position)
    data.append('price', price)
    data.append('percent', percent)
    data.append('detail', detail)
    this.props.isUploading(true)
    fetch(API.publish, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data;  boundary=6ff46e0b6b5148d984f148b6542e5a5d',
          'access-token': app.accessToken,
          'phone-number': app.phoneNumber,
        },
        body: data
      })
      .then(res => res.json())
      .then(res => {
        this.props.isUploading(false)
        if (res.err) {
          return AlertIOS.alert('提示', res.err);
        }
        this.props.checkMdseDetail(res.data)
      })
  }

  render() {
    return (
      <View style={styles.containerWrap}>
        <ScrollView>
          <View style={styles.rowWrap} onPress={this.handlePick}>
            {
              this.state.img ?
                <TouchableHighlight onPress={this.handlePick}>
                  <Image source={this.state.img} style={styles.img} />
                </TouchableHighlight>
              : <Text style={styles.imgText} onPress={this.handlePick}>点击选择一张图片</Text>
            }
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>名称:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(title) => this.setState({title})}
            />
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>简介:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(desc) => this.setState({desc})}
            />
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>校区:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(position) => this.setState({position})}
            />
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>价钱:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(price) => this.setState({price})}
            />
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>成色:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(percent) => this.setState({percent})}
            />
            <Text style={{marginRight: 5*rem, marginLeft: .3*rem}}>％</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>详细:</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.textareaInput}
              onChangeText={(detail) => this.setState({detail})}
            />
          </View>
          <View style={[styles.rowWrap, styles.buttonContainer]}>
            <Text style={styles.button} onPress={this.handleSubmit}>提交</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PublishContainer;
