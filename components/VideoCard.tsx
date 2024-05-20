import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface VideoCardProps {
    item: any;
}

const VideoCard = ({ item }: VideoCardProps) => {
    const [play, setPlay] = useState(false);
    const {
        title,
        thumbnail,
        video,
        creator: { username, avatar },
    } = item;

    return (
        <View className="flex-col items-center px-4 pb-14 w-full">
            <View className="flex-row items-center gap-3">
                <View className="flex-1 flex-row w-full items-center justify-center">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg "
                            resizeMode="center"
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text
                            className="text-white font-psemibold text-sm"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}
                        >
                            {username}
                        </Text>
                    </View>
                </View>
                <View className="mt-2">
                    <Image
                        source={icons.menu}
                        resizeMode="contain"
                        className="w-5 h-5"
                    />
                </View>
            </View>
            {play ? (
                <Text>Playing</Text>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-xl mt-3 relative items-center justify-center"
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;
