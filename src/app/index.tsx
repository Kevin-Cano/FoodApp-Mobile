import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const hasCompletedOnboarding = await AsyncStorage.getItem("hasCompletedOnboarding");
        if (hasCompletedOnboarding === "true") {
          setIsFirstLaunch(false);
        } else {
          setIsFirstLaunch(true);
        }
      } catch (error) {
        setIsFirstLaunch(true);
      }
    }
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
        <ActivityIndicator size="large" color="#EC994B" />
      </View>
    );
  }

  if (isFirstLaunch) {
    return <Redirect href="/onboarding" />;
  } else {
    return <Redirect href="/(tabs)" />;
  }
}
