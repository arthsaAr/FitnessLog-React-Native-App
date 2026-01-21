import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  

  const getMonthYear = (date: Date) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  const handlePrevMonth = () => {
    const previous = new Date(currentMonth);
    previous.setMonth(previous.getMonth() -1);
    setCurrentMonth(previous);
  }

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() +1);
    setCurrentMonth(next);
  }

  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
      <ScrollView>
        
     <View className="flex-row justify-between items-center mb-4 px-1">
        <View>
          <Text className="text-white text-3xl font-bold mb-1">Calendar</Text>
          <Text className="text-gray-400 text-xl mb-4">View your workout history</Text>
        </View>
     </View>

      <View 
        className="flex-1 bg-[#1e1e1e] rounded-xl p-4 mb-3"
        style={{borderWidth: 1, borderColor: '#374151'}}
      >
        <View className='justify-between items-center flex-row gap-5'>
          <TouchableOpacity onPress={handlePrevMonth}>
            <ChevronLeft color="white"/>
          </TouchableOpacity>
          <Text className="text-white pt-2 text-semibold text-xl">
            {getMonthYear(currentMonth)}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <ChevronRight color="white"/>
          </TouchableOpacity>
        </View>

        <View className='justify-between items-center flex-row gap-2'>
          <Text className="text-gray-300 pt-2 text-sm">
            Sun 
          </Text>
          <Text className="text-gray-300 pt-2 text-sm">
            Mon 
          </Text>
          <Text className="text-gray-300 pt-2 text-sm">
            Tue 
          </Text>
          <Text className="text-gray-300 pt-2 text-sm">
            Wed 
          </Text>
          <Text className="text-gray-300 pt-2 text-sm">
            Thu 
          </Text>
          <Text className="text-gray-300 pt-2 text-sm">
            Fri 
          </Text>
          <Text className="text-gray-300 pt-2 text-sm">
            Sat 
          </Text>
        </View>
        
      </View>

      </ScrollView>
    </View>
  )
}

export default calendar