import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { ArrowLeft, Dumbbell, SquarePen, Trash2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

//the order of stack screen determines what is shown first and what is shown second!
export default function workoutDetails() {
  const router = useRouter();
  const route = useRoute();
  const { session } = route.params as { session: any };   //getting specific workout/session
  
  const db = getFirestore();
  const auth = getAuth();

  const handleWorkoutDeletion = async () => {
    const user = auth.currentUser;
    if(!user){
      return;
    }

    try {
      const userDocRef = doc(db, "workouts", user.uid);

      const docSnap = await getDoc(userDocRef);

      if(!docSnap.exists()){
        return;
      }

      const data = docSnap.data();
      const currentSessions = data.sessions || [];

      //removing that specific workout
      
      //this was based on id but we dont have id included in session
      const updated = currentSessions.filter(
        (s: any) => s.id!== session.id
      );

      await updateDoc(userDocRef, {
        sessions: updated,
      });
      alert("Workout Deleted!");
      router.back();    //goes 1 step back to main screen
    } catch(error){
      console.log("Delete error: ", error);
    }
  };



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

  let totalSets = 0;
  let totalReps = 0;
  let totalWeight = 0;

  //adding reps, weights, sets for summary section
  for(let exercise of session.exercises){
    totalSets = totalSets+exercise.sets.length;
    for(let set of exercise.sets){
      totalReps = totalReps + Number(set.reps);
      totalWeight = totalWeight + Number(set.reps) * Number(set.weight);
    }
  }

  return (
    <View className='flex-1 bg-primary px-4 pt-12'>
      <TouchableOpacity
          onPress={() => router.back()} 
          className="flex-row gap-1 mb-4">
          <ArrowLeft color="gray" size={25}/>
        <Text className="text-gray-500 text-xl font-normal mb-1">Back</Text>
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold">
        {formatDate(session.date)}
      </Text>

      <View className="flex-row gap-3 mb-4 mt-1">
        <Dumbbell color="gray" size={20}/>
        <Text className="text-gray-400 text-lg font-normal mb-4">{session.exercises.length} exercises completed</Text>
      </View>

      {/**Button row! */}
      <View className="flex-row gap-2 justify-center">
        <TouchableOpacity 
          className='bg-[#030213] flex-1 gap-2 rounded-lg py-3 px-4 flex-row items-center justify-center mb-6 border border-gray-800'>
          <SquarePen className="w-5 h-5 mr-2" color="white" />
          <Text className='text-white font-semibold text-lg'>Edit Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleWorkoutDeletion}
          className='bg-white gap-2 rounded-lg py-3 px-4 flex-row items-center justify-center mb-6 border border-red-500'>
          <Trash2 color="red" />
        </TouchableOpacity>
      </View>

      <Text className="text-white text-xl font-normal mb-2">
        Exercises
      </Text>
      
    {/**View inside a .map needs a key for that view...! */}
      {session.exercises.map((exercise: any, index: number) => {
        const firstSet = exercise.sets[0];
        const totalSets = exercise.sets.length;

        return (
          <View key={index} className='bg-[#1e1e1e] rounded-xl mb-3 p-3'
            style={{borderWidth: 1, borderColor: '#374151'}}>
              <Text className="text-white text-xl font-normal mb-1">
                {exercise.name}
              </Text>
            <View className="flex-row gap-2">
                <View className="flex-row gap-1">
                  <Text className="text-green-500 text-nm">{totalSets}</Text>
                  <Text className="text-gray-500 text-nm">sets</Text>
                </View>

                <View className="flex-row gap-1">
                  <Text className="text-green-500 text-nm">{firstSet.reps}</Text>
                  <Text className="text-gray-500 text-nm">reps</Text>
                </View>

                <View className="flex-row gap-1">
                  <Text className="text-green-500 text-nm">{firstSet.weight}</Text>
                  <Text className="text-gray-500 text-nm">lbs</Text>
                </View>
              </View>
          </View>
        );
      })}

      <View className='bg-[#1e1e1e] rounded-xl mt-3 mb-3 p-3'
        style={{borderWidth: 1, borderColor: '#374151'}}>
          <Text className="text-white text-xl font-normal mb-1">
          Workout Summary
        </Text>
        <View className="flex-row justify-between gap-2 p-6">
            <View className="flex-col gap-1 items-center">
              <Text className="text-green-500 text-2xl">{totalSets}</Text>
              <Text className="text-gray-500 text-lg">Total Sets</Text>
            </View>

            <View className="flex-col gap-1 items-center">
              <Text className="text-green-500 text-2xl">{totalReps}</Text>
              <Text className="text-gray-500 text-lg">Total Reps</Text>
            </View>

            <View className="flex-col gap-1 items-center">
              <Text className="text-green-500 text-2xl">{totalWeight}</Text>
              <Text className="text-gray-500 text-lg">Total lbs</Text>
            </View>
          </View>
      </View>

    </View>
  );
};
