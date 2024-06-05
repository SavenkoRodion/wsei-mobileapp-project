import {
  Link,
  Slot,
  router,
  useNavigation,
} from "expo-router";
import { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import useUserName from "../../hooks/useUserName";

const UserProfileLayout = () => {
  const userName = useUserName();
  const navigation = useNavigation();

  useEffect(() => {
    if (!userName) {
      //navigation.navigate("/");
    }
  }, [userName, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.toolBar}>
        <TouchableOpacity style={styles.toolBarElement}>
          <Link style={styles.link} href={`/User/Bret`}>
            User profile
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBarElement}>
          <Text
            style={styles.link}
            onPress={() => {
              router.push({
                pathname: `/User/Posts`,
                params: { UserName: "Bret" },
              });
            }}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBarElement}>
          <Text
            style={styles.link}
            onPress={() => {
              router.push({
                pathname: `/User/Albums`,
                params: { UserName: "Bret" },
              });
            }}
          >
            Albums
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBarElement}>
          <Text
            style={styles.link}
            onPress={() => {
              router.push({
                pathname: `/User/Todos`,
                params: { UserName: "Bret" },
              });
            }}
          >
            Todos
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.innerContent}>
          <Slot />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  toolBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "lightgrey",
  },
  toolBarElement: {
    flex: 1,
    alignItems: "center",
  },
  link: {
    fontSize: 16,
    color: "blue",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  innerContent: {
    flexDirection: "column",
    maxWidth: 500,
  },
});

export default UserProfileLayout;
