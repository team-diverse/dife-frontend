import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	useRef,
} from "react";
import * as SecureStore from "expo-secure-store";
import {
	getRandomMembersByCount,
	createLikeMember,
	deleteLikeMember,
} from "config/api";
import { formatProfileData } from "util/formatProfileData";

const MatchQueueContext = createContext();
const QUEUE_REFRESH_TIME = 60 * 1000 * 20;

export const MatchQueueProvider = ({ children }) => {
	const [allProfiles, setAllProfiles] = useState([]);
	const [homeProfiles, setHomeProfiles] = useState([]);
	const [lastFetchTime, setLastFetchTime] = useState(null);
	const [timeRemaining, setTimeRemaining] = useState(QUEUE_REFRESH_TIME);
	const [likesById, setLikesById] = useState({});
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const initialFetchSettledRef = useRef(false);

	useEffect(() => {
		if (allProfiles.length > 0) {
			setLikesById(initializeLikesById(allProfiles));
		}
	}, [allProfiles]);

	const distributeProfiles = (profiles) => {
		setAllProfiles(profiles);
		if (profiles.length <= 5) {
			setHomeProfiles(profiles);
		} else {
			setHomeProfiles(profiles.slice(0, 6));
		}
	};

	const fetchNewQueue = async () => {
		const shouldFinalizeInitialLoading = !initialFetchSettledRef.current;

		try {
			const response = await getRandomMembersByCount(10);
			const formattedProfiles = formatProfileData(response.data);

			distributeProfiles(formattedProfiles);

			const initialLikesById = initializeLikesById(formattedProfiles);
			setLikesById(initialLikesById);

			const currentTime = Date.now();
			setLastFetchTime(currentTime);
			await SecureStore.setItemAsync(
				"lastQueueFetchTime",
				currentTime.toString(),
			);
		} catch (error) {
			console.error("Match queue fetch error:", error);
		} finally {
			if (shouldFinalizeInitialLoading) {
				initialFetchSettledRef.current = true;
				setIsInitialLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchNewQueue();
	}, []);

	useEffect(() => {
		const checkLastFetchTime = async () => {
			try {
				const storedTime =
					await SecureStore.getItemAsync("lastQueueFetchTime");
				if (storedTime) {
					const lastFetch = parseInt(storedTime);
					const now = Date.now();
					const timePassed = now - lastFetch;

					if (timePassed >= QUEUE_REFRESH_TIME) {
						fetchNewQueue();
					} else {
						setLastFetchTime(lastFetch);
						setTimeRemaining(QUEUE_REFRESH_TIME - timePassed);
					}
				} else {
					fetchNewQueue();
				}
			} catch (error) {
				console.error("Error checking last fetch time:", error);
			}
		};

		checkLastFetchTime();
	}, []);

	useEffect(() => {
		let interval;

		if (lastFetchTime) {
			interval = setInterval(() => {
				const now = Date.now();
				const elapsed = now - lastFetchTime;

				if (elapsed >= QUEUE_REFRESH_TIME) {
					fetchNewQueue();
				} else {
					setTimeRemaining(QUEUE_REFRESH_TIME - elapsed);
				}
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [lastFetchTime]);

	const formatTime = (ms) => {
		if (!ms) return "00:00";
		const minutes = Math.floor(ms / (1000 * 60));
		const seconds = Math.floor((ms % (1000 * 60)) / 1000);
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	const removeProfile = (memberId) => {
		const removedProfiles = (profiles) =>
			profiles.filter((profile) => profile.id !== memberId);

		setHomeProfiles(removedProfiles);
		setAllProfiles(removedProfiles);
	};

	const initializeLikesById = (profiles) => {
		const likes = {};
		profiles.forEach((profile) => {
			likes[profile.id] = !!profile.isLiked;
		});
		return likes;
	};

	const toggleLike = async (profileId, liked) => {
		setLikesById((prev) => ({ ...prev, [profileId]: liked }));
		try {
			if (liked) {
				await createLikeMember(profileId);
			} else {
				await deleteLikeMember(profileId);
			}
		} catch (error) {
			setLikesById((prev) => ({ ...prev, [profileId]: !liked }));
			console.error("좋아요 토글 실패:", error);
		}
	};

	return (
		<MatchQueueContext.Provider
			value={{
				allProfiles,
				homeProfiles,
				timeRemaining,
				formattedTimeRemaining: formatTime(timeRemaining),
				canFetch: timeRemaining <= 0,
				isInitialLoading,
				likesById,
				fetchAndDistributeProfiles: fetchNewQueue,
				removeProfile,
				toggleLike,
			}}
		>
			{children}
		</MatchQueueContext.Provider>
	);
};

export const useMatchQueue = () => useContext(MatchQueueContext);
