import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconModifyProfileCancel = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={19}
		fill="none"
		{...props}
	>
		<Path
			fill="#000"
			d="M19.707 17.377a.948.948 0 0 1 .217.309.909.909 0 0 1-.217 1.036 1.046 1.046 0 0 1-1.415 0L10 10.843l-8.292 7.879A1.028 1.028 0 0 1 1 19c-.265 0-.52-.1-.707-.278A.927.927 0 0 1 0 18.049c0-.252.105-.493.293-.672L8.586 9.5.293 1.623A.927.927 0 0 1 0 .95C0 .698.105.457.293.278.481.1.735 0 1.001 0c.265 0 .52.1.707.278L10 8.157 18.292.278C18.48.1 18.734 0 18.999 0c.266 0 .52.1.708.278.188.179.293.42.293.672a.927.927 0 0 1-.293.673L11.414 9.5l8.293 7.877Z"
		/>
	</Svg>
);
export default IconModifyProfileCancel;
