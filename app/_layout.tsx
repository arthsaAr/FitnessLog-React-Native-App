import { Stack } from "expo-router";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import './globals.css';

//making a custom config for the popups
const toastConfig = {
  success: (props: any) => (
    <BaseToast 
      {...props}
      style = {{width: '100%', backgroundColor: '#141414', borderTopWidth: 1, borderTopColor: '#4ADE80', borderRightWidth: 1, borderRightColor: '#4ADE80', borderLeftWidth: 1, borderLeftColor: '#4ADE80'}}
      contentContainerStyle = {{paddingHorizontal: 16}}
      text1Style = {{color: '#ffffff', fontSize: 15, fontWeight: '700'}}
      text2Style = {{color: 'rgba(255, 255, 255, 0.5)', fontSize: 13}}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style = {{width: '100%', backgroundColor: '#141414', borderTopWidth: 1, borderTopColor: '#4ADE80', borderRightWidth: 1, borderRightColor: '#4ADE80', borderLeftWidth: 1, borderLeftColor: '#4ADE80'}}
      contentContainerStyle = {{paddingHorizontal: 16}}
      text1Style = {{color: '#ffffff', fontSize: 15, fontWeight: '700'}}
      text2Style = {{color: 'rgba(255, 255, 255, 0.5)', fontSize: 13}}
    />
  ),
}

//the order of stack screen determines what is shown first and what is shown second!
export default function RootLayout() {
  return ( 
  <>
  <Stack>
    <Stack.Screen 
      name="login"
      options={{headerShown: false}}
    />
    <Stack.Screen 
      name="(tabs)"
      options={{headerShown: false}}
    />
    <Stack.Screen 
      name="workoutDetails"
      options={{headerShown: false}}
    />
    <Stack.Screen 
      name="editWorkout"
      options={{headerShown: false}}
    />
  </Stack>
  <Toast config={toastConfig} />
  </>
  );
}
