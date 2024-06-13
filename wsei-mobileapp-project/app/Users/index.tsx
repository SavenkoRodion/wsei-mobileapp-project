import { useEffect, useState } from "react";
import JsonApiEndpointsEnum from "../../model/JsonApiEndpointsEnum";
import { TUser } from "../../model/TUser";
import jsonApiFetch from "../../hooks/jsonApiFetch";
import { FlatList, View, StyleSheet } from "react-native";
import User from "../../components/Users/User";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    jsonApiFetch<TUser>(JsonApiEndpointsEnum.USERS, "", setUsers);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) => (
          <User
            userName={item.username}
            name={item.name}
            company={item.company}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default Users;
