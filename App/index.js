/**
 * Created by ly on 16/10/4.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';
import {createStore, applyMiddleware, bindActionCreators} from 'redux';
import {Provider , connect} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

import * as routeAction from './actions/routeAction';
import {rem} from './config/sys_config';
import {API, myFetch} from './lib/myFetch';

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

  componentDidMount() {
    const {routeAction} = this.props;
    routeAction.isUploading(true)
    AsyncStorage.multiGet(['phoneNumber', 'accessToken'], (err, data) => {
      if (err) return;
      console.log(data)
      if (data[0][1] && data[1][1]) {
        myFetch(API.login, {
          phoneNumber: Number(data[0][1]),
          accessToken: data[1][1]
        })
        .then((res) => {
          routeAction.isUploading(false)
          const data = res.data;
          if (res.err) {
            return AlertIOS.alert('提示', res.err);
          }
          routeAction.loginSuccess({
            phoneNumber: data.phoneNumber,
            accessToken: data.accessToken,
            nickname: data.nickname,
            isUploading: false,
            islogin: true
          });
          routeAction.routeTo('list')
        })
      }
    })
  }

  renderItem() {
    const { route, app, listPage, routeAction } = this.props;
    switch (route.path) {
      case 'list' : {
        return <ListContainer listPage={listPage} app={app} {...this.props.routeAction} clickHandle={routeAction.checkMdseDetail}/>
      }
      case 'mdse' : {
        return <MdseContainer app={app} route={route} {...this.props.routeAction} />
      }
      case 'publish' : {
        return <PublishContainer app={app} {...this.props.routeAction} />
      }
      case 'profile' : {
        return <ProfileContainer app={app} {...this.props.routeAction} clickHandle={this.props.routeAction.checkMdseDetail}/>
      }
      case 'registe' : {
        return <RegisteContainer listPage={listPage} app={app} {...this.props.routeAction}/>
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
