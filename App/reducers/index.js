/**
 * Created by lany44 on 17/3/25.
 */
import {combineReducers} from 'redux';

const appReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LOADING': {
      return Object.assign({}, state, {isloading: action.isloading});
    }
    default: {
      return {isloading: true}
    }
  }
};

const routeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ROUTE': {
      return {path: action.new_path}
    }
    default: {
      return {path: 'mdse'}
    }
  }
};



export default combineReducers({
  app: appReducer,
  route: routeReducer
});