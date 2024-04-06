import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from "react-native";
import React from "react";
import { Link } from "expo-router";
import FoodLogListItem from "../components/FoodLogListItem";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import Error from "../components/Error";

const query = gql`
  query foodLogsForUserIdAndDate($date: Date!, $user_id: String!) {
    foodLogsForUserIdAndDate(date: $date, user_id: $user_id) {
      food_id
      user_id
      created_at
      kcal
      label
      id
    }
  }
`;

const q = gql`
  query KcalTotalForDate($user_id: String!, $date: Date!) {
    KcalTotalForDate(date: $date, user_id: $user_id) {
      total_kcal
    }
  }
`;

export default function HomeScreen() {
    const user_id = 'reborn';
    const {data, loading, error} = useQuery(query, {
      variables: {
        date: dayjs().format("YYYY-MM-DD"),
        user_id,
      },
    });

    
  const { data: response } = useQuery(q, {
    variables: {
      user_id,
      date: dayjs().format("YYYY-MM-DD")
    },
  })
  

    if(loading) return <ActivityIndicator style={{padding: 10}} size="large" color="#0000ff" />;

    if(error) return <Error />;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Calories Remaining</Text>
        <Text style={styles.title}>
          {response.KcalTotalForDate.total_kcal} - 532 = 650
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Today's food</Text>
        <Link href="/search" asChild>
          <Button title="Add Food" />
        </Link>
      </View>
      <FlatList
        data={data.foodLogsForUserIdAndDate}
        renderItem={({ item }) => <FoodLogListItem item={item} />}
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
  text: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  }
});
