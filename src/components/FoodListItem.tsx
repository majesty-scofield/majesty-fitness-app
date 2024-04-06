import { gql, useMutation } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const mutation = gql`
  mutation MyMutation(
    $food_id: String!
    $label: String!
    $kcal: Int!
    $user_id: String
  ) {
    insertFood_log(
      kcal: $kcal
      label: $label
      food_id: $food_id
      user_id: $user_id
    ) {
      food_id
      user_id
      created_at
      id
      kcal
      label
    }
  }
`;

const FoodListItem = ({ item }) => {
  const [logFood] = useMutation(mutation, {
    refetchQueries: ["foodLogsForUserIdAndDate"],
  });
  const router = useRouter();

  const handlePress = async () => {
    await logFood({
      variables: {
        food_id: item.food.foodId,
        label: item.food.label,
        kcal: item.food.nutrients.ENERC_KCAL,
        user_id: "reborn",
      },
    }).then(data => {
      router.back()
    }).catch(error => console.log(error))
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {item.food.label}
        </Text>
        <Text style={{ color: "dimgray" }}>
          {item.food.nutrients.ENERC_KCAL} cal{item.food.brand && ","}{" "}
          {item.food.brand}
        </Text>
      </View>
      <AntDesign
        onPress={handlePress}
        name="pluscircleo"
        size={24}
        color="royalblue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f8",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FoodListItem;
