import React from 'react'
import { Text, View } from 'react-native'

const calendar = () => {
  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
     <View className="flex-row justify-between items-center mb-4 px-1">
        <View>
          <Text className="text-white text-3xl font-bold mb-1">Calendar</Text>
          <Text className="text-secondary text-xl font-semibold mb-4">View your workout history</Text>
        </View>
     </View>
     </View>
  )
}

export default calendar