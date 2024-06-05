import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import useURLParams from '../../../hooks/useURLParams';
import jsonApiFetch from "../../../hooks/jsonApiFetch";
import jsonApiFetchFirst from "../../../hooks/jsonApiFetchFirst";
import JsonApiEndpointsEnum from "../../../model/JsonApiEndpointsEnum";
import { TUser } from '../../../model/TUser';
import TPhoto from '../../../model/TPhoto';

const AlbumView = () => {
  const { albumId } = useURLParams();
  const { UserName } = useLocalSearchParams();
  const [photos, setPhotos] = useState([]);
  const [userData, setUserData] = useState(null);

  console.log(albumId);
  useEffect(() => {
    jsonApiFetchFirst<TUser | null>(
      JsonApiEndpointsEnum.USERS,
      `username=${UserName}`,
      setUserData
    );
  }, [UserName]);

  useEffect(() => {
    jsonApiFetch<TPhoto>(
      JsonApiEndpointsEnum.PHOTOS,
      `albumId=${albumId}`,
      setPhotos
    );
  }, [userData, albumId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {photos.length > 0 ? (
        photos.map((photo, i) => (
          <View key={i} style={styles.photoContainer}>
            <Link href={photo.url} asChild>
              <TouchableOpacity>
                <Image
                  source={{ uri: photo.thumbnailUrl }}
                  style={styles.photo}
                  alt={photo.title}
                />
              </TouchableOpacity>
            </Link>
          </View>
        ))
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    margin: 10,
  },
  photo: {
    width: 100,
    height: 100,
  },
});

export default AlbumView;
