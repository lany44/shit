/**
 * Created by lany44 on 17/3/25.
 */
import {combineReducers} from 'redux';

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
  route: routeReducer,
});