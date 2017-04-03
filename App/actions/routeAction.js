/**
 * Created by lany44 on 17/3/25.
 */

export const changeTo = function (new_path) {
  console.log('CHANGE_ROUTE: ',new_path);
  return {type: 'CHANGE_ROUTE', new_path}
};