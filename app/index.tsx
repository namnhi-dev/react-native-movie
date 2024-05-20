import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { images } from "../constants";
import Button from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import { useUserContext } from "@/context/userProvider";

const App = () => {
    const { isLoading, isLogin } = useUserContext();
    if (!isLoading && isLogin) return <Redirect href="/home" />;
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full h-full min-h-[85vh] items-center justify-center px-4">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />
                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode="contain"
                    />
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white text-center font-bold">
                            Discover Endless Possibilities with{" "}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className="w-[136px] h-[12px] absolute -right-8 -bottom-1"
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="text-gray-100 mt-7 text-center text-sm font-pregular">
                        Where Creativity Meets Innovation: Embark on a Journey
                        of Limitless Exploration with Aora
                    </Text>
                    <Button
                        title="Continue with Email"
                        handlePress={() => router.push("/sign-in")}
                        containerStyle="w-full mt-7"
                        textStyle="text-lg "
                        isLoading={false}
                    />
                </View>
            </ScrollView>
            <StatusBar style="light" backgroundColor="#161622" />
        </SafeAreaView>
    );
};

export default App;
