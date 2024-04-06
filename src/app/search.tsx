import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
} from "react-native";
import FoodListItem from "../components/FoodListItem";
import { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import Error from "../components/Error";

const query = gql`
  query search($ingr: String, $upc: String) {
    search(ingr: $ingr, upc: $upc) {
      text
      hints {
        food {
          label
          brand
          foodId
          nutrients {
            ENERC_KCAL
          }
        }
      }
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [scannerEnabled, setScannerEnabled] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  requestPermission();

  const [runSearch, { loading, error, data }] = useLazyQuery(query);

  if (error)
    return <Error />

  const performSearch = () => {
    runSearch({
      variables: {
        ingr: search,
      },
    });
  };

  if (scannerEnabled) {
    return (
      <View>
        <Camera
          onBarCodeScanned={(response) => {
            runSearch({
              variables: {
                upc: response.data,
              },
            });
            setScannerEnabled(false);
          }}
          style={{ width: "100%", height: "100%" }}
        />
        <Ionicons
          name="close"
          size={30}
          color="dimgray"
          style={{ position: "absolute", right: 10, top: 10 }}
          onPress={() => setScannerEnabled(false)}
        />
      </View>
    );
  }

  const items = data?.search?.hints || [];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TextInput
          value={search}
          onChange={performSearch}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />
        <Ionicons
          onPress={() => setScannerEnabled(true)}
          name="barcode-outline"
          size={32}
          color="dimgray"
        />
      </View>
      {search && <Button title="Search" onPress={performSearch} />}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={items}
        renderItem={({ item }) => <FoodListItem item={item} />}
        ListEmptyComponent={() => <Text>Search a food</Text>}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
  },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },
  error: {
    fontSize: 18,
    fontWeight: "500",
    color: "dimgray",
    textAlign: "center",
    padding: 10,
  },
});
