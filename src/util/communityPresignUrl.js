import { getProfileImageByFileId } from "config/api";

export const communityPresignUrl = async (postList) => {
	return await Promise.all(
		postList.map(async (item) => {
			// console.log("item", item);
			if (item.files && item.files[0]?.id) {
				const image = await getProfileImageByFileId(item.files[0].id);
				return {
					...item,
					profilePresignUrl: image.data,
				};
			} else if (item.post && item.post.files[0]?.id) {
				const image = await getProfileImageByFileId(
					item.post.files[0].id,
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
