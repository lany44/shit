/**
 * Created by lany44 on 17/4/7.
 */
import {server} from '../config/sys_config';

exports.API = {
  signup: server + '/u/signup',
  verify: server + '/u/verify',
  login: server + '/u/login',
  getFavStatus: server + '/u/getFavStatus',
  star: server + '/u/star',
  getFav: server + '/u/getFav',


  getAll: server + '/mdse/getAll',
  publish: server + '/mdse/publish',
}

exports.myFetch = (api, pay_load) => {
  console.log('-----------------------')
  console.log('api: ', api)
  console.log('pay_load: ', pay_load)
  console.log('-----------------------')
  if (pay_load) {
    const params = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pay_load)
    };
    return fetch(api, params).then(res => res.json())
  }
  return fetch(api)
};
