import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomTheme } from "@styles/CustomTheme";

const IconChat24 = ({ active = false, ...props }) => {
    const color = active ? CustomTheme.primaryMedium : "#B0D0FF";
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                fill={color}
                d="M12.02 2C17.7 2 22 6.657 22 11.985 22 18.165 16.96 22 12 22c-1.64 0-3.46-.44-4.92-1.302-.51-.31-.94-.54-1.49-.36l-2.02.6c-.51.16-.97-.24-.82-.78l.67-2.244c.11-.31.09-.641-.07-.902C2.49 15.43 2 13.697 2 12.015 2 6.747 6.21 2 12.02 2Zm4.57 8.743c-.71 0-1.28.571-1.28 1.282 0 .701.57 1.282 1.28 1.282.71 0 1.28-.58 1.28-1.282 0-.711-.57-1.282-1.28-1.282Zm-4.61 0c-.7-.01-1.28.571-1.28 1.272 0 .711.57 1.282 1.28 1.292.71 0 1.28-.58 1.28-1.282 0-.711-.57-1.282-1.28-1.282Zm-4.61 0c-.71 0-1.28.571-1.28 1.282 0 .701.58 1.282 1.28 1.282a1.29 1.29 0 0 0 1.28-1.282c0-.711-.57-1.282-1.28-1.282Z"
            />
        </Svg>
    );
};
export default IconChat24;
