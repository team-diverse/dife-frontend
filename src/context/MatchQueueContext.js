import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { getRandomMembersByCount } from "config/api";
import { formatProfileData } from "util/formatProfileData";

const MatchQueueContext = createContext();
const QUEUE_REFRESH_TIME = 60 * 1000 * 20;

export const MatchQueueProvider = ({ children }) => {
	const [allProfiles, setAllProfiles] = useState([]);
	const [homeProfiles, setHomeProfiles] = useState([]);
	const [lastFetchTime, setLastFetchTime] = useState(null);
	const [timeRemaining, setTimeRemaining] = useState(QUEUE_REFRESH_TIME);

	const distributeProfiles = (profiles) => {
		setAllProfiles(profiles);
		if (profiles.length <= 5) {
			setHomeProfiles(profiles);
		} else {
			setHomeProfiles(profiles.slice(0, 6));
		}
	};

	const fetchNewQueue = async () => {
		try {
			const response = await getRandomMembersByCount(10);
			const formattedProfiles = formatProfileData(response.data);

			distributeProfiles(formattedProfiles);

			const currentTime = Date.now();
			setLastFetchTime(currentTime);
			await SecureStore.setItemAsync(
				"lastQueueFetchTime",
				currentTime.toString(),
			);
		} catch (error) {
			console.error("Match queue fetch error:", error);
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

	return (
		<MatchQueueContext.Provider
			value={{
				allProfiles,
				homeProfiles,
				timeRemaining,
				formattedTimeRemaining: formatTime(timeRemaining),
				canFetch: timeRemaining <= 0,
				fetchAndDistributeProfiles: fetchNewQueue,
			}}
		>
			{children}
		</MatchQueueContext.Provider>
	);
};

export const useMatchQueue = () => useContext(MatchQueueContext);
