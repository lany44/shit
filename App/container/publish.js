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
            {
              this.state.avatarSource ?
                <Image source={this.state.avatarSource} onPress={this.handlePick} style={styles.img} />
              : <Text style={styles.imgText} onPress={this.handlePick}>点击选择一张图片</Text>
            }
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>名称:</Text>
            <TextInput style={styles.textInput}/>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>简介:</Text>
            <TextInput style={styles.textInput}/>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>校区:</Text>
            <TextInput style={styles.textInput}/>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>价钱:</Text>
            <TextInput style={styles.textInput}/>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>成色:</Text>
            <TextInput style={styles.textInput}/>
            <Text style={{marginRight: 5*rem, marginLeft: .3*rem}}>％</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.textLabel}>详细:</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.textareaInput}
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
