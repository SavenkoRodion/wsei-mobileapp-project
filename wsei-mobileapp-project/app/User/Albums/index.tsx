import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, StyleSheet } from 'react-native';
import jsonApiFetch from "../../../hooks/jsonApiFetch";
import jsonApiFetchFirst from "../../../hooks/jsonApiFetchFirst";
import JsonApiEndpointsEnum from "../../../model/JsonApiEndpointsEnum";
import { TUser } from '../../../model/TUser';
import TAlbums from '../../../model/TAlbums';
import Album from '../../../components/Albums/Album';
import { useLocalSearchParams } from "expo-router";

const Albums = () => {
  const { UserName } = useLocalSearchParams();
  const [albums, setAlbums] = useState([]);
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
      jsonApiFetch<TAlbums>(
        JsonApiEndpointsEnum.ALBUMS,
        `userId=${userData.id}`,
        setAlbums
      );
    } else {
      setAlbums([]);
    }
  }, [userData]);

  return (
    <View style={!albums.length ? styles.centeredContainer : styles.container}>
      {albums.length ? (
        <ScrollView>
          {albums.map((album, i) => (
            <Album key={i} title={album.title} albumId={album.id} />
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

export default Albums;