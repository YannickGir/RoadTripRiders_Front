import React from "react";
import { View, SafeAreaView, StyleSheet, TextInput, Text } from "react-native";
import { Input } from "react-native-elements";
import CustomButtonModif from "../components/CustomButtonModif";

// On crée un composant qui pourra être injecté partout dans l'application car nous avons de nombreux inputs
// on passe en argument toutes les valeurs que l'on va changer d'un input à l'autre
const CustomTextBackground = ({ text1, text2 }) => {
  return (
    <View>
      <SafeAreaView style={styles.text}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{text1}</Text>
        <Text style={{ color: "#ff8b00", fontWeight: "bold", fontSize: 15 }}>
          {text2}
        </Text>
        {/* <View>
          <CustomButtonModif />
        </View> */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    backgroundColor: "#FFEDAC",
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 5,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CustomTextBackground;
