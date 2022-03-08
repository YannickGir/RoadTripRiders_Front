import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default class RadioButton extends Component {
  state = {
    value: null,
  };

  render() {
    const { PROP } = this.props;
    const { value } = this.state;

    return (
      <View style={{ flexDirection: "row" }}>
        {PROP.map((res) => {
          return (
            <View key={res.key} style={styles.container}>
              <Text style={styles.radioText}>{res.text}</Text>
              <TouchableOpacity
                style={styles.radioCircle}
                onPress={() => {
                  this.setState({
                    value: res.key,
                  });
                }}
              >
                {value === res.key && <View style={styles.selectedRb} />}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
    alignItems: "center",
    flexDirection: "column",
    // justifyContent: "space-between",
  },
  radioText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 13,
    color: "#363432",
    fontWeight: "700",
    marginLeft: 30,
  },
  radioCircle: {
    height: 40,
    width: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ff8b00",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
  },
  selectedRb: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: "#ff8b00",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3FBFE",
  },
});
