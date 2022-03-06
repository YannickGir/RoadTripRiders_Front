import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

// On crée un composant qui pourra être injecté partout dans l'application car nous avons de nombreux inputs
// on passe en argument toutes les valeurs que l'on va changer d'un input à l'autre
const CustomTimeNewTripInput2 = ({ value, setValue, placeholder }) => {
  return (
    <SafeAreaView>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: "#FFEDAC",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    width: 300,
    justifyContent: "space-around",
  },
});

export default CustomTimeNewTripInput2;
