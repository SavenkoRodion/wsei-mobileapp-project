import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import useUserName from '../../hooks/useUserName';

interface AlbumProps {
  title: string;
  albumId: number;
}

const Album = ({ title, albumId }: AlbumProps) => {
  const userName = useUserName();

  return (
    <Link href={`/User/${userName}/Albums/${albumId.toString()}`} asChild>
      <TouchableOpacity style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: 500,
  },
  title: {
    fontSize: 24,
  },
});

export default Album;
