/**
 * Created by ly on 16/10/4.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {createStore, applyMiddleware, bindActionCreators} from 'redux';
import {Provider , connect} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

import * as routeAction from './actions/routeAction';
import {rem} from './config/sys_config';

import ListContainer from './container/list';
import MdseContainer from './container/mdse';
import PublishContainer from './container/publish';
import ProfileContainer from './container/profile';
import RegisteContainer from './container/registe';
import FooterContainer from './container/footer';
import StatusHeader from './component/statusHeader'

const styles = StyleSheet.create({
  wrap: {
    flex: 1
  },
  headerWrap: {
    height: .4*rem,
    paddingRight: .2*rem,
    paddingLeft: .2*rem,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  renderItem() {
    const { route, app, listPage, routeAction } = this.props;
    switch (route.path) {
      case 'list' : {
        return <ListContainer listPage={listPage} app={app} clickHandle={routeAction.checkMdseDetail}/>
      }
      case 'mdse' : {
        return <MdseContainer />
      }
      case 'publish' : {
        return <PublishContainer />
      }
      case 'profile' : {
        return <ProfileContainer islogin={app.islogin} fav_mdse_list={app.fav_mdse_list} clickHandle={this.props.routeAction.checkMdseDetail}/>
      }
      case 'registe' : {
        return <RegisteContainer listPage={listPage} app={app} clickHandle={routeAction.checkMdseDetail}/>
      }
    }
  }
  render() {
    const { route, app, listPage, routeAction } = this.props;
    return (
      <View style={styles.wrap}>
        <View style={styles.headerWrap}>
          <StatusHeader isUploading={app.isUploading}/>
        </View>
        {this.renderItem()}
        <FooterContainer islogin={app.islogin} path={route.path} {...this.props.routeAction}/>
      </View>
    )
  }
}
const loggerMiddleware = createLogger();
const store = applyMiddleware(thunk, loggerMiddleware)(createStore)(reducers);
const mapStateToProps = state => ({
  app: state.app,
  route: state.route,
  listPage: state.listPage,
});
const mapDispatchToProps = dispatch => ({
  routeAction: bindActionCreators(routeAction, dispatch),
});
App = connect(mapStateToProps, mapDispatchToProps)(App);
export default function () {
  return () => {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
