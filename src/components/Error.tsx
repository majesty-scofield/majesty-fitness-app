import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Error() {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={styles.error}>No food item found! :( </Text>
      <Ionicons
        name="close"
        size={30}
        color="dimgray"
        onPress={() => router.back()}
      />
    </View>
  );
}const styles = StyleSheet.create({
  error: {
    fontSize: 18,
    fontWeight: "500",
    color: "dimgray",
    textAlign: "center",
    padding: 10,
  },
});