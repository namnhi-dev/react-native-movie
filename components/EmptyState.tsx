import { Image, Text, View } from "react-native";
import React from "react";
import { images } from "@/constants";
import Button from "./Button";
import { router } from "expo-router";

interface EmptyStateProps {
    title: string;
    subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
    return (
        <View className="justify-center items-center px-4">
            <Image
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode="contain"
            />
            <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
            <Text className="text-xl font-semibold text-white mt-2">
                {subtitle}
            </Text>
            <Button
                title="Create video"
                handlePress={() => router.push("/create")}
                isLoading={false}
                textStyle="text-lg"
                containerStyle="w-full mt-7"
            />
        </View>
    );
};

export default EmptyState;
