import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

// On crée un composant qui pourra être injecté partout dans l'application car nous avons de nombreux inputs
// on passe en argument toutes les valeurs que l'on va changer d'un input à l'autre
const CustomInputWhite = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  autoCapitalize,
}) => {
  return (
    <SafeAreaView>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: "#FEFAEA",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    width: 250,
  },
});

export default CustomInputWhite;
