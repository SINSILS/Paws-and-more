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
import { useNavigate } from "react-router-dom";
import animalTypeApi from "../api/animalTypeApi";
import { AnimalType } from "../types";

const AnimalTypes = () => {
  const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAnimalTypes = async () => {
    const animalTypesData = (await animalTypeApi.getAllAnimalTypes()).data;
    setAnimalTypes(animalTypesData);
  };

  useEffect(() => {
    setLoading(true);
    fetchAnimalTypes();
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
        Animal types
      </Typography>
      <List sx={{ height: "100vh" }}>
        {animalTypes.map((animalType) => (
          <Box>
            <ListItem sx={{ pt: 0, pb: 0 }}>
              <ListItemButton
                onClick={() => {
                  navigate(`/animalTypes/${animalType.id}/topics`, {
                    state: {
                      name: animalType.name,
                    },
                  });
                }}
              >
                <ListItemText
                  primary={animalType.name}
                  secondary={animalType.description}
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
export default AnimalTypes;
