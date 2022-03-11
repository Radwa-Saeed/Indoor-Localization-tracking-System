import { Button, StyleSheet, Text, View, Pressable } from "react-native";

import React from "react";

const CustomButton = ({ title, clickHandle }) => {
  return (
    <Pressable style={styles.button} onPress={clickHandle}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    margin: 40,
    borderRadius: 30,
    backgroundColor: "#e26a00",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
export default CustomButton;
