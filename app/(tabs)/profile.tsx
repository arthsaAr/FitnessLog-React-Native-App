import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { Check, LogOut, Pencil, Settings, UserPen } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function profile() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const [edit, setEdit] = useState(false);

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
      {!edit ? (
        <ScrollView>
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
                className='flex-row p-2'
                onPress={() => setEdit(true)}>
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
          </ScrollView>
      ) : (
        <ScrollView>
          <View className='bg-[#1e1e1e] rounded-xl p-4 mb-3'
          style={{borderWidth: 1, borderColor: '#374151'}}>

            <View className='flex-row items-center'>
              <Pencil color="white" size={20}/>
              <Text className='text-white text-xl ml-2'>Edit Profile</Text>
            </View>

            <View className="flex-row justify-between items-center mb-4 mt-5">
              <Text className="text-gray-400 text-lg">Name</Text>
              <TextInput
                  placeholder='Your name'
                  placeholderTextColor="#999" 
                  className='bg-[#2a2a2a] rounded-lg px-3 py-2 text-white' 
                  style={{ width: 140, height: 50, marginRight: 17 }} 
              />
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-400 text-lg">Age</Text>
              <TextInput
                  placeholder='Years'
                  placeholderTextColor="#999" 
                  keyboardType='numeric' 
                  className='bg-[#2a2a2a] rounded-lg px-3 py-2 text-white' 
                  style={{ width: 140, height: 50, marginRight: 17 }} 
              />
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-400 text-lg">Weight</Text>
              <TextInput
                  placeholder='lbs'
                  placeholderTextColor="#999" 
                  keyboardType='numeric' 
                  className='bg-[#2a2a2a] rounded-lg px-3 py-2 text-white' 
                  style={{ width: 140, height: 50, marginRight: 17 }} 
              />
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-400 text-lg">Height</Text>
              <TextInput
                  placeholder='ft/in'
                  placeholderTextColor="#999" 
                  keyboardType='numeric' 
                  className='bg-[#2a2a2a] rounded-lg px-3 py-2 text-white' 
                  style={{ width: 140, height: 50, marginRight: 17 }} 
              />
            </View>
          </View>

          <View>
            <TouchableOpacity className="bg-green-600 px-3 py-2 rounded-2xl items-center" onPress={() => setEdit(false)}>
                <Check color="white" className="w-4 h-4 mr-1" />
                <Text className="text-white font-semibold text-sm"> Save</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
        
      )}
      </View>
  );
}