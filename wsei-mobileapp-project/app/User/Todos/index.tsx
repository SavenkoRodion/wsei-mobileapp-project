import JsonApiEndpointsEnum from "../../../model/JsonApiEndpointsEnum";
import jsonApiFetch from "../../../hooks/jsonApiFetch";
import jsonApiFetchFirst from "../../../hooks/jsonApiFetchFirst";
import { useEffect, useState } from "react";
import TTodos from "../../../model/TTodos";
import Todo from "../../../components/Todos/Todo";
import { ActivityIndicator, ScrollView, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { TUser } from "../../../model/TUser";

const Todos = () => {
  const { UserName } = useLocalSearchParams();
  const [UserTodos, setUserTodos] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (UserName) {
      jsonApiFetchFirst<TUser | null>(
        JsonApiEndpointsEnum.USERS,
        `username=${UserName}`,
        setUserData
      );
    }
  }, [UserName]);

  useEffect(() => {
    if (userData && userData.id) {
      jsonApiFetch<TTodos>(
        JsonApiEndpointsEnum.TODOS,
        `userId=${userData.id}`,
        setUserTodos
      );
    } else {
      setUserTodos([]);
    }
  }, [userData]);

  return (
    <View style={!UserTodos.length ? styles.centeredContainer : styles.container}>
      {UserTodos.length ? (
        <ScrollView>
          {UserTodos.map((todo, i) => (
            <Todo key={i} title={todo.title} completed={todo.completed} />
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Todos;
