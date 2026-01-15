import AsyncStorage from '@react-native-async-storage/async-storage';
import { Check, Plus, Search, Trophy } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { exercises } from '../../allex';


export default function workout() {
  const today = new Date();
  const formateDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  
  const [showPanel, setShowPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  //const [selectedExercise, setSelectedExercise] = useState<string[]>([]);  // controls Exercise Details panel

  interface ExerciseSet {
    reps: string;
    weight: string;
  }

  interface WorkoutExercise {
    name: string;
    sets: ExerciseSet[];
  }

  const [saved, setSaved] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);   //here each exercise will have its own sets array with rep and weight! (added this when setting up the Add set button)
  const filteredExercises = exercises.filter(ex => ex.toLowerCase().includes(searchQuery.toLowerCase()));

  const panelHeight = Dimensions.get("window").height*0.65;
  //const SecondpanelHeight = Dimensions.get("window").height*0.20;

  //function to save workout to localstorage/
  const saveWorkout = async() => {
    const todayIs = formateDate;
    try {
      const storedData = await AsyncStorage.getItem('workouts');
      const allWorkouts = storedData ? JSON.parse(storedData) : {};    //takes all the data from the stored data

      //adding today's exercises
      allWorkouts[todayIs] = workoutExercises;   //adding todays date with the exercises done today 

      //saving back the data into the workouts
      await AsyncStorage.setItem('workouts', JSON.stringify(allWorkouts));
      setSaved(true);
      alert('Successfully saved workout!');
    } catch (e) {
      alert('Failed to save workout.');
    }
  };

  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
      {!saved ? (
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }} 
      >
        <View className="flex-row justify-between items-center mb-4 px-1">
          <View>
            <Text className="text-white text-3xl font-bold mb-1">Log Workout</Text>
            <Text className="text-secondary text-xl font-semibold mb-4">Today · {formateDate}</Text>
          </View>
          
          {workoutExercises.length > 0 && (
            <TouchableOpacity className="bg-green-600 px-3 py-2 rounded-2xl flex-row items-center" onPress={saveWorkout}>
              <Check color="white" className="w-4 h-4 mr-1" />
              <Text className="text-white font-semibold text-sm"> Save</Text>
            </TouchableOpacity>
          )}
        </View>

        {/*Text that exists if add exercise is not clicked*/}
        {!showPanel && workoutExercises.length === 0 && (
          <View className='items-center mt-12'>
            <Text className='text-gray-300 text-center leading-tight text-2xl'>
              No exercises added yet
            </Text>
            <Text className='text-gray-400 text-center leading-tight text-xl mb-5'>
              Tap &quot;Add Exercise&quot; to get started
            </Text>
          </View>
        )}

        {workoutExercises.map((exercise, index) => (
          <View 
            key = {index}
            className='bg-[#1e1e1e] rounded-xl p-4 mb-3'
            style={{borderWidth: 1, borderColor: '#374151'}}  //bright gray type border
          >

            {/*Top row: with exercise name and add set text*/}
            <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-white text-xl'>{exercise.name}</Text>

              {/*Here, when addset is clicked making it to update our sets array with reps and weight selected*/}
              <TouchableOpacity 
                className='px-2 py-1'
                onPress={() => {
                  const newExercises = [...workoutExercises];
                  newExercises[index].sets.push({reps: '', weight: ''});
                  setWorkoutExercises(newExercises);
                }}
              >
                <Text className='text-green-400 font-semibold'>+ Add Set</Text>  
              </TouchableOpacity>
            </View>

            {/*now putting reps,weight thing*/}
            {/** here firstly setting index for each new view by adding one */}
            {exercise.sets.map((set, setIndex) => (
            <View key={setIndex} className='flex-row items-center mb-4'>
              <Text className='text-gray-400 text-lg font-semibold mr-8 mt-2 '>
                #{setIndex+1}
              </Text>

              {/*reps input*/}
              <View className='mr-3'>
                <Text className='text-gray-300 text-sm mb-0'>Reps</Text>  
                <TextInput
                  placeholderTextColor="#999" 
                  keyboardType='numeric' 
                  className='bg-[#2a2a2a] rounded-lg px-3 py-2 text-white' 
                  style={{ width: 140, height: 50, marginRight: 17 }} 
                  value={set.reps}
                  onChangeText = {text => {
                    const newExercises = [...workoutExercises];
                    newExercises[index].sets[setIndex].reps = text;
                    setWorkoutExercises(newExercises);
                  }}
                />
              </View>
              
              {/*Weight*/}
              <View>
                <Text className='text-gray-300 text-sm mb-0'>Weight(lbs)</Text>
                <TextInput
                  placeholderTextColor="#999" 
                  keyboardType='numeric' 
                  className='bg-[#2a2a2a] rounded-lg px-3 py-2 text-white' 
                  style={{ width: 140, height: 50, marginLeft: 5}} 
                  value = {set.weight}
                  onChangeText = {
                    text => {
                      const newExercises = [...workoutExercises];
                      newExercises[index].sets[setIndex].weight = text;
                      setWorkoutExercises(newExercises);
                    }
                  }
                />
              </View>
            </View>
            ))}
          </View>
        ))}

        {/*Panel below date*/}
        {showPanel && (
          <View style={{height: panelHeight}} className='bg-[#1e1e1e] rounded-xl p-4'>
            {/*Search bar*/}
            <View className='flex-row items-center bg-[#2a2a2a] rounded-xl px-1 py-1'>
              <Search className="w-5 h-5 text-gray-300 mr-2" />
              <TextInput
                placeholder='Search exercises...'
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className='flex-1 text-white text-base mb-1'
                />
              </View>

              {/*Scrollable list*/}
                <ScrollView className="mt-6" showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                  {filteredExercises.map((ex, idx) => (
                    <TouchableOpacity key={idx} className='bg-[#2a2a2a] rounded-lg py-4 px-3 mb-3'
                    onPress={() => {
                      setWorkoutExercises(prev => [...prev, {
                        name: ex,
                        sets: [{reps: '', weight: ''}]
                      }
                    ]);
                      setShowPanel(false);
                    }}>
                      <Text className="text-white text-lg">{ex}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
            </View>
        )}

        {/* Add exercise button */}
        {!showPanel && (
          <TouchableOpacity 
            onPress={() => setShowPanel(true)}
            className='bg-white rounded-lg py-3 px-4 flex-row items-center justify-center mb-6 border border-gray-200'>
            <Plus className="w-5 h-5 mr-2 text-secondary" />
            <Text className='text-primary font-semibold text-lg'>Add Exercise</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">

          {/**for making a circle background we wrap the circle and the trophy inside a view */}
          <View
            style={{
              width: 120,
              height:120, 
              borderRadius: 60,
              backgroundColor: 'rgba(16,185,129,0.15)',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Trophy size={72} color="#10b981" />

          </View>

          <Text className="text-white text-3xl mb-1 mt-2">Workout Complete!</Text>    
          <Text className='text-gray-300'>Great Job crushing your workout 💪</Text>

          <View>
            <TouchableOpacity 
              onPress={() => {
                Alert.alert('Replace workout?', 'Your previous workout will be replaced. Do you want to conitnue?', [
                  {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => {
                      setSaved(false);
                      setWorkoutExercises([]);
                      setSearchQuery('');
                      setShowPanel(false);
                    },
                  },
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                ]);
              }}
              className='mt-3'>
              <Plus className="w-5 h-5 mr-2 text-secondary" />
              <Text className='text-white font-semibold text-normal'>
                Log Another Workout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}