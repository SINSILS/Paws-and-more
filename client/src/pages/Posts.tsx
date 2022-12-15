import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postApi from "../api/postApi";
import userApi from "../api/userApi";
import { Post } from "../types";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const { animalTypeId, topicId } = useParams();
  const animalTypeName = location.state.animalTypeName;
  const topicTitle = location.state.topicTitle;

  const fetchPosts = async () => {
    const postsData = (await postApi.getPosts(animalTypeId!, topicId!)).data;
    console.log(postsData);
    setPosts(postsData);
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts();
    setLoading(false);
  }, []);
  return (
    <Box>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 2,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      <Typography variant="h5" sx={{ pl: "32px", pt: "20px" }}>
        {animalTypeName}
        {">"}
        {topicTitle}
        {">"}Posts
      </Typography>
      <List sx={{ height: "100vh" }}>
        {posts.map((post) => (
          <Box>
            <ListItem sx={{ pt: 0, pb: 0, pl: "32px" }}>
              <ListItemText
                primary={`${post.title} (${post.ownerUser.username})`}
                secondary={post.content}
              />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};
export default Posts;
