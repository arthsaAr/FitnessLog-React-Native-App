import { useRouter } from "expo-router";
import { ArrowLeft, Dumbbell } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

//the order of stack screen determines what is shown first and what is shown second!
export default function workoutDetails() {
  const router = useRouter();
  
  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
      <TouchableOpacity
          onPress={() => router.back()} 
          className="flex-row gap-1 mb-4">
          <ArrowLeft color="gray" size={25}/>
        <Text className="text-gray-500 text-xl font-normal mb-1">Back</Text>
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold">
        Today
      </Text>

      <View className="flex-row gap-3 mb-4 mt-1">
        <Dumbbell color="gray" size={20}/>
        <Text className="text-gray-400 text-lg font-normal mb-4">3 exercises completed</Text>
      </View>



    </View>
  );
};
