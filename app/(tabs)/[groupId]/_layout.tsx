import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import "@/theme/unistyles";
import { Stack, useLocalSearchParams } from "expo-router";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Translation
import { useGroupDetails } from "@/hooks/useGroupDetails";
import { useGroupContext } from "@/context/GroupContext";

const GroupLayout: React.FC = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const { data } = useGroupDetails({ groupId });
  const { setActiveGroup } = useGroupContext();

  useEffect(() => {
    if (data?.id === groupId) {
      setActiveGroup(data);
    } else {
      setActiveGroup(null);
    }
  }, [data, groupId]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="edit" />
    </Stack>
  );
};

export default GroupLayout;
