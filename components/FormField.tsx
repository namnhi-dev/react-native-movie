import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { icons } from "@/constants";

interface FormFieldProps {
    title: string;
    value: string;
    placeholder: string;
    handleChangeText: (e: any) => any;
    otherStyle: string;
    keyboardType?: string;
}

const FormField = ({
    title,
    value,
    handleChangeText,
    otherStyle,
    keyboardType,
    placeholder,
}: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyle}`}>
            <Text className="text-base text-left font-pmedium text-gray-100">
                {title}
            </Text>
            <View className="border-2 relative border-black-200 rounded-lg focus:border-secondary items-center w-full h-16 px-4 bg-black-100 flex-row">
                <TextInput
                    className="flex-1 w-full text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />
                {title === "Password" && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className=""
                    >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
