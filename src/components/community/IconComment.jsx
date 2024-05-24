import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconComment = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#D9EAFF"
      d="M8.016 1.332c3.786 0 6.653 3.105 6.653 6.657 0 4.12-3.36 6.676-6.667 6.676-1.093 0-2.306-.293-3.28-.868-.34-.207-.626-.36-.993-.24l-1.347.4c-.34.107-.646-.16-.546-.52l.446-1.496a.699.699 0 0 0-.046-.6c-.574-1.055-.9-2.21-.9-3.332 0-3.512 2.806-6.677 6.68-6.677Zm3.046 5.829a.856.856 0 0 0 0 1.71.856.856 0 0 0 0-1.71Zm-3.073 0a.85.85 0 0 0-.853.848c0 .474.38.854.853.861a.856.856 0 0 0 0-1.71Zm-3.073 0a.851.851 0 0 0-.854.854.86.86 0 0 0 .854.855.86.86 0 0 0 .853-.855.851.851 0 0 0-.853-.854Z"
    />
  </Svg>
)
export default IconComment;
