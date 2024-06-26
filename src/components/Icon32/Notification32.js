import React from "react";
import Svg, { Path, Circle, Text } from "react-native-svg";
import { CustomTheme } from "@styles/CustomTheme.js";

const { fontNavi } = CustomTheme;

const Notification32 = ({ count }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={34}
            height={34}
            fill="none"
            viewBox="2 -4 34 34"
        >
            <Path
                fill="#FFD600"
                d="M26.359 15.527c-.974-1.137-1.417-2.123-1.417-3.798v-.569c0-2.182-.502-3.588-1.594-4.994-1.683-2.184-4.516-3.5-7.29-3.5h-.118c-2.715 0-5.46 1.256-7.171 3.35-1.152 1.435-1.712 2.901-1.712 5.144v.57c0 1.674-.414 2.66-1.417 3.797-.738.838-.974 1.915-.974 3.08 0 1.167.383 2.273 1.152 3.17a6.042 6.042 0 0 0 3.866 1.885c2.095.239 4.19.329 6.316.329 2.124 0 4.22-.15 6.316-.33a6.042 6.042 0 0 0 3.865-1.883 4.818 4.818 0 0 0 1.152-3.17c0-1.166-.236-2.243-.974-3.081Z"
            />
            <Path
                fill="#FFD600"
                d="M18.678 25.638c-.667-.143-4.729-.143-5.395 0-.57.131-1.186.437-1.186 1.109.033.64.408 1.206.928 1.564l-.002.002c.672.523 1.46.856 2.286.976.44.06.888.058 1.344 0a4.848 4.848 0 0 0 2.284-.976l-.001-.002c.52-.358.895-.924.928-1.564 0-.672-.617-.978-1.186-1.11Z"
                opacity={0.4}
            />
            {count >= 1 && (
                <>
                    <Circle cx="28" cy="4" r="8" fill="white" />
                    <Text
                        x="28"
                        y="7"
                        fill="black"
                        fontSize="10"
                        textAnchor="middle"
                    >
                        {count}
                    </Text>
                </>
            )}
        </Svg>
    );
};

export default Notification32;
