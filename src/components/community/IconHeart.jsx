import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconHeart = (props) => {
	const {
		color,
		size = 16,
		...restProps
	} = props;

	return (
		<>
			{size > 16 ? (
				<Svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					fill="none"
					{...restProps}
				>
					<Path
						fill={color}
						fillRule="evenodd"
						d="M17.187 3.173c-1.631-.539-3.872.213-5.327 1.817a.169.169 0 0 1-.247.003c-1.518-1.595-3.686-2.362-5.306-1.82-3.819 1.27-5.01 5.839-3.923 9.343C4.1 18.026 9.8 21 11.752 21c1.742 0 7.67-2.917 9.364-8.484 1.087-3.503-.107-8.072-3.93-9.343Z"
						clipRule="evenodd"
					/>
				</Svg>
			) : (
				<Svg
					xmlns="http://www.w3.org/2000/svg"
					width={16}
					height={16}
					fill="none"
					{...restProps}
				>
					<Path
						fill={color}
						fillRule="evenodd"
						d="M11.343 2.045c-1.087-.36-2.581.142-3.551 1.211a.113.113 0 0 1-.165.002C6.615 2.195 5.17 1.684 4.09 2.046 1.544 2.892.75 5.938 1.475 8.274c1.143 3.673 4.943 5.656 6.245 5.656 1.162 0 5.113-1.945 6.243-5.656.724-2.336-.071-5.382-2.62-6.23Z"
						clipRule="evenodd"
					/>
				</Svg>
			)}
		</>
	);
};
export default IconHeart;
