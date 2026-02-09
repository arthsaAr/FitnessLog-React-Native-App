import { ChevronRight, Dumbbell } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const history = () => {
  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
      <ScrollView>
      <View className="flex-row justify-between items-center mb-4 px-1">
        <View>
          <Text className="text-white text-3xl font-semibold mb-1">Workout History</Text>
          <Text className="text-secondary text-xl font-normal mb-4">View your past workout sessions</Text>
        </View>
      </View>

        <View className='bg-[#1e1e1e] rounded-xl mb-3 p-4'
          style={{borderWidth: 1, borderColor: '#374151'}}>
            
            {/* first row today and right arrow*/}
          <View className='flex-row justify-between items-center mb-1'>
            <Text className=' text-white text-2xl'>Today</Text>
            <ChevronRight color="white"/>
          </View>

          {/* second row with dumbbell and exercise */}
          <View className='justify-between flex-row mb-3'>
            <View className='flex-row items-center '>
              <Dumbbell color="white" size={18}/>
              <Text className='text-gray-400 ml-1'> 3 exercises</Text>
            </View>
          </View>

          {/*making a divider line */}
          <View className='h-1 bg-gray-700 my-2 opacity-40'  />

          {/* adding dummy exercises for now*/}
          <View className='flex-row justify-between mt-1'>
            <Text className='text-white text-lg'>Bench Press</Text>
            <Text className='text-gray-400 text-lg'>4 × 10 @ 185lb</Text>
          </View>

          {/* <View className='flex-row justify-between ml-2 mr-2 mb-2 mt-1'>
            <Text className='text-white'>Incline Dumbell Press</Text>
            <Text className='text-gray-400'>3 × 12 @ 70lb</Text>
          </View>

          <View className='flex-row justify-between ml-2 mr-2 mb-2 mt-1'>
            <Text className='text-white'>Squats</Text>
            <Text className='text-gray-400'>4 × 11 @ 135lb</Text>
          </View> */}

        </View>
      </ScrollView>
      
    </View>
  )
}

export default history

const styles = StyleSheet.create({})