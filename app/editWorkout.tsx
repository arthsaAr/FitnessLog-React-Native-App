import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { ArrowLeft, Calendar, Save, Trash2 } from "lucide-react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

//the order of stack screen determines what is shown first and what is shown second!
export default function workoutDetails() {
    const router = useRouter();
    const route = useRoute();

    const { session } = route.params as { session: any };   //getting specific workout/session
  
    //changing the format of dates from 6/2/2026 to actual Sun, Jan 5 type
    const formatDate = (dateString: string) => {
        const [day, month, year] = dateString.split('/');

        const date = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
        );

        return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        });
    };

    return (
        <View className='flex-1 bg-primary px-4 pt-12'>
           <TouchableOpacity
            onPress={() => router.back()} 
            className="flex-row gap-1 mb-4">
            <ArrowLeft color="gray" size={30}/>
            <Text className="text-gray-500 text-xl font-normal mb-1">Cancel</Text>
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold">
            Edit Workout
        </Text>

        <View className="flex-row gap-2 mb-4 mt-1">
            <Calendar color="gray" size={19} />
            <Text className="text-gray-400 text-lg font-normal">{formatDate(session.date)}</Text>
        </View>

        <TouchableOpacity
          className='bg-[#030213] gap-2 rounded-lg py-3 px-4 flex-row items-center justify-center mb-6 border border-gray-800'>
          <Save className="w-5 h-5 mr-2" color="white" />
          <Text className='text-white font-semibold text-lg'>Save Changes</Text>
        </TouchableOpacity>

        <Text className="text-white text-xl font-normal mb-2">
            Exercises
        </Text>

        <View className='bg-[#1e1e1e] rounded-xl mb-1 p-3'
            style={{borderWidth: 1, borderColor: '#374151'}}>
            <Text className="text-gray-400 font-semibold">Exercise Name</Text>

            <TextInput
                placeholder='Bench Press'
                placeholderTextColor="#999" 
                className='bg-[#2a2a2a] rounded-lg mt-2 px-2 py-1 text-white border border-gray-700' 
                style={{ height: 40, marginRight: 17 }}
            />

            <View className="flex-row justify-between mt-4">
                <Text className="text-gray-400 font-semibold">Sets</Text>
                <Text className="text-gray-400 font-semibold">Reps</Text>
                <Text className="text-gray-400 font-semibold">Weight(lbs)</Text>
            </View>


            <View className="flex-row justify-between mt-3">
                <TextInput
                    placeholder='4'
                    placeholderTextColor="#999" 
                    className='bg-[#2a2a2a] rounded-lg px-2 py-1 text-white border border-gray-700' 
                    style={{  width: 70, height: 40, marginRight: 17 }}
                />
                <TextInput
                    placeholder='4'
                    placeholderTextColor="#999" 
                    className='bg-[#2a2a2a] rounded-lg px-2 py-1 text-white border border-gray-700' 
                    style={{ width: 70, height: 40, marginRight: 17 }}
                />
                <TextInput
                    placeholder='4'
                    placeholderTextColor="#999" 
                    className='bg-[#2a2a2a] rounded-lg px-2 py-1 text-white border border-gray-700' 
                    style={{ width: 70, height: 40, marginRight: 17 }}
                />
            </View>

            <TouchableOpacity className='flex-row bg-white gap-2 rounded-lg mt-4 py-2 px-4 flex-row items-center justify-center mb-6 border border-red-500'>
                <Trash2 color="red" size={23}/>
                <Text className="text-red-600 font-semibold text-xl">Remove Exercise</Text>
            </TouchableOpacity>
        </View>

<View 
      className="items-center justify-center bg-[#1e1e1e] rounded-xl p-4 mt-5"
      style={{borderWidth: 1, borderColor: '#374151'}}
    >
      <Text className="text-gray-400 text-lg text-center">
        Tip: Set weight to 0 for bodyweight exercises.
      </Text>
    </View>

        </View>
    );
};