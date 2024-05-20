import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface ButtonProps {
    title: string;
    handlePress: () => void;
    containerStyle: string;
    textStyle: string;
    isLoading: boolean;
}

export default function Button({
    title,
    handlePress,
    containerStyle,
    textStyle,
    isLoading,
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary-100 min-h-[60px] rounded-xl justify-center items-center ${
                isLoading ? "opacity-50" : ""
            } ${containerStyle}`}
        >
            <Text className={`font-psemibold text-primary ${textStyle}`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
