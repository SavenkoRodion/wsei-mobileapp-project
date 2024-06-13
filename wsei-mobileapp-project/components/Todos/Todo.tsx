import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TodoProps {
  title: string;
  completed: boolean;
}

const Todo = ({ title, completed }: TodoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>Completed: {completed.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Todo;
