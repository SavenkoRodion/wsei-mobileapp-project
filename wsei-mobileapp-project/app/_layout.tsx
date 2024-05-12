import { Link, Slot } from "expo-router";
import React from "react";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";
import ColourPallete from "../ColourPallete";

const Layout = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Link style={styles.headerText} href={`/`}>
          Expo zaliczeniowy
        </Link>
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
    paddingTop: StatusBar.currentHeight,
  },
  appBar: {
    backgroundColor: ColourPallete.Primary,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  linkContainer: {
    flexDirection: "row",
  },
  link: {
    marginLeft: 20,
    fontSize: 16,
    color: "white",
    textDecorationLine: "underline",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Layout;
