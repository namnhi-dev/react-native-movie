import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchForm from "@/components/SearchForm";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";

export default function Home() {
    const { data: posts, refetch } = useAppwrite(getAllPosts);
    const { data: latestPosts } = useAppwrite(getLatestPosts);

    const [value, setValue] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch;
        setRefreshing(false);
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item: any) => item.$id}
                renderItem={({ item }: any) => <VideoCard item={item} />}
                ListHeaderComponent={() => (
                    <View className="my-6 mx-4 space-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">
                                    Welcome Back!
                                </Text>
                                <Text className="text-2xl font-semibold text-white">
                                    Nam Nhi
                                </Text>
                            </View>
                            <View className="mt-1.5">
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                        <SearchForm
                            handleChangeText={(e: any) => setValue(e)}
                            placeholder="Search..."
                            value={value}
                        />
                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-gray-100 text-lg font-pregular mb-3">
                                Latest video
                            </Text>
                            <Trending posts={latestPosts ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No video Found"
                        subtitle="No video created yet"
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
}
