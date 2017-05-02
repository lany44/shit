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
      return {
        isloading: false,
        isUploading: false,
        islogin: true,
        fav_mdse_list: [{id: 1},1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      }
    }
  }
};

const routeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ROUTE': {
      return {path: action.new_path}
    }
    case 'CHECK_MDSE_DETAIL': {
      return {path: 'mdse', id: action.id}
    }
    default: {
      return {path: 'registe', id: 1}
    }
  }
};

const listPageReducer = (state, action) => {
  switch (action.type) {
    default: {
      return {
        init: false,
        page: 1,
        items_in_page: 10,
        mdse_list: [{id: 1},1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      }
    }
  }
};

export default combineReducers({
  app: appReducer,
  route: routeReducer,
  listPage: listPageReducer
});
