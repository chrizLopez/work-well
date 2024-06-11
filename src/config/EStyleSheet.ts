import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width, height} = Dimensions.get('window');
const entireScreenWidth = Math.min(width, height);
EStyleSheet.build({
  $rem: entireScreenWidth / 380,
  //   $fontColor: '#616185',  // will add this later on
});
// 380 is a magic number
// Source: https://medium.com/@shanerudolfworktive/7-tips-to-develop-react-native-uis-for-all-screen-sizes-7ec5271be25c

export {EStyleSheet};
