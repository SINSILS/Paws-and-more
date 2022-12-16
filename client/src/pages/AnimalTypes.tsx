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
import { useNavigate } from "react-router-dom";
import animalTypeApi from "../api/animalTypeApi";
import AddAnimalType from "../components/animalType modals/AddAnimalType";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AnimalType } from "../types";
import { useAppSelector } from "../store";
import { selectUser } from "../slices/userSlice";
import EditAnimalType from "../components/animalType modals/EditAnimalType";
import NiceModal from "@ebay/nice-modal-react";
import DeleteThis from "../components/deleteItem";

const AnimalTypes = () => {
  const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [refetch, setRefetch] = useState(false);

  const fetchAnimalTypes = async () => {
    const animalTypesData = (await animalTypeApi.getAllAnimalTypes()).data;
    setAnimalTypes(animalTypesData);
  };

  useEffect(() => {
    setLoading(true);
    fetchAnimalTypes();
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
        <Typography variant="h5">Animal types</Typography>
        {user.role === "SUPER_ADMIN" && (
          <Button
            color="success"
            variant="contained"
            size="small"
            onClick={() => {
              NiceModal.show(AddAnimalType, {
                setRefetch: () => {
                  setRefetch(!refetch);
                },
              });
            }}
          >
            {" "}
            Add Animal type{" "}
          </Button>
        )}
      </Box>
      <List sx={{ height: "100vh" }}>
        {animalTypes.map((animalType) => (
          <Box key={animalType.id}>
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
              {user.role === "SUPER_ADMIN" && (
                <>
                  <IconButton
                    color="info"
                    onClick={() => {
                      NiceModal.show(EditAnimalType, {
                        name: animalType.name,
                        description: animalType.description,
                        animalTypeId: animalType.id,
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
                        itemType: "animal type",
                        children: "topics and posts",
                        confirm: () => {
                          animalTypeApi
                            .deleteAnimalType(animalType.id)
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
export default AnimalTypes;
