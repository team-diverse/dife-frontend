import * as React from "react";
import { SvgXml } from "react-native-svg";

function Icon24({ icon, width = 24, height = 24 }) {
	return <SvgXml xml={icon} width={width} height={height} />;
}

export default Icon24;
