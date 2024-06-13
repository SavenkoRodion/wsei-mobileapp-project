import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Post from "../../components/Posts/Post";
import TComment from "../../model/TComments";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import TPost from "../../model/TPost";
import jsonApiFetchFirst from "../../hooks/jsonApiFetchFirst";
import JsonApiEndpointsEnum from "../../model/JsonApiEndpointsEnum";
import { TUser } from "../../model/TUser";
import jsonApiFetch from "../../hooks/jsonApiFetch";

const PostPage = () => {
  const { PostId } = useLocalSearchParams();
  const [post, setPost] = useState<TPost | null>(null);
  const [comments, setComments] = useState<TComment[]>([]);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    jsonApiFetchFirst<TPost | null>(
      JsonApiEndpointsEnum.POSTS,
      `id=${PostId}`,
      setPost
    );
  }, [PostId]);

  useEffect(() => {
    if (post) {
      jsonApiFetchFirst<TUser | null>(
        JsonApiEndpointsEnum.USERS,
        `id=${post.userId}`,
        setUser
      );
    }
  }, [post]);

  useEffect(() => {
    jsonApiFetch<TComment>(
      JsonApiEndpointsEnum.COMMENTS,
      `postId=${PostId}`,
      setComments
    );
  }, [PostId]);

  return (
    <View style={styles.container}>
      {post && user?.name && comments.length ? (
        <Post
          post={post}
          userName={user.username}
          commentsCount={comments.length}
        >
          <ScrollView>
            {comments.map((comment: TComment, i: number) => (
              <View style={styles.commentContainer} key={i}>
                <Text>Commented by: {comment.email}</Text>
                <Text style={styles.commentName}>{comment.name}</Text>
                <Text>{comment.body}</Text>
              </View>
            ))}
          </ScrollView>
        </Post>
      ) : (
        <ActivityIndicator style={styles.loader} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  commentContainer: {
    paddingVertical: 10,
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "black",
  },
  commentName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostPage;
