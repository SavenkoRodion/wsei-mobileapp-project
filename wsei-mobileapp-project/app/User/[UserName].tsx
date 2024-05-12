import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import jsonApiFetchFirst from "../../hooks/jsonApiFetchFirst";
import JsonApiEndpointsEnum from "../../model/JsonApiEndpointsEnum";
import { useLocalSearchParams } from "expo-router";

const UserProfile = () => {
  const { UserName } = useLocalSearchParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    jsonApiFetchFirst(
      JsonApiEndpointsEnum.USERS,
      `username=${UserName}`,
      setUserData
    );
  }, [UserName]);

  return (
    <View style={styles.container} id="user-info-wrapper">
      {userData ? (
        <>
          <Text style={styles.text}>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
          <Text style={styles.subHeader}>Address</Text>
          <Text>Street: {userData.address.street}</Text>
          <Text>Suite: {userData.address.suite}</Text>
          <Text>City: {userData.address.city}</Text>
          <Text>Zip Code: {userData.address.zipcode}</Text>
          <Text style={styles.text}>Phone: {userData.phone}</Text>
          <Text>Company name: {userData.company.name}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
});

export default UserProfile;
