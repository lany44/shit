/**
 * Created by lany44 on 17/3/25.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  AlertIOS
} from 'react-native';
import {rem} from '../config/sys_config';
import {API, myFetch} from '../lib/myFetch'
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
class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdse_list: []
    }
  }

  componentDidMount() {
    this.handleGetMdse()
  }

  handleGetMdse = () => {
    this.props.isloading(true)
    myFetch(API.getAll, {})
      .then(res => {
        this.props.isloading(false)
        if (res.err) {
          return AlertIOS.alert('提示', res.err);
        }
        this.setState({
          mdse_list: res.data
        })
      })
  }

  render() {
    const { listPage:{init, page, items_in_page}, app:{isloading} } = this.props;
    const mdse_list = this.state.mdse_list;
    const checkMdseDetail = this.props.clickHandle;
    const style = init ? styles.emptyContainer : styles.mdseContainer;
    return <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isloading}
          onRefresh={this.handleGetMdse}
        />
      }
      contentContainerStyle={style}
      automaticallyAdjustContentInsets={false}
    >
      {mdse_list.map((item, index) => <MdseItem key={index} data={item} clickHandle={checkMdseDetail}/>)}
    </ScrollView>
  }
}

export default ListContainer;
