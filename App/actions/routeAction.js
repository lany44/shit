/**
 * Created by lany44 on 17/3/25.
 */

exports.routeTo = function (new_path) {
  return {type: 'CHANGE_ROUTE', new_path}
};

exports.checkMdseDetail = function (id) {
  return {type: 'CHECK_MDSE_DETAIL', id}
};

exports.isloading = function (status) {
  return {type: 'CHANGE_LOADING', isloading: status}
};
