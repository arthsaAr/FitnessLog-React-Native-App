import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Dumbbell } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from '../firebaseConfig';


export default function loginScreen() {
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
    const [signButton, setsignButton] = useState<"signin" | "createAccount">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    {/*Hadling the authentication!*/}
    const handleLogin = async() => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Invalid Password", "Password must be at least 6 characters.");
            return;
        }

        try{
            const userDetails = await signInWithEmailAndPassword(auth, email, password);
            const user = userDetails.user;

            const userName = user.email?.split("@")[0];

            Alert.alert("Login Successful", `Welcome back, ${userName}`);
            router.replace("/(tabs)");
        } catch (error: any) {
            Alert.alert("Login Failed", "Please check your email and password and try again.");
        }
    }

    {/*Hadling new acc!*/}
    const handleSignup = async() => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Weak Password", "Password must be at least 6 characters long.");
            return;
        }

        try{
            const userDetails = await createUserWithEmailAndPassword(auth, email, password);
            const user = userDetails.user;
            const userName = user.email?.split("@")[0];

            Alert.alert("Account Created", `Welcome, ${userName}`);
            router.replace("/login");
        } catch (error: any) {
            Alert.alert("Registration Failed", "Please check your email and password and try again.");
        }
    }

    return (
    <View className="flex-1 bg-primary justify-center items-center">
        {/** App icon(green background for dumbell) */}
        <View className="bg-emerald-500 rounded-2xl p-4 mb-1">
            <Dumbbell color="white" size={52} />
        </View>
        <Text className="text-white mb-2 mt-2 font-semibold text-xl">FitTracker</Text>
        <Text className="text-gray-400 mb-5 text-lg">Track your fitness journey</Text>

        {/* making a box at center for login elements */}
        <View className='w-11/12 bg-[#1f1f1f] rounded-2xl p-5 items-center border border-gray-700'>

            <View className="flex-row w-full justify-between mt-4">
                {/**Login button! */}
                <TouchableOpacity 
                    onPress={() => {
                        setActiveTab("login");
                        setsignButton("signin");
                    }}
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
                    onPress={() => {
                        setActiveTab("signup");
                        setsignButton("createAccount");
                    }}
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
                <Text className="text-white mb-1 mt-4 font-semibold text-left text-base">Email</Text>
            </View>
            {/**Making a email box */}
            <View className='w-full bg-[#2a2a2a] rounded-xl border border-gray-700 px-4 py-1'>
                <TextInput
                    placeholder='you@example.com'
                    placeholderTextColor="#777"
                    value={email}
                    onChangeText={setEmail}
                    className='bg-[#2a2a2a] text-gray-200 text-base rounded-xl px-2 py-2'
                    autoCapitalize="none"
                    />
            </View>
            {/**Seperate view for aligning to the left side */}
            <View className="w-full">
                <Text className="text-white mb-1 mt-4 font-semibold text-left text-base">Password</Text>
            </View>

            {/**Making pass box */}
            <View className='w-full bg-[#2a2a2a] rounded-xl border border-gray-600 px-4 py-1'>
                <TextInput
                    placeholder='Enter your password'
                    placeholderTextColor="#777"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    className='bg-[#2a2a2a] text-gray-200 text-base rounded-xl px-2 py-2'
                    autoCapitalize="none"
                    />
            </View>

            <TouchableOpacity 
                onPress={signButton === "signin" ? handleLogin : handleSignup}
                className="w-full bg-black px-6 py-3 rounded-xl items-center mt-4">
                <Text className="text-white text-lg font-semibold">
                    {signButton === "signin" ? "Sign In" : "Create Account"}
                </Text>
            </TouchableOpacity>

            <View className="flex-row mt-3">
                <Text className="text-gray-400 mt-3 text-base">
                {signButton === "signin" ? "Don\'t have an account?" : "Already have an account?"}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        if(signButton === "signin"){
                            setActiveTab("signup");
                            setsignButton("createAccount");
                        } else {
                            setActiveTab("login");
                            setsignButton("signin");
                        }
                    }}
                >
                    <Text className="text-emerald-400 font-semibold text-lg mt-2">
                        {signButton === "signin" ? " Sign Up" : " Login"}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    </View>
    );
}