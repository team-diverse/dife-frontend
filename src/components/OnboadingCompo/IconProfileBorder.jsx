import * as React from 'react';
import Svg, { G, Rect, Path, Defs, ClipPath } from 'react-native-svg';

const IconProfileBorder = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={98}
    height={114}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Rect
        width={94}
        height={110}
        x={2}
        y={2}
        fill="none"
        fillOpacity={0.5}
        rx={20}
      />
      <Path fill="none" d="M2 2h94v110H2z" />
    </G>
    <Rect
      width={94}
      height={110}
      x={2}
      y={2}
      stroke="#2964E0"
      strokeDasharray="5 13"
      strokeLinecap="round"
      strokeWidth={4}
      rx={20}
    />
    <Defs>
      <ClipPath id="a">
        <Rect width={94} height={110} x={2} y={2} fill="none" rx={20} />
      </ClipPath>
    </Defs>
  </Svg>
)
export default IconProfileBorder;
