import { Text, View } from "react-native";

//the order of stack screen determines what is shown first and what is shown second!
export default function workoutDetails() {
    return (
        <View className='flex-1 bg-primary px-4 pt-12'>
            <Text className='text-white text-2xl'>Edit Workout Page!</Text>
        </View>
    );
};