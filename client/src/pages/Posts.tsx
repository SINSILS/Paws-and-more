import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditPost from "../components/post modals/EditPost";
import DeleteThis from "../components/deleteItem";
import NiceModal from "@ebay/nice-modal-react";
import AddPost from "../components/post modals/AddPost";
import { useAppSelector } from "../store";
import { selectUser } from "../slices/userSlice";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const { animalTypeId, topicId } = useParams();
  const animalTypeName = location.state.animalTypeName;
  const topicTitle = location.state.topicTitle;
  const [refetch, setRefetch] = useState(false);
  const user = useAppSelector(selectUser);

  const fetchPosts = async () => {
    const postsData = (await postApi.getPosts(animalTypeId!, topicId!)).data;
    setPosts(postsData);
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts();
    setLoading(false);
  }, [refetch]);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: "20px",
          pr: "32px",
          pl: "32px",
        }}
      >
        <Typography variant="h5">
          {animalTypeName}
          {">"}
          {topicTitle}
          {">"}Posts
        </Typography>
        <Button
          color="success"
          variant="contained"
          size="small"
          onClick={() => {
            NiceModal.show(AddPost, {
              animalTypeId: animalTypeId,
              topicId: topicId,
              setRefetch: () => {
                setRefetch(!refetch);
              },
            });
          }}
        >
          {" "}
          Add post{" "}
        </Button>
      </Box>
      <List sx={{ height: "100vh" }}>
        {posts.map((post) => (
          <Box key={post.id}>
            <ListItem sx={{ pt: 0, pb: 0, pl: "32px" }}>
              <ListItemText
                primary={`${post.title} (${post.ownerUser.username})`}
                secondary={post.content}
              />
              {(user.role === "SUPER_ADMIN" ||
                user.role === "ADMIN" ||
                user.id === post.ownerUserId) && (
                <>
                  <IconButton
                    color="info"
                    onClick={() => {
                      NiceModal.show(EditPost, {
                        title: post.title,
                        content: post.content,
                        animalTypeId: animalTypeId,
                        topicId: topicId,
                        postId: post.id,
                        confirm: () => {
                          setRefetch(!refetch);
                        },
                      });
                    }}
                  >
                    {" "}
                    <EditIcon />{" "}
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      NiceModal.show(DeleteThis, {
                        itemType: "post",
                        confirm: () => {
                          postApi
                            .deletePost(animalTypeId!, topicId!, post.id)
                            .then(() => {
                              setRefetch(!refetch);
                              NiceModal.hide(DeleteThis);
                            });
                        },
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};
export default Posts;
