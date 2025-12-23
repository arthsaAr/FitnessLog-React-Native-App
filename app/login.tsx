import { useRouter } from "expo-router";
import { Dumbbell } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function loginScreen() {
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
    const router = useRouter();
    return (
    <View className="flex-1 bg-primary justify-center items-center">
        {/** App icon(green background for dumbell) */}
        <View className="bg-emerald-500 rounded-2xl p-4 mb-1">
            <Dumbbell color="white" size={52} />
        </View>
        <Text className="text-white mb-3 mt-2 font-semibold">FitTracker</Text>
        <Text className="text-gray-400 mb-3">Track your fitness journey</Text>

        {/* making a box at center for login elements */}
        <View className='w-11/12 bg-[#1f1f1f] rounded-2xl p-5 items-center border border-gray-700'>

            <View className="flex-row w-full justify-between mt-4">
                {/**Login button! */}
                <TouchableOpacity 
                    onPress={() => setActiveTab("login")} 
                    className={`flex-1 px-6 py-3 rounded-xl items-center mt-3 mr-2 ${
                        activeTab=== "login" ? "bg-black" : "bg-white"
                    }`}>
                    <Text className={`text-lg font-semibold ${
                        activeTab==="login" ? "text-white" : "text-black" 
                    }`}>
                    Login
                    </Text>
                </TouchableOpacity>
                {/**Signup button! */}
                <TouchableOpacity 
                    onPress={() => setActiveTab("signup")} 
                    className={`flex-1 px-6 py-3 rounded-xl items-center mt-3 ml-2 ${
                        activeTab === "signup" ? "bg-black" : "bg-white"
                        }`}
                    >
                    <Text className={`text-lg font-semibold ${
                        activeTab === "signup" ? "text-white" : "text-black"
                    }`}>
                        Sign Up
                    </Text>
                </TouchableOpacity>

            </View>
            
            {/**Seperate view for aligning to the left side */}
            <View className="w-full">
                <Text className="text-white mb-1 mt-2 font-semibold text-left">Email</Text>
            </View>
            {/**Making a email box */}
            <View className='w-full bg-[#2a2a2a] rounded-xl border border-gray-700 px-4 py-1'>
                <TextInput
                    placeholder='you@example.com'
                    placeholderTextColor="#777"
                    className='bg-[#2a2a2a] text-gray-200 text-base rounded-xl px-2 py-2'
                    autoCapitalize="none"
                    />
            </View>
            {/**Seperate view for aligning to the left side */}
            <View className="w-full">
                <Text className="text-white mb-1 mt-2 font-semibold text-left">Password</Text>
            </View>

            {/**Making pass box */}
            <View className='w-full bg-[#2a2a2a] rounded-xl border border-gray-600 px-4 py-1'>
                <TextInput
                    placeholder='you@example.com'
                    placeholderTextColor="#777"
                    className='bg-[#2a2a2a] text-gray-200 text-base rounded-xl px-2 py-2'
                    autoCapitalize="none"
                    />
            </View>

            <TouchableOpacity 
                onPress={() => router.replace("/(tabs)")} 
                className="bg-black px-6 py-3 rounded-xl items-center mt-3">
                <Text className="text-white text-lg font-semibold">Sign In
                </Text>
            </TouchableOpacity>

            <Text className="text-gray-400 mt-3 text-sm">Don't have an account?<Text className="text-emerald-400 font-semibold text-base "> Sign Up</Text></Text>
        </View>
    </View>
    );
}