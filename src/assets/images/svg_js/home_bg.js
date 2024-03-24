import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeBg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width='100%'
    height='100%'
    fill="none"
<<<<<<< HEAD
<<<<<<< HEAD
    viewBox="0 -100 375 715"
=======
    viewBox="0 -150 375 715"
>>>>>>> c2436d5 (style: homePage 제작을 위한 컴포넌트 제작 및 정리)
=======
    viewBox="0 -100 375 715"
>>>>>>> 57030e9 (feat: homepage 기본 틀 완성)
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M375 277.421V720H0V0c0 104.626 67.5 186 202.154 186 91.555 0 146.837 46.924 172.846 91.421Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default HomeBg;
