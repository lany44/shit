/**
 * Created by ly on 16/10/4.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import {createStore, applyMiddleware, bindActionCreators} from 'redux';
import {Provider , connect} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

import * as routeAction from './actions/routeAction';
import {rem} from './config/sys_config';

import MdseContainer from './container/mdse';
import TeamContainer from './container/team';
import DailyContainer from './container/daily';
import ProfileContainer from './container/profile';
import FooterContainer from './container/footer';
import StatusHeader from './component/statusHeader'

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  headerWrap: {
    height: .4*rem,
    paddingRight: .2*rem,
    paddingLeft: .2*rem,
  },
  footerWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route, app } = this.props;
    return (
      <View style={styles.wrap}>
        <View style={styles.headerWrap}>
          <StatusHeader isloading={app.isloading}/>
        </View>
        <ScrollView>
          {route.path === 'mdse' ? <MdseContainer /> : null}
          {route.path === 'team' ? <TeamContainer /> : null}
          {route.path === 'daily' ? <DailyContainer /> : null}
          {route.path === 'profile' ? <ProfileContainer /> : null}
        </ScrollView>
        <FooterContainer style={styles.footerWrap} path={route.path} {...this.props.routeAction}/>
      </View>
    )
  }
}
App.context = {

};

const loggerMiddleware = createLogger();
const store = applyMiddleware(thunk, loggerMiddleware)(createStore)(reducers);
const mapStateToProps = state => ({
  app: state.app,
  route: state.route
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
