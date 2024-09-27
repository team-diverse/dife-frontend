import React, { createContext, useContext, useState } from "react";

const OnboardingContext = createContext();

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider = ({ children }) => {
	const [onboardingData, setOnboardingData] = useState({
		accessToken: "",
		refreshToken: "",
		username: "",
		country: "",
		countryCode: "",
		bio: "",
		mbti: "",
		hobbies: "",
		languages: "",
		checkLanguages: "",
		id: "",
		profileImg: null,
		verificationFile: "",
	});

	const updateOnboardingData = (newData) => {
		setOnboardingData((prev) => {
			const updatedData = { ...prev, ...newData };
			// console.log("온보딩 데이터:", updatedData);
			return updatedData;
		});
	};

	return (
		<OnboardingContext.Provider
			value={{ onboardingData, updateOnboardingData }}
		>
			{children}
		</OnboardingContext.Provider>
	);
};
