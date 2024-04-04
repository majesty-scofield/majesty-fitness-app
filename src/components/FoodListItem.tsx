import {AntDesign} from "@expo/vector-icons";
import {View, Text, StyleSheet} from "react-native";

const FoodListItem = ({item}) => {
    return (
        <View style={styles.subContainer}>
            <View style={{flex: 1, gap: 5}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.label}</Text>
                <Text style={{color: 'dimgray'}}>{item.cal} cal, {item.brand}</Text>
            </View>
            <AntDesign name="pluscircleo" size={24} color="royalblue"/>
        </View>
    )
}

export default FoodListItem;

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: 'gainsboro',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});