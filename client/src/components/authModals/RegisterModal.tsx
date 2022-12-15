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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import authApi from "../../api/authApi";
import userApi from "../../api/userApi";
import { login } from "../../slices/authSlice";
import { setUser } from "../../slices/userSlice";
import { useAppDispatch } from "../../store";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const RegisterSchema = Yup.object({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(5),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords don't match"),
});

const RegisterModal = NiceModal.create(() => {
  const [apiError, setApiError] = useState("");
  const dispatch = useAppDispatch();
  const modal = useModal();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={modal.visible}
      onClose={modal.remove}
      TransitionComponent={Transition}
    >
      <DialogTitle sx={{ width: `${isXs ? "100%" : "320px"}` }}>
        <Typography variant="h5" component="div" textAlign="center">
          Register
        </Typography>
      </DialogTitle>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          try {
            const token = (
              await authApi.register(
                values.username,
                values.email,
                values.password
              )
            ).data.token;
            dispatch(login({ accessToken: token }));
            const user = (await userApi.getUserData()).data;
            dispatch(
              setUser({
                email: user.email,
                username: user.username,
                role: user.role,
                id: user.id,
              })
            );
            modal.remove();
          } catch (error) {
            setApiError("Failed to register, user already exists");
          }
        }}
      >
        {({ handleChange, values, submitForm, touched, errors }) => (
          <Form>
            <DialogContent sx={{ pt: "5px", pb: "5px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <TextField
                  name="username"
                  placeholder="Username"
                  type="username"
                  color="secondary"
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  color="secondary"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  color="secondary"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  color="secondary"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                {apiError && <Typography color="error">{apiError}</Typography>}
              </Box>
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
                color="inherit"
              >
                Register
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
});

export default RegisterModal;
