import { useRouter } from "expo-router";
import { Dumbbell, Flame, Goal, TrendingUp } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();

  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
  <ScrollView>
    <View className="flex-row justify-between items-center mb-4 px-1">
      <View>
        <Text className="text-white text-3xl font-semibold mb-1">Welcome back!</Text>
        <Text className="text-gray-400 text-xl font-normal mb-4">Here's your fitness progress</Text>
      </View>
    </View>

    <View className="flex-row gap-3">
      <View 
        className="flex-1 bg-[#1e1e1e] rounded-xl p-4 mb-3"
        style={{borderWidth: 1, borderColor: '#374151'}}
      >
        <Dumbbell color="green" className="w-6 h-6 mb-2" />
        <Text className="text-white pt-2 text-semibold text-xl">
          5
        </Text>
        <Text className="text-gray-300">
        Five workout this week
        </Text>
      </View>

      <View 
        className="flex-1 bg-[#1e1e1e] rounded-xl p-4 mb-3"
        style={{borderWidth: 1, borderColor: '#374151'}}
      >
        <Flame color="orange" className="w-6 h-6 mb-2" />
        <Text className="text-white pt-2 text-semibold text-xl">
          2,450
        </Text>
        <Text className="text-gray-300">
        Calories Burned
        </Text>
      </View>
    </View>

    <View className="flex-row gap-3">
      <View 
        className="flex-1 bg-[#1e1e1e] rounded-xl p-4 mb-3"
        style={{borderWidth: 1, borderColor: '#374151'}}
      >
        <TrendingUp color="blue" className="w-6 h-6 mb-2" />
        <Text className="text-white pt-2 text-semibold text-xl">
          12
        </Text>
        <Text className="text-gray-300">
        Active Days
        </Text>
      </View>

      <View 
        className="flex-1 bg-[#1e1e1e] rounded-xl p-4 mb-3"
        style={{borderWidth: 1, borderColor: '#374151'}}
      >
        <Goal color="purple" className="w-6 h-6 mb-2" />
        <Text className="text-white pt-2 text-semibold text-xl">
          3
        </Text>
        <Text className="text-gray-300">
        Goals Completed
        </Text>
      </View>
    </View>

    <View 
      className="flex-1 bg-[#1e1e1e] rounded-xl p-4 mt-3"
      style={{borderWidth: 1, borderColor: '#374151'}}
    >
        <Text className="text-white text-lg ">
       Weekly Activity
        </Text>

        {/**trying to make chart */}
        <View className="flex-row justify-between mt-40">
          <Text className="text-gray-400 text-sm">Mon</Text>
          <Text className="text-gray-400 text-sm">Tue</Text>
          <Text className="text-green-500 text-sm">Wed</Text>
          <Text className="text-gray-400 text-sm">Thu</Text>
          <Text className="text-gray-400 text-sm">Fri</Text>
          <Text className="text-gray-400 text-sm">Sat</Text>
          <Text className="text-gray-400 text-sm">Sun</Text>
        </View>
    </View>

    {/* Recent Workouts */}
    <View className="flex-row gap-5 justify-between items-center mt-4">
      <Text className="text-white text-lg">Recent Workouts</Text>
      <TouchableOpacity>
        <Text className="text-green-400 text-lg">View All</Text>
      </TouchableOpacity>
    </View>

    <View 
      className="flex-1 gap-1 justify-center bg-[#1e1e1e] rounded-xl p-4 mt-3"
      style={{borderWidth: 1, borderColor: '#374151'}}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-md">
        Chest & Triceps
          </Text>
          <Text className="text-green-400 text-md">
        45 min
          </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-gray-400 text-sm">
        Today
          </Text>
          <Text className="text-gray-400 text-sm">
        12 sets
          </Text>
      </View>
        
    </View>




  </ScrollView>


    </View>
  );
}
