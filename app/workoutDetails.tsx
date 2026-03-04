import { useRouter } from "expo-router";
import { ArrowLeft, Dumbbell, SquarePen, Trash2 } from "lucide-react-native";
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

      {/**Button row! */}
      <View className="flex-row gap-2 justify-center">
        <TouchableOpacity 
          className='bg-[#030213] flex-1 gap-2 rounded-lg py-3 px-4 flex-row items-center justify-center mb-6'>
          <SquarePen className="w-5 h-5 mr-2" color="white" />
          <Text className='text-white font-semibold text-lg'>Edit Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className='bg-white gap-2 rounded-lg py-3 px-4 flex-row items-center justify-center mb-6'>
          <Trash2 color="red" />
        </TouchableOpacity>
      </View>

      


    </View>
  );
};
