import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import React from "react";
import { Link } from "expo-router";
import FoodListItem from "../components/FoodListItem";

const foodItems = [
  {
    food: {
      label: "Apple",
      nutrients: { ENERC_KCAL: 122 },
      brand: "Apple Brands",
    },
  },
  {
    food: {
      label: "Banana",
      nutrients: { ENERC_KCAL: 3424 },
      brand: "Banana Brands",
    },
  },
  {
    food: {
      label: "Orange",
      nutrients: { ENERC_KCAL: 433 },
      brand: "Orange Brands",
    },
  },
  {
    food: {
      label: "Pineapple",
      nutrients: { ENERC_KCAL: 34 },
      brand: "Pineapple Brands",
    },
  },
  {
    food: {
      label: "Grapes",
      nutrients: { ENERC_KCAL: 4665 },
      brand: "Grapes Brands",
    },
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Calories Remaining</Text>
        <Text style={styles.title}>1779 - 532 = 650</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Today's food</Text>
        <Link href="/search" asChild>
          <Button title="Add Food" />
        </Link>
      </View>
      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodListItem item={item} />}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    flex: 1,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    color: "dimgray",
  },
});
