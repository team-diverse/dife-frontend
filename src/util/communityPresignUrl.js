import { getProfileImageByFileName } from "config/api";

export const communityPresignUrl = async (postList) => {
	return await Promise.all(
		postList.map(async (item) => {
			if (item.files && item.files[0]?.originalName) {
				const image = await getProfileImageByFileName(
					item.files[0].originalName,
				);
				return {
					...item,
					profilePresignUrl: image.data,
				};
			} else {
				return {
					...item,
					profilePresignUrl: null,
				};
			}
		}),
	);
};
