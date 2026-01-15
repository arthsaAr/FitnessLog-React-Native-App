import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {
    const router = useRouter();

  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
      <View className="flex-row justify-between items-center mb-4 px-1">
        <View>
          <Text className="text-white text-3xl font-semibold mb-1">Welcome back!</Text>
          <Text className="text-gray-400 text-xl font-normal mb-4">Here's your fitness progress</Text>
        </View>
      </View>
    </View>
    // <View className="flex-1 bg-primary justify-center">
    //   <TouchableOpacity 
    //       onPress={() => router.replace("/login")}>       {/**Just a temporary navigation option to switch between login and main app screens */}
    //     <Text className="text-5xl text-blue-500 font-bold">Home</Text>
    //   </TouchableOpacity>
    // </View>
  );
}
