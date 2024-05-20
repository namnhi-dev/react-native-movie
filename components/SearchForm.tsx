import { Image, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";

import { icons } from "@/constants";

interface SearchFormProps {
    value: string;
    placeholder: string;
    handleChangeText: (e: any) => any;
}

const SearchForm = ({
    value,
    handleChangeText,
    placeholder,
}: SearchFormProps) => {
    return (
        <View className="border-2 relative border-black-200 rounded-lg focus:border-secondary items-center w-full h-16 px-4 bg-black-100 flex-row space-x-4">
            <TextInput
                className="flex-1 w-full text-white font-psemibold text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
            />
            <TouchableOpacity className="">
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchForm;
