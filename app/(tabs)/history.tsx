import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { ChevronRight, Dumbbell } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const history = () => {
  const db = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

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

  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
      <ScrollView>
        <View className="flex-row justify-between items-center mb-4 px-1">
          <View>
            <Text className="text-white text-3xl font-semibold mb-1">Workout History</Text>
            <Text className="text-secondary text-xl font-normal mb-4">View your past workout sessions</Text>
          </View>
        </View>

        {sessions.length == 0 ? (
           <View className='items-center mt-12'>
            <Text className='text-gray-300 text-center leading-tight text-2xl'>
              No Workouts to show
            </Text>
            <Text className='text-gray-400 text-center leading-tight text-xl mb-5'>
              Start logging your workouts!
            </Text>
          </View>
        ) : (
            // sessions.map((sessions, index) => (  (this makes normal old to new vertically ordering)
            //using just reverse changes the original array.
            
            [...sessions].reverse().map((session, index) =>(
                <View key={index} className='bg-[#1e1e1e] rounded-xl mb-3 p-4'
                  style={{borderWidth: 1, borderColor: '#374151'}}>
                    
                    {/* first row today and right arrow*/}
                  <View className='flex-row justify-between items-center mb-1'>
                    <Text className=' text-white text-2xl'>{formatDate(session.date)}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('workoutDetails', { session })}>
                      <ChevronRight color="white"/>
                    </TouchableOpacity>
                  </View>

                  {/* second row with dumbbell and exercise */}
                  <View className='justify-between flex-row mb-3'>
                    <View className='flex-row items-center '>
                      <Dumbbell color="white" size={10}/>
                      <Text className='text-gray-400 ml-1'> {session.exercises.length} exercises</Text>
                    </View>
                  </View>

                  {/*making a divider line */}
                  <View className='h-1 bg-gray-700 my-2 opacity-40'  />

                  {session.exercises.map((exercises, i) => {
                    const totalSets = exercises.sets.length;

                    const firstSet = exercises.sets[0];

                    return (
                      <View key={i}>
                        <View className='flex-row justify-between mt-1'>
                          <Text className='text-white text-lg'>{exercises.name}</Text>
                          <Text className='text-gray-400 text-lg'>{totalSets} × {firstSet.reps} @ {firstSet.weight}lbs</Text> 
                        </View>

                        {i !== session.exercises.length - 1 && (
                          <View className='h-1 bg-gray-700 my-2 opacity-40'  />
                        )}
                        
                      </View>
                    );
                  })
                  }
                </View>
            ))
           )
        }

        

      </ScrollView>
    </View>
  )
}

export default history

