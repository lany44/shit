/**
 * Created by lany44 on 17/4/7.
 */

exports.getCurrentTime = () => {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  hour = hour < 10 ? '0'+hour : hour;
  minute = minute < 10 ? '0'+minute : minute;
  return `${hour}:${minute}`
};
