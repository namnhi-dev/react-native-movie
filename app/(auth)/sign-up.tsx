import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";

export default function SignUp() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [isSubmit, setIsSubmit] = useState(false);
    // console.log(form.email, form.password, form.username);

    const handleSignUp = async () => {
        if (!form.email || !form.password || !form.username) {
            Alert.alert("Warning", "Field is required");
        }
        setIsSubmit(true);
        try {
            const result = await createUser(form);
            setForm({
                username: "",
                email: "",
                password: "",
            });

            // set it to global state

            router.replace("/home");
        } catch (error) {
            Alert.alert("Warning", "Field is required");
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[100vh] justify-center px-4 py-6">
                    <Image
                        source={images.logo}
                        className="w-[115px] h-[30px]"
                        resizeMode="contain"
                    />
                    <Text className="text-2xl text-white font-psemibold mt-10">
                        Sign up to Aora
                    </Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e: any) =>
                            setForm({ ...form, username: e })
                        }
                        otherStyle="mt-10"
                        placeholder="Enter your username"
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e: any) =>
                            setForm({ ...form, email: e })
                        }
                        otherStyle="mt-7"
                        keyboardType="email-address"
                        placeholder="Enter your email address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e: any) =>
                            setForm({ ...form, password: e })
                        }
                        otherStyle="mt-7"
                        placeholder="Enter your password"
                    />
                    <Button
                        title="Sign In"
                        containerStyle="mt-8"
                        handlePress={handleSignUp}
                        isLoading={isSubmit}
                        textStyle="text-lg"
                    />
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-gray-100 font-pregular text-base">
                            Already have an account?{" "}
                        </Text>
                        <Link
                            href="/sign-in"
                            className="text-secondary font-psemibold"
                        >
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
