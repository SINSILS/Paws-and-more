import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import animalTypeApi from "../../api/animalTypeApi";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddAnimalTypeSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
});

interface Props {
  setRefetch: () => void;
}

const AddAnimalType = NiceModal.create((props: Props) => {
  const modal = useModal();
  const [apiError, setApiError] = useState("");
  const { setRefetch } = props;

  return (
    <Dialog
      open={modal.visible}
      onClose={modal.remove}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Typography textAlign="center">Add animal type</Typography>
      </DialogTitle>
      <Formik
        initialValues={{ name: "", description: "" }}
        validationSchema={AddAnimalTypeSchema}
        onSubmit={(values) => {
          try {
            animalTypeApi.createAnimalType(values).then(() => {
              setRefetch();
              modal.remove();
            });
          } catch (error) {
            setApiError("Something went wrong!");
          }
        }}
      >
        {({ handleChange, values, submitForm, touched, errors }) => (
          <Form>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <TextField
                  name="name"
                  placeholder="Name"
                  label="Name"
                  type="text"
                  color="secondary"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                ></TextField>
                <TextField
                  name="description"
                  placeholder="Description"
                  label="Description"
                  type="text"
                  color="secondary"
                  multiline
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                ></TextField>
              </Box>
              {apiError && <Typography color="error">{apiError}</Typography>}
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                pb: "15px",
              }}
            >
              <Button onClick={() => modal.remove()} color="inherit">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  submitForm();
                }}
                color="success"
              >
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
});

export default AddAnimalType;
