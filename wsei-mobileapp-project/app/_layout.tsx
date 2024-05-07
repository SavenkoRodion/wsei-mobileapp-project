import { Link, Slot } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

const Layout = () => {
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.headerText}>React zaliczeniowy</Text>
        <View style={styles.linkContainer}>
          <Link style={styles.link} href={`/`}>
            Posts
          </Link>
          <Link style={styles.link} href={`/Users`}>
            Users
          </Link>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Slot />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  appBar: {
    backgroundColor: "lightblue",
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
  },
  link: {
    marginLeft: 20,
    fontSize: 16,
    color: "blue",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Layout;
