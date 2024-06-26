import React, { useState } from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";
import RadioButtonItem from "@components/RadioButton/RadioButtonItem";
import { CustomTheme } from "@styles/CustomTheme";

const RadioButtonGroup = ({
    values,
    value,
    onValueChange,
    mainColor = "#FFC0C0",
    borderColor = CustomTheme.warningRed,
    onboarding = null,
}) => {
    const [selected, setSelected] = useState(value);

    const handleChange = (value) => {
        setSelected(value);
        onValueChange(value);
    };

    return (
        <RadioButton.Group value={selected} onValueChange={handleChange}>
            <View style={{ flexDirection: onboarding ? "row" : "column" }}>
                {values.map((value, index) => (
                    <View style={{ marginRight: 28 }}>
                        <RadioButtonItem
                            key={index}
                            value={value}
                            isSelected={value === selected}
                            onValueChange={handleChange}
                            label={value}
                            mainColor={mainColor}
                            borderColor={borderColor}
                            onboarding={onboarding}
                        />
                    </View>
                ))}
            </View>
        </RadioButton.Group>
    );
};

export default RadioButtonGroup;
