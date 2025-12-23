import { Stack } from "expo-router";
import './globals.css';

//the order of stack screen determines what is shown first and what is shown second!
export default function RootLayout() {
  return <Stack>
    <Stack.Screen 
      name="login"
      options={{headerShown: false}}
    />
    <Stack.Screen 
      name="(tabs)"
      options={{headerShown: false}}
    />
  </Stack>;
}
