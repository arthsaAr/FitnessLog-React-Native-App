import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { LogOut, Settings, UserPen } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const profile = () => {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  //this is the state which stores the user email.
  //if email changes, than the email here also changes correctly updating the UI on our screen
  const [email, setEmail] = useState<string | null>(null);

  //this runs when this screen/profile is opened. taking the user email to show on screen!
  useEffect(() => {
    if(user?.email){
      setEmail(user.email);
    }
  }, []);

  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
        <View className="flex-row justify-between items-center mb-4 px-1">
              <Text className="text-white text-3xl font-bold mb-1">Profile</Text>
        </View>

          <View 
            className='bg-[#1e1e1e] rounded-xl mb-3 flex-row'
            style={{borderWidth: 1, borderColor: '#374151'}}>
              <View className='m-3'
                style={{
                  width: 120,
                  height:120, 
                  borderRadius: 60,
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
          </View>
            <View className='mt-4'>
                <Text className='text-white text-lg'> John Don</Text>
                <Text className='text-white text-lg'> {email ?? 'N/A'}</Text>
            </View>
          </View>

          <View className='bg-[#1e1e1e] rounded-xl p-4 mb-3'
          style={{borderWidth: 1, borderColor: '#374151'}}>
              <Text className='text-white text-2xl'>Personal Information</Text>
              
              <View className="flex-row justify-between mb-4 mt-2">
                <Text className="text-gray-400 text-lg">Age</Text>
                <Text className="text-white text-lg">20 years</Text>
              </View>

              <View className="flex-row justify-between mb-4">
                <Text className="text-gray-400 text-lg">Weight</Text>
                <Text className="text-white text-lg">180 lbs</Text>
              </View>

              <View className="flex-row justify-between mb-4">
                <Text className="text-gray-400 text-lg">Height</Text>
                <Text className="text-white text-lg">5'9"</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-400 text-lg">Member Since</Text>
                <Text className="text-white text-lg">Jan 2025</Text>
              </View>
          </View>

          <View 
            className='bg-[#1e1e1e] rounded-xl mb-3'
            style={{borderWidth: 1, borderColor: '#374151'}}>
            <TouchableOpacity 
                className='flex-row p-2'>
              <Settings size={20} color="#ffffff"/>
              <Text className='text-white text-lg'> Settings</Text>
            </TouchableOpacity>
          </View>

          <View 
            className='bg-[#1e1e1e] rounded-xl mb-3'
            style={{borderWidth: 1, borderColor: '#374151'}}>
            <TouchableOpacity 
                className='flex-row p-2'>
              <UserPen size={20} color="#ffffff"/>
              <Text className='text-white text-lg'> Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View 
            className='bg-[#1e1e1e] rounded-xl'
            style={{borderWidth: 1, borderColor: '#374151'}}>
            <TouchableOpacity 
                className='flex-row p-2' 
                onPress={() => router.replace("/login")}>
              <LogOut size={20} color="#ef4444"/>
              <Text className='text-red-500 text-lg'> Log Out</Text>
            </TouchableOpacity>
          </View>
      </View>
  )
}

export default profile

const styles = StyleSheet.create({})