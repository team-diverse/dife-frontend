import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconSetting = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <Path
      fill="#E6F3FF"
      d="M18.015 2.832c1.072 0 2.042.595 2.578 1.473.26.425.434.95.39 1.502-.029.425.102.85.333 1.247.739 1.204 2.375 1.657 3.649.977a2.993 2.993 0 0 1 4.068 1.077l.97 1.671a2.872 2.872 0 0 1-1.071 4.01c-1.231.722-1.665 2.323-.927 3.541.232.383.492.709.898.907.506.27.897.694 1.172 1.12.536.878.493 1.954-.029 2.903l-1.013 1.7a3.017 3.017 0 0 1-2.563 1.474 3.022 3.022 0 0 1-1.534-.425c-.377-.241-.811-.326-1.274-.326-1.434 0-2.635 1.176-2.679 2.578 0 1.63-1.332 2.904-2.997 2.904h-1.969c-1.679 0-3.01-1.275-3.01-2.904-.03-1.402-1.232-2.578-2.665-2.578-.478 0-.912.085-1.274.326a3.062 3.062 0 0 1-1.534.425 3.023 3.023 0 0 1-2.577-1.474l-1-1.7c-.535-.92-.564-2.026-.028-2.904.231-.425.666-.85 1.158-1.119.405-.198.666-.524.912-.907.724-1.218.29-2.819-.941-3.541a2.896 2.896 0 0 1-1.071-4.01l.97-1.671A3.01 3.01 0 0 1 9.039 8.03c1.26.68 2.896.227 3.634-.977.232-.397.362-.822.333-1.247a2.529 2.529 0 0 1 .405-1.502 3.109 3.109 0 0 1 2.563-1.473h2.041Zm-.998 10.172c-2.274 0-4.112 1.785-4.112 4.009s1.838 3.995 4.112 3.995c2.273 0 4.068-1.771 4.068-3.995s-1.796-4.01-4.069-4.01Z"
    />
  </Svg>
)
export default IconSetting;
