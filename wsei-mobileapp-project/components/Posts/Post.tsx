import { Link } from "expo-router";
import TPost from "../../model/TPost";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type PostProps = {
  post: TPost;
  userName: string;
  commentsCount: number;
  children?: JSX.Element;
};

const Post = ({ post, userName, commentsCount, children }: PostProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.postedBy}>
        Posted by
        <Link style={styles.link} href={`/User/${userName}`}>
          {` ${userName}`}
        </Link>
      </Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Text style={styles.comments}>
        This post has
        <Text style={styles.link} onPress={() => {}}>
          {` ${commentsCount} comments`}
        </Text>
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 20,
  },
  postedBy: {
    marginBottom: 10,
  },
  link: {
    color: "blue",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    marginBottom: 10,
  },
  comments: {
    marginTop: 10,
  },
});

export default Post;
