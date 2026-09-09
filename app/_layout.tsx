import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { auth } from "../firebaseConfig";
import "./globals.css";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ width: "100%", backgroundColor: "#141414", borderTopWidth: 1, borderTopColor: "#4ADE80", borderRightWidth: 1, borderRightColor: "#4ADE80", borderLeftWidth: 1, borderLeftColor: "#4ADE80" }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ color: "#ffffff", fontSize: 15, fontWeight: "700" }}
      text2Style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 13 }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ width: "100%", backgroundColor: "#141414", borderTopWidth: 1, borderTopColor: "#4ADE80", borderRightWidth: 1, borderRightColor: "#4ADE80", borderLeftWidth: 1, borderLeftColor: "#4ADE80" }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ color: "#ffffff", fontSize: 15, fontWeight: "700" }}
      text2Style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 13 }}
    />
  ),
};

export default function RootLayout() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Subscribe to auth state ONCE, independent of navigation
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
    return unsub;
  }, []);

  // Navigate only when auth status actually changes (and nav is mounted)
  useEffect(() => {
    if (!authReady || !rootNavigationState?.key) return;

    if (user) {
      router.replace("/(tabs)");
    } else {
      router.replace("/login");
    }
  }, [authReady, user, rootNavigationState?.key]);

  if (!authReady) {
    return (
      <View style={{ flex: 1, backgroundColor: "#121212", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="workoutDetails" options={{ headerShown: false }} />
        <Stack.Screen name="editWorkout" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig} />
    </>
  );
}