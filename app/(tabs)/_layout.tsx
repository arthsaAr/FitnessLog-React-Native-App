import { Tabs } from 'expo-router';
import { BarChart3, Calendar, Dumbbell, Home, User } from 'lucide-react-native';
import React from 'react';

const _layout = () => {
    const activeColor = '#22c55e';
    const inactiveColor = 'gray';

  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
            backgroundColor: '#121212', //dark tab bar
            borderTopColor: '#121212' //this does black color for the tabs and page(horizontal line in between)
        },
    }}> 
        <Tabs.Screen 
            name="index"
            options={{
                title: 'Home',
                tabBarIcon: ({color, size}) => <Home color={color} width={size} height={size}/>
            }}
        />
        <Tabs.Screen 
            name="workout"
            options={{
                title: 'Workout',
                tabBarIcon: ({color, size}) => <Dumbbell color={color} width={size} height={size}/>
            }}
        />
        <Tabs.Screen 
            name="calendar"
            options={{
                title: 'Calendar',
                tabBarIcon: ({color, size}) => <Calendar color={color} width={size} height={size}/>
            }}
        />
        <Tabs.Screen 
            name="progress"
            options={{
                title: 'Progress',
                tabBarIcon: ({color, size}) => <BarChart3 color={color} width={size} height={size}/>
            }}
        />
        <Tabs.Screen 
            name="profile"
            options={{
                title: 'Profile',
                tabBarIcon: ({color, size}) => <User color={color} width={size} height={size}/>
            }}
        />

    </Tabs>
  );
};

export default _layout;