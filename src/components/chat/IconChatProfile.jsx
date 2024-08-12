import React, { useEffect, useState } from "react";
import Svg, { Path, Defs, ClipPath, Image as SvgImage } from "react-native-svg";
import { getProfileImageByFileName } from "config/api";

const IconChatProfile = ({ size = 48, imageName, ...props }) => {
	const [profilePresignUrl, setProfilePresignUrl] = useState(null);

	const getProfileImage = async () => {
		try {
			const response = await getProfileImageByFileName(imageName);
			setProfilePresignUrl(response.data);
		} catch (error) {
			console.error(
				"프로필 이미지 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getProfileImage();
	}, []);

	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			fill="none"
			viewBox="0 0 48 48"
			{...props}
		>
			<Defs>
				<ClipPath id="clipPath">
					<Path
						fill="#D9EAFF"
						d="M0 10C0 4.477 4.477 0 10 0h14c13.255 0 24 10.745 24 24S37.255 48 24 48H10C4.477 48 0 43.523 0 38V10Z"
					/>
				</ClipPath>
			</Defs>

			{profilePresignUrl ? (
				<SvgImage
					x={0}
					y={0}
					width={size}
					height={size}
					href={{ uri: profilePresignUrl }}
					preserveAspectRatio="xMidYMid slice"
					clipPath="url(#clipPath)"
				/>
			) : (
				<Path
					fill="#D9EAFF"
					d="M0 10C0 4.477 4.477 0 10 0h14c13.255 0 24 10.745 24 24S37.255 48 24 48H10C4.477 48 0 43.523 0 38V10Z"
				/>
			)}
		</Svg>
	);
};

export default IconChatProfile;
