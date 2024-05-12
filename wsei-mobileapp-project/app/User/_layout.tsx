import {
  Link,
  Slot,
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
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
        <TouchableOpacity
          //onPress={() => navigation.navigate(`/User/${userName}`)}
          style={styles.toolBarElement}
        >
          <Link style={styles.link} href={`/User/Bret`}>
            User profile
          </Link>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={() => navigation.navigate(`/User/${userName}/Posts`)}
          style={styles.toolBarElement}
        >
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
        <TouchableOpacity
          //onPress={() => navigation.navigate(`/User/${userName}/Albums`)}
          style={styles.toolBarElement}
        >
          <Text style={styles.link}>Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={() => navigation.navigate(`/User/${userName}/Todos`)}
          style={styles.toolBarElement}
        >
          <Text style={styles.link}>Todos</Text>
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
    backgroundColor: "lightgrey", // Change to your preferred background color
  },
  toolBarElement: {
    flex: 1,
    alignItems: "center",
  },
  link: {
    fontSize: 16,
    color: "blue", // Change to your preferred text color
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white", // Change to your preferred background color
  },
  innerContent: {
    flexDirection: "column",
    maxWidth: 500,
  },
});

export default UserProfileLayout;
