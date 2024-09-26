import React, { useEffect, useState } from "react";
import Svg, { Path, Defs, ClipPath, Image as SvgImage } from "react-native-svg";
import { getProfileImageByFileId } from "config/api";
import * as Sentry from "@sentry/react-native";

const IconChatProfile = ({ size = 48, fileId, ...props }) => {
	const [profilePresignUrl, setProfilePresignUrl] = useState(null);

	const getProfileImage = async () => {
		try {
			const response = await getProfileImageByFileId(fileId);
			setProfilePresignUrl(response.data);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"프로필 이미지 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getProfileImage();
	}, [fileId]);

	const pathData = `
		M0 ${size * 0.2083}C0 ${size * 0.0933} ${size * 0.0933} 0 ${size * 0.2083} 0H${size * 0.5}
		C${size * 0.7761} 0 ${size} ${size * 0.2182} ${size} ${size * 0.5}
		C${size} ${size * 0.7818} ${size * 0.7761} ${size} ${size * 0.5} ${size}H${size * 0.2083}
		C${size * 0.0933} ${size} 0 ${size * 0.9067} 0 ${size * 0.7917}V${size * 0.2083}Z
	`;

	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			fill="none"
			viewBox={`0 0 ${size} ${size}`}
			{...props}
		>
			<Defs>
				<ClipPath id="clipPath">
					<Path fill="#D9EAFF" d={pathData} />
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
				<Path fill="#D9EAFF" d={pathData} />
			)}
		</Svg>
	);
};

export default IconChatProfile;
