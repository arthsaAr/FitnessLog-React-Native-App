import { doc, getDoc, getFirestore, updateDoc } from "@firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { getAuth } from 'firebase/auth';
import { ArrowLeft, Calendar, Save, Trash2 } from "lucide-react-native";
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';

//the order of stack screen determines what is shown first and what is shown second!
export default function workoutDetails() {
    const router = useRouter();
    const auth = getAuth();
    const route = useRoute();
    const db = getFirestore();

    const { session } = route.params as { session: any };   //getting specific workout/session
    console.log('exercises:', session.exercises);
    const [exercises, setExercises] = useState<any[]>(session.exercises || []);   //here each exercise will have its own sets array with rep and weight! (added this when setting up the Add set button)


    const saveWorkout = async () => {
        const user = auth.currentUser;
        if(!user){
            return;
        }

        try {
            const workoutRef = doc(db, "workouts", user.uid);
            const docSnap = await getDoc(workoutRef);

            if(!docSnap.exists()){
                return;
            }

            const data = docSnap.data();
            const currentSessions = data.sessions || [];

            //creating updated session/workouts
            const updatedIs = {
                ...session,
                exercises: exercises,
            };

            //replacing old one
            const updatedSessions = currentSessions.map((s: any) => {
                if(s.date === session.date && s.id === session.id){
                    return updatedIs;
                }
                return s;
            });

            await updateDoc(workoutRef, {
                sessions: updatedSessions
            });
            
            Toast.show({ type: 'success', text1: 'Workout Updated', text2: 'Your workout has been updated successfully.', position: 'bottom' });
            router.replace("/history");
        } catch(error){
            Toast.show({ type: 'error', text1: 'Update Error', text2: 'Error updating your workout, Please try again', position: 'bottom' });
        }
    };

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
          onPress={saveWorkout}
          className='bg-[#030213] gap-2 rounded-lg py-3 px-4 flex-row items-center justify-center mb-6 border border-gray-800'>
          <Save className="w-5 h-5 mr-2" color="white" />
          <Text className='text-white font-semibold text-lg'>Save Changes</Text>
        </TouchableOpacity>

        <Text className="text-white text-xl font-normal mb-2">
            Exercises
        </Text>

        {exercises.map((exercise: any, index: number) => {
            const firstSet = exercise.sets[0] || {reps: "", weight: ""};

            return(
                <View key={index} className='bg-[#1e1e1e] rounded-xl mb-1 p-3'
                    style={{borderWidth: 1, borderColor: '#374151'}}>
                    <View className="flex-col gap-1 mt-3">
                        <Text className="text-gray-400 text-sm mb-1">Exercise Name</Text>
                        <TextInput
                            value={exercise.name}
                            onChangeText={(text) => {
                                const updated = [...exercises];
                                updated[index].name = text;
                                setExercises(updated);
                            }}
                            placeholder='Exercise'
                            placeholderTextColor="#999" 
                            className='bg-[#2a2a2a] rounded-lg px-2 py-2 text-white border border-gray-700' 
                        />
                    </View>

                    <View className="flex-row gap-3 mt-3">
                        <View className="flex-1">
                            <Text className="text-gray-400 text-sm mb-1">Sets</Text>
                            <TextInput
                                value={String(exercise.sets.length)}  //displaying the number of sets for each exercise
                                editable={false} //making it non-editable because each new set also needs new reps, so just changing set is not possible
                                className='bg-[#2a2a2a] rounded-lg px-2 py-2 text-white border border-gray-700'
                            />
                        </View>

                        <View className="flex-1">
                            <Text className="text-gray-400  text-sm mb-1">Reps</Text>
                            <TextInput
                                value={String(firstSet.reps)}
                                onChangeText={(text) => {
                                    const updated = [...exercises];
                                    updated[index].sets[0].reps = Number(text);
                                    setExercises(updated);
                                }}
                                placeholder='Reps'
                                placeholderTextColor="#999" 
                                className='bg-[#2a2a2a] rounded-lg px-2 py-2 text-white border border-gray-700'
                            />
                        </View>

                        <View className="flex-1">
                            <Text className="text-gray-400  text-sm mb-1">Weight(lbs)</Text>
                            <TextInput
                                value={String(firstSet.weight)}
                                onChangeText={(text) => {
                                    const updated = [...exercises];
                                    updated[index].sets[0].weight = Number(text);
                                    setExercises(updated);
                                }}
                                placeholder='Weight'
                                placeholderTextColor="#999" 
                                className='bg-[#2a2a2a] rounded-lg px-2 py-2 text-white border border-gray-700'
                            />
                        </View>
                    </View>

                    <TouchableOpacity 
                        onPress={() => {
                            const deleted = exercises.filter((_: any, i: number) => i !== index);
                            setExercises(deleted);
                        }}
                        className='flex-row bg-white gap-2 rounded-lg mt-4 py-2 px-4 flex-row items-center justify-center mb-6 border border-red-500'>
                        <Trash2 color="red" size={23}/>
                        <Text className="text-red-600 font-normal text-xl">Remove Exercise</Text>
                    </TouchableOpacity>
                </View>
            );
        })}

        

    <View   
      className="items-center justify-center bg-[#1e1e1e] rounded-xl p-4 mt-5"
      style={{borderWidth: 1, borderColor: '#374151'}}
    >
      <Text className="text-gray-400 text-lg text-center">
       💡 Tip: Set weight to 0 for bodyweight exercises.
      </Text>
    </View>

        </View>
    );
};