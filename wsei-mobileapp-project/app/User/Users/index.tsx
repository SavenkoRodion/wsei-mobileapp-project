import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import JsonApiEndpointsEnum from "../../../model/JsonApiEndpointsEnum";
import jsonApiFetch from "../../../hooks/jsonApiFetch";
import { TUser } from '../../../model/TUser';
import User from '../../../components/Users/User';

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
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default Users;
