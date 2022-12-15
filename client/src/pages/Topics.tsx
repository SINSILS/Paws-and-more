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
import { useNavigate, useParams } from "react-router-dom";
import topicApi from "../api/topicApi";
import { Topic } from "../types";
import { useLocation } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";
import { useAppSelector } from "../store";
import { selectUser } from "../slices/userSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTopic from "../components/topic modals/EditTopic";
import DeleteThis from "../components/deleteItem";
import AddTopic from "../components/topic modals/AddTopic";

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { animalTypeId } = useParams();
  const animalTypeName = location.state.name;
  const user = useAppSelector(selectUser);
  const [refetch, setRefetch] = useState(false);

  const fetchTopics = async () => {
    const topicsData = (await topicApi.getAllTopics(animalTypeId!)).data;
    setTopics(topicsData);
  };

  useEffect(() => {
    setLoading(true);
    fetchTopics();
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
          {">"}Topics
        </Typography>
        {(user.role === "SUPER_ADMIN" || user.role === "ADMIN") && (
          <Button
            color="success"
            variant="contained"
            size="small"
            onClick={() => {
              NiceModal.show(AddTopic, {
                animalTypeId: animalTypeId,
                setRefetch: () => {
                  setRefetch(!refetch);
                },
              });
            }}
          >
            {" "}
            Add topic{" "}
          </Button>
        )}
      </Box>
      <List sx={{ height: "100vh" }}>
        {topics.map((topic) => (
          <Box key={topic.id}>
            <ListItem sx={{ pt: 0, pb: 0 }}>
              <ListItemButton
                onClick={() => {
                  navigate(
                    `/animalTypes/${animalTypeId}/topics/${topic.id}/posts`,
                    {
                      state: {
                        animalTypeName: animalTypeName,
                        topicTitle: topic.title,
                      },
                    }
                  );
                }}
              >
                <ListItemText
                  primary={topic.title}
                  secondary={topic.description}
                />
              </ListItemButton>
              {(user.role === "SUPER_ADMIN" || user.role === "ADMIN") && (
                <>
                  <IconButton
                    color="info"
                    onClick={() => {
                      NiceModal.show(EditTopic, {
                        title: topic.title,
                        description: topic.description,
                        animalTypeId: animalTypeId,
                        topicId: topic.id,
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
                        itemType: "topic",
                        children: "posts",
                        confirm: () => {
                          topicApi
                            .deleteTopic(animalTypeId!, topic.id)
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
export default Topics;
