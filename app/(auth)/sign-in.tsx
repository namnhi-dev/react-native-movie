import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { Link, router } from "expo-router";
import signIn from "@/lib/appwrite";

export default function SignIn() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [isSubmit, setIsSubmit] = useState(false);
    console.log(form.email, form.password);

    const handleSignIn = async () => {
        if (!form.email || !form.password) {
            Alert.alert("Warning", "Field is required");
        }
        setIsSubmit(true);
        try {
            await signIn(form.email, form.password);
            setForm({
                email: "",
                password: "",
            });

            // set it to global state

            router.replace("/home");
        } catch (error) {
            console.log(error);

            Alert.alert("Warning", "Field is required" + error);
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[85vh] justify-center px-4 py-6">
                    <Image
                        source={images.logo}
                        className="w-[115px] h-[30px]"
                        resizeMode="contain"
                    />
                    <Text className="text-2xl text-white font-psemibold mt-10">
                        Log in to Aora
                    </Text>
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
                        handlePress={handleSignIn}
                        isLoading={isSubmit}
                        textStyle="text-lg"
                    />
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-gray-100 font-pregular text-base">
                            Don’t have an account?{" "}
                        </Text>
                        <Link
                            href="/sign-up"
                            className="text-secondary font-psemibold"
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
