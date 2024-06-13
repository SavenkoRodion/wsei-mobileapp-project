import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TCompany } from "../../model/TUser";
import { Link } from "expo-router";

interface UserProps {
  userName: string;
  name: string;
  company: TCompany;
}

const User = ({ userName, name, company }: UserProps) => {
  return (
    <View style={styles.container}>
      <Link style={styles.userNameLink} href={`User/${userName}`}>
        Name: {userName}
      </Link>
      <Text style={styles.text}>Full name: {name}</Text>
      <Text style={styles.text}>Company name: {company.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    width: 500,
  },
  userNameLink: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "blue",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default User;
