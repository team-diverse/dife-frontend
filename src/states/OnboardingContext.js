import React, { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider = ({ children }) => {
    const [onboardingData, setOnboardingData] = useState({
        nickname: '',
        is_korean: '',
        bio: '',
        mbti: '',
        hobbies: '',
        languages: '',
        id: '',
        profile_img: '',
        verification_file: '',
        token: '',
    });

    const updateOnboardingData = (newData) => {
        setOnboardingData(prev => {
            const updatedData = { ...prev, ...newData };
            console.log("온보딩 데이터:", updatedData);
            return updatedData;
        });
    };

    return (
        <OnboardingContext.Provider value={{ onboardingData, updateOnboardingData }}>
            {children}
        </OnboardingContext.Provider>
    );
};