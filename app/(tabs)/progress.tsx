import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const progress = () => {
  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
      <View className="flex-row justify-between items-center mb-4 px-1">
        <View>
          <Text className="text-white text-3xl font-bold mb-1">Progress</Text>
          <Text className="text-secondary text-xl font-semibold mb-4">Track your fitness journey</Text>
        </View>
      </View>
    </View>
  )
}

export default progress

const styles = StyleSheet.create({})