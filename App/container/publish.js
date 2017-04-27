/**
 * Created by lany44 on 17/3/25.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import {rem} from '../config/sys_config';

const styles = StyleSheet.create({
  containerWrap: {
    flex: 1,
    margin: .2*rem
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: .2*rem
  },
  textInput: {
    flex: 1,
    height: 1*rem,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: .2*rem,
  },
  bottom: {
    flex: 1,
    height: 1*rem,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: .2*rem,
  }
});
class PublisContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {

  }
  render() {
    return (
      <View style={styles.containerWrap}>
        <View style={styles.rowWrap}>
          <Text>名称:</Text>
          <TextInput style={styles.textInput}/>
        </View>
        <View style={styles.rowWrap}>
          <Text>简介:</Text>
          <TextInput style={styles.textInput}/>
        </View>
        <View style={styles.rowWrap}>
          <Text>价钱:</Text>
          <TextInput style={styles.textInput}/>
        </View>
        <View style={styles.rowWrap}>
          <Text>成色:</Text>
          <TextInput style={styles.textInput}/>
          <Text>％</Text>
        </View>
        <View style={styles.rowWrap}>
          <Text>详细:</Text>
          <TextInput numberOfLines={4} style={styles.textInput}/>
        </View>
        <Button style={styles.bottom} title={'提交'} onPress={this.handleSubmit}/>
      </View>
    );
  }
}

export default PublisContainer;
