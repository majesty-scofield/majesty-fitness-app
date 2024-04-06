import {AntDesign} from "@expo/vector-icons";
import React from "react";
import {View, Text, StyleSheet} from "react-native";

const FoodLogListItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {item.label}
          </Text>
          <Text style={{ color: "dimgray" }}>
            {item.kcal} cal
          </Text>
        </View>
        <Text>{new Date(item.created_at).toDateString()}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f6f6f8',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default FoodLogListItem;