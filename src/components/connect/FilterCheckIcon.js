import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const FilterCheckIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G stroke="#2964E0" strokeLinejoin="round">
      <Path
        fill="#E6F3FF"
        d="M12.5 2h-9A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 2Z"
      />
      <Path strokeLinecap="round" d="m11 5.5-4.2 5-1.8-2" />
    </G>
  </Svg>
)
export default FilterCheckIcon;
