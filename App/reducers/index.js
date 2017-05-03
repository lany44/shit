/**
 * Created by lany44 on 17/3/25.
 */
import {combineReducers} from 'redux';

const appReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LOADING': {
      return Object.assign({}, state, {isloading: action.isloading});
    }
    case 'CHANGE_UPLOADING': {
      return Object.assign({}, state, {isUploading: action.isUploading});
    }
    case 'REGISTE_SUCCESS': {
      return Object.assign({}, state, action.pay_load);
    }
    case 'LOGIN_SUCCESS': {
      return Object.assign({}, state, action.pay_load);
    }
    case 'LOGOUT': {
      return Object.assign({}, state, {islogin: false});
    }
    default: {
      return Object.assign({}, {
        isloading: false,
        isUploading: false,
        islogin: false,
        nickname: null,
        phoneNumber: null,
        accessToken: null
      }, state);
    }
  }
};

const routeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ROUTE': {
      return Object.assign({}, state, {path: action.new_path});
    }
    case 'CHECK_MDSE_DETAIL': {
      return Object.assign({}, state, {path: 'mdse', id: action.id});
    }
    default: {
      return Object.assign({}, {path: 'list'}, state)
    }
  }
};

const listPageReducer = (state, action) => {
  switch (action.type) {
    default: {
      return Object.assign({}, {
        init: false,
        page: 1,
        items_in_page: 10,
      }, state)
    }
  }
};

export default combineReducers({
  app: appReducer,
  route: routeReducer,
  listPage: listPageReducer
});
