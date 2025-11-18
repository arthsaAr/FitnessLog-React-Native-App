import { Check, Plus, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { exercises } from '../../allex';

export default function workout() {
  const today = new Date();
  const formateDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  const [showPanel, setShowPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);  // controls Exercise Details panel

  const filteredExercises = exercises.filter(ex => ex.toLowerCase().includes(searchQuery.toLowerCase()));

  const panelHeight = Dimensions.get("window").height*0.65;
  const SecondpanelHeight = Dimensions.get("window").height*0.20;

  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
      <View className="flex-row justify-between items-center mb-4 px-1">
        <View>
          <Text className="text-white text-3xl font-bold mb-1">Log Workout</Text>
          <Text className="text-secondary text-xl font-semibold mb-4">Today · {formateDate}</Text>
        </View>
        
        {selectedExercise && (
          <TouchableOpacity className="bg-green-600 px-3 py-2 rounded-2xl flex-row items-center">
            <Check color="white" className="w-4 h-4 mr-1" />
            <Text className="text-white font-semibold text-sm"> Save</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Add exercise button */}
      {!showPanel && (
        <TouchableOpacity 
          onPress={() => setShowPanel(true)}
          className='bg-white rounded-lg py-3 px-4 flex-row items-center justify-center mb-6 border border-gray-200'>
          <Plus className="w-5 h-5 mr-2 text-secondary" />
          <Text className='text-primary font-semibold text-lg'>Add Exercise</Text>
        </TouchableOpacity>
      )}

      {/*Panel below date*/}
      {showPanel && !selectedExercise && (
        <View style={{height: panelHeight}} className='bg-[#1e1e1e] rounded-xl p-4'>
          {/*Search bar*/}
          <View className='flex-row items-center bg-[#2a2a2a] rounded-xl px-1 py-1'>
            <Search className="w-5 h-5 text-gray-300 mr-2" />
            <TextInput
              placeholder='Search exercises...'
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className='flex-1 text-white text-base'
              />
            </View>

            {/*Scrollable list*/}
              <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
                {filteredExercises.map((ex, idx) => (
                  <TouchableOpacity key={idx} className='bg-[#2a2a2a] rounded-lg py-4 px-3 mb-3'
                  onPress={() => setSelectedExercise(ex)}>
                    <Text className="text-white text-lg">{ex}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
          </View>
      )}

      {/*Text that exists if add exercise is not clicked*/}
      {!showPanel && (
        <View className='items-center mt-12'>
          <Text className='text-gray-300 text-center leading-tight text-2xl'>
            No exercises added yet
          </Text>
          <Text className='text-gray-400 text-center leading-tight text-xl'>
            Tap &quot;Add Exercise&quot; to get started
          </Text>
        </View>
      )}

      {selectedExercise && (
        <View style={{height: SecondpanelHeight}} className='bg-[#1e1e1e] rounded-xl p-4'>
          {/*Top row: with exercise name and add set text*/}
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-white text-xl'>{selectedExercise}</Text>
            <TouchableOpacity className='px-2 py-1'>
              <Text className='text-green-400 font-semibold'>+ Add Set</Text>  
            </TouchableOpacity>
          </View>

          {/*now putting reps,weight thing*/}
          <View className='flex-row items-center mb-4'>
            <Text className='text-gray-400 text-lg font-semibold mr-8 '>#1</Text>

            {/*reps input*/}
            <TextInput placeholder='Reps' 
              placeholderTextColor="#999" 
              keyboardType='numeric' 
              className='bg-[#2a2a2a] rounded-lg px-3 py-2 text-white mt-7' 
              style={{ width: 150, height: 50, marginRight: 17 }} />
             {/*Weight*/}
            <TextInput placeholder='Weight(lbs)' 
              placeholderTextColor="#999" 
              keyboardType='numeric' 
              className='bg-[#2a2a2a] rounded-lg px-3 py-2 text-white mt-7' 
              style={{ width: 150, height: 50, marginLeft: 5}} />
          </View>

          {/*Add exercise button*/}
          <TouchableOpacity 
          onPress={() => setShowPanel(true)}
          className='bg-white rounded-lg py-3 px-4 flex-row items-center justify-center mb-6 border border-gray-200 mt-8'>
          <Plus className="w-5 h-5 mr-2 text-secondary" />
          <Text className='text-primary font-semibold text-lg'>Add Exercise</Text>
        </TouchableOpacity>
        </View>
      )}




    </View>
  )
}