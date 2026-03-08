import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeCardLine = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={572}
    height={77}
    fill="none"
    {...props}
  >
    <Path
      stroke="#D9EAFF"
      strokeWidth={6}
      d="M2.326 1.894c27.9 34.26 247.59 82.393 269.855 43.732 8.263-14.348-13.623-26.477-22.852-9.472-9.229 17.004 10 42.357 35.998 36.994 25.998-5.362 73.447-48.995 179.447-36.995 43.999 4.981 61.999 9.473 105.553 19.742"
    />
  </Svg>
);

export default HomeCardLine;
