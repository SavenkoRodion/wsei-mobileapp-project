import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!!!!!</Text>
      <StatusBar style="auto" />
      <Link href="/">About</Link>
      <Link href="/Lol/">About</Link>
      {/* ...other links */}
      {/* <Link href="/src/">View user</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
