/**
 * Created by lany44 on 17/3/26.
 */

import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
exports.windowWidth =  windowWidth;
exports.windowHeight =  windowHeight;
exports.rem = windowWidth / 10;
