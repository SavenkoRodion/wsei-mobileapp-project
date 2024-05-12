import { useEffect, useState } from "react";
import TPost from "../model/TPost";
import TComment from "../model/TComments";
import { TUser } from "../model/TUser";
import JsonApiEndpointsEnum from "../model/JsonApiEndpointsEnum";
import Post from "../components/Posts/Post";
import jsonApiFetch from "../hooks/jsonApiFetch";
import { View, Text, ScrollView } from "react-native";

const Posts = () => {
  const [allPosts, setAllPosts] = useState<TPost[]>([]);
  const [pagePosts, setPagePosts] = useState<TPost[]>([]);
  const [users, setUsers] = useState<TUser[]>([]);
  const [comments, setComments] = useState<TComment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [countPages, setCountPages] = useState<number>(0);

  const postsPerPage: number = 15;

  const [response, setResponse] = useState<Response | null>(null);

  useEffect(() => {
    jsonApiFetch<TPost>(JsonApiEndpointsEnum.POSTS, "", setAllPosts);
    jsonApiFetch<TUser>(JsonApiEndpointsEnum.USERS, "", setUsers);
    jsonApiFetch<TComment>(JsonApiEndpointsEnum.COMMENTS, "", setComments);
  }, []);

  useEffect(() => {
    setCountPages(Math.ceil(allPosts.length / postsPerPage));
    setPagePosts(
      allPosts.slice(postsPerPage * (page - 1), postsPerPage * page)
    );
  }, [allPosts, postsPerPage, page]);

  const handleChange = (_: React.ChangeEvent<unknown>, page: number): void => {
    setPagePosts(
      allPosts.slice(postsPerPage * (page - 1), postsPerPage * page)
    );
    setPage(page);
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      {pagePosts.length ? (
        pagePosts.map((post: TPost, i: number) => (
          <View style={{ marginBottom: 15 }}>
            <Post
              key={i}
              post={post}
              userName={
                users.find((user) => user.id === post.userId)?.username!
              }
              commentsCount={
                comments.filter((comment) => comment.postId === post.id).length
              }
            />
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
      {countPages && pagePosts.length ? (
        <Text>pagination will be here</Text>
      ) : (
        // <Pagination
        //   sx={{ ul: { justifyContent: "center" }, marginBottom: "20px" }}
        //   count={countPages}
        //   page={page}
        //   shape="rounded"
        //   onChange={handleChange}
        //   color="primary"
        //   siblingCount={2}
        //   showLastButton
        //   showFirstButton
        // />
        <></>
      )}
    </ScrollView>
  );
};

export default Posts;
