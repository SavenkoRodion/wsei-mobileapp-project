import { useEffect, useState } from "react";
import TPost from "../model/TPost";
import TComment from "../model/TComments";
import { TUser } from "../model/TUser";
import JsonApiEndpointsEnum from "../model/JsonApiEndpointsEnum";
import Post from "../components/Posts/Post";
import jsonApiFetch from "../hooks/jsonApiFetch";
import { View, FlatList } from "react-native";

const Posts = () => {
  const [allPosts, setAllPosts] = useState<TPost[]>([]);
  const [users, setUsers] = useState<TUser[]>([]);
  const [comments, setComments] = useState<TComment[]>([]);

  useEffect(() => {
    jsonApiFetch<TPost>(JsonApiEndpointsEnum.POSTS, "", setAllPosts);
    jsonApiFetch<TUser>(JsonApiEndpointsEnum.USERS, "", setUsers);
    jsonApiFetch<TComment>(JsonApiEndpointsEnum.COMMENTS, "", setComments);
  }, []);

  return (
    <View>
      <FlatList
        style={{ padding: 10 }}
        data={allPosts}
        renderItem={({ item: post, index: i }) => {
          return (
            <View style={{ marginBottom: 15 }}>
              <Post
                key={i}
                post={post}
                userName={
                  users.find((user) => user.id === post.userId)?.username!
                }
                commentsCount={
                  comments.filter((comment) => comment.postId === post.id)
                    .length
                }
              />
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default Posts;
