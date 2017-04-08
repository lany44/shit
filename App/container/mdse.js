/**
 * Created by lany44 on 17/3/25.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';
import {rem} from '../config/sys_config';
import MdseItem from '../component/mdseItem';

const styles = StyleSheet.create({
  mdseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: .2*rem
  },
  emptyContainer: {
    flex: 1
  }
});
class MdseContainer extends Component {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData()
  }

  handleGetMore() {

  }

  fetchData() {

  }
  render() {
    const { init, mdse_list } = this.props.state;
    const style = init ? styles.emptyContainer : styles.mdseContainer;
    return <ScrollView
      contentContainerStyle={style}
      automaticallyAdjustContentInsets={false}
    >
      {mdse_list.map((item, index) => <MdseItem key={index}/>)}
    </ScrollView>
  }
}

export default MdseContainer;