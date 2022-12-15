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
import { useNavigate, useParams } from "react-router-dom";
import topicApi from "../api/topicApi";
import { Topic } from "../types";
import { useLocation } from "react-router-dom";

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { animalTypeId } = useParams();
  const animalTypeName = location.state.name;

  const fetchTopics = async () => {
    const topicsData = (await topicApi.getAllTopics(animalTypeId!)).data;
    setTopics(topicsData);
  };

  useEffect(() => {
    setLoading(true);
    fetchTopics();
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
        {">"}Topics
      </Typography>
      <List sx={{ height: "100vh" }}>
        {topics.map((topic) => (
          <Box>
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
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};
export default Topics;
