import { View, Text, FlatList } from "react-native";
import React from "react";

interface TrendingProps {
    posts: any;
}

export default function Trending({ posts }: TrendingProps) {
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <Text className="text-white">{item.id}</Text>
            )}
            horizontal
        />
    );
}
