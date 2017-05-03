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

exports.isUploading = function (status) {
  return {type: 'CHANGE_UPLOADING', isUploading: status}
};

exports.registeSuccess = function (pay_load) {
  return {type: 'REGISTE_SUCCESS', pay_load}
};

exports.loginSuccess = function (pay_load) {
  return {type: 'LOGIN_SUCCESS', pay_load}
};

exports.logout = function () {
  return {type: 'LOGOUT'}
};
