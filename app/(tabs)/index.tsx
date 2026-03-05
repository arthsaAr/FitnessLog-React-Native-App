import { getAuth } from '@firebase/auth';
import { doc, getFirestore, onSnapshot } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Calendar, ChevronRight, Clock, Dumbbell, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();
    const navigation = useNavigation();
    const db = getFirestore();
    const auth = getAuth();

    //state to store the session
    const [sessions, setSessions] = useState<any[]>([]);

    useEffect(() => {
      const user = auth.currentUser;
      if(!user){
        return;
      }

      const docRef = doc(db, "workouts", user.uid);
      const theUpdates = onSnapshot(docRef, (docSnap) => {
        if(docSnap.exists()){
          const data = docSnap.data();
          setSessions(data.sessions || []);
        }else {
          setSessions([]);
        }
      });
      return () => theUpdates();
    }, []);

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

  //getting last workout date
  let lastWorkout = null;
  if(sessions.length > 0){
    const reversed = [...sessions].reverse();
    lastWorkout = reversed[0];
  }

  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
  <ScrollView>
    <View className="flex-row justify-between items-center mb-4 px-1">
      <View>
        <Text className="text-white text-3xl font-semibold mb-1">Welcome back!</Text>
        <Text className="text-gray-400 text-xl font-normal mb-4">Ready to log your workout?</Text>
      </View>
    </View>

    <View className="flex-row gap-3">
      <View 
        className="flex-1 bg-[#1e1e1e] rounded-xl p-4 mb-3 justify-center"
        style={{borderWidth: 1, borderColor: '#374151', height: 175}}
      >
        <View
          className="self-start"
          style={{
            backgroundColor: 'rgba(34,197,94,0.15)',
            borderRadius:999,
            padding:8,
          }}
        >
          <Dumbbell color="green" size={28} />
        </View>
        <Text className="text-white pt-2 text-semibold text-3xl">
          {sessions.length}
        </Text>
        <Text className="text-gray-300 text-lg">
        Total Workouts
        </Text>
      </View>

      
      <View
        className="flex-1 bg-[#1e1e1e] rounded-xl p-4 mb-3 justify-center"
        style={{borderWidth: 1, borderColor: '#374151'}}
      >
        <View 
          className="self-start"
          style={{
          backgroundColor: 'rgba(59,130,246,0.15)',
          borderRadius:999,
          padding:8,
        }}>
          <Clock color="#3B82F6" size={28} />
        </View>
        <Text className="text-white pt-2 text-semibold text-2xl">
          {lastWorkout ? formatDate(lastWorkout.date) : 'N/A'}
        </Text>
        <Text className="text-gray-300 text-lg">
        Last Workout
        </Text>
        </View>
    </View>

    {/**The new workout button! */}
    <TouchableOpacity className="rounded-xl mb-3 mt-3" style={{borderWidth:1, borderColor: '#22C55E'}}
      onPress={() => router.push('/workout')}
    >
      <LinearGradient colors={
        [
          'rgba(34,197,94,0.25)',   //green bright glowing
          'rgba(34,197,94,0.05)',  //fade out type
        ]
      }
      start={{x:0, y:0}}
      end={{x:1, y:1}}
      className="rounded-xl p-4"
      >
        <View className="justify-between items-center flex-row">
          <View>
            <Text className="text-white text-2xl">
              Start New Workout
            </Text>
            <Text className="text-gray-500 text-lg">
              Begin logging your exercises
            </Text>
          </View>
          <View className="rounded-xl bg-primary p-2">
            <Plus color="white" size={30} />
          </View>
      </View>
      </LinearGradient>
    </TouchableOpacity>

     {/* Recent Workouts */}
    <View className="flex-row gap-5 justify-between items-center mt-4">
      <Text className="text-white text-lg">Recent Workouts</Text>
      <TouchableOpacity 
        onPress={() => router.push('/history')}>
        <Text className="text-green-400 text-lg">View All</Text>
      </TouchableOpacity>
    </View> 

     {lastWorkout ? (
      <TouchableOpacity 
      className="bg-[#1e1e1e] rounded-xl p-4 mt-3"
      style={{borderWidth: 1, borderColor: '#374151'}}
      onPress={() => navigation.navigate('workoutDetails')}   //no session for now, needs to be implemented!
    >
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View
              className="self-start"
              style={{
                backgroundColor: 'rgba(34,197,94,0.15)',
                borderRadius:999,
                padding:8,
              }}
            >
              <Calendar color="#22C55E" size={25} />
            </View>
            <View className="ml-1">
              <Text className="text-white text-xl">{formatDate(lastWorkout.date)}</Text>
              <Text className="text-gray-500 text-lg">{lastWorkout.exercises.length} exercises</Text>
            </View>
          </View>
          <ChevronRight color="gray"/>
        </View>
      </TouchableOpacity>
     ): (
      <TouchableOpacity 
      className="bg-[#1e1e1e] rounded-xl p-4 mt-3"
      style={{borderWidth: 1, borderColor: '#374151'}}
      onPress={() => navigation.navigate('workoutDetails')}   //no session for now, needs to be implemented!
    >
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View
              className="self-start"
              style={{
                backgroundColor: 'rgba(34,197,94,0.15)',
                borderRadius:999,
                padding:8,
              }}
            >
              <Calendar color="#22C55E" size={25} />
            </View>
            <View className="ml-1">
              <Text className="text-white text-xl">No workouts logged yet!</Text>
            </View>
          </View>
          <ChevronRight color="gray"/>
        </View>
      </TouchableOpacity>
     )}

    <View 
      className="items-center justify-center bg-[#1e1e1e] rounded-xl p-4 mt-5"
      style={{borderWidth: 1, borderColor: '#374151'}}
    >
      <Text className="text-gray-400 text-lg text-center">
        💪 Consistency is key! Try to log your workouts regularly to track your fitness journey.
      </Text>
    </View>



  </ScrollView>


    </View>
  );
}
