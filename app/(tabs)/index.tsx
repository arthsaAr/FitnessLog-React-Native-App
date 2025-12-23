import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();

  return (
    <View className="flex-1 bg-primary justify-center">
      <TouchableOpacity 
          onPress={() => router.replace("/login")}>       {/**Just a temporary navigation option to switch between login and main app screens */}
        <Text className="text-5xl text-blue-500 font-bold">Home</Text>
      </TouchableOpacity>
    </View>
  );
}
