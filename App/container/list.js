/**
 * Created by lany44 on 17/3/25.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl
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
class ListContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  handleGetMore = () => {

  }

  render() {
    const { listPage:{init, mdse_list}, app:{isloading} } = this.props;
    const checkMdseDetail = this.props.clickHandle;
    const style = init ? styles.emptyContainer : styles.mdseContainer;
    return <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isloading}
          onRefresh={this.handleGetMore}
        />
      }
      contentContainerStyle={style}
      automaticallyAdjustContentInsets={false}
    >
      {mdse_list.map((item, index) => <MdseItem key={index} id={item.id} clickHandle={checkMdseDetail}/>)}
    </ScrollView>
  }
}

export default ListContainer;
