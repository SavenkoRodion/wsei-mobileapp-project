import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Post from "../../../components/Posts/Post";
import jsonApiFetch from "../../../hooks/jsonApiFetch";
import { useEffect, useState } from "react";
import JsonApiEndpointsEnum from "../../../model/JsonApiEndpointsEnum";
import jsonApiFetchFirst from "../../../hooks/jsonApiFetchFirst";
import { useLocalSearchParams } from "expo-router";

const UserProfilePosts = () => {
  const { UserName } = useLocalSearchParams();
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    jsonApiFetchFirst(
      JsonApiEndpointsEnum.USERS,
      `username=${UserName}`,
      setUserData
    );
  }, [UserName]);

  useEffect(() => {
    if (userData) {
      jsonApiFetch(
        JsonApiEndpointsEnum.POSTS,
        `userId=${userData.id}`,
        setUserPosts
      );
    } else {
      setUserPosts([]);
    }
  }, [userData]);

  useEffect(() => {
    jsonApiFetch(JsonApiEndpointsEnum.COMMENTS, "", setComments);
  }, []);

  return (
    <ScrollView>
      {userPosts.length ? (
        userPosts.map((userPost, i) => (
          <View style={{ marginBottom: 15 }}>
            <Post
              key={i}
              post={userPost}
              userName={`${UserName}`}
              commentsCount={
                comments.filter((comment) => comment.postId === userPost.id)
                  .length
              }
            />
          </View>
        ))
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
  );
};

export default UserProfilePosts;
