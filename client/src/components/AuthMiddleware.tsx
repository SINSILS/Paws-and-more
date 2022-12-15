import { Box, CircularProgress } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import userApi from "../api/userApi";
import { setUser } from "../slices/userSlice";
import { useAppDispatch } from "../store";

interface Props {
  children: ReactElement;
}

const AuthMiddleware = (props: Props) => {
  const { children } = props;
  const token = localStorage.getItem("accessToken") || "";
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      userApi
        .getUserData()
        .then((res) => {
          setLoading(true);
          const user = res.data;

          dispatch(
            setUser({
              email: user.email,
              username: user.username,
              role: user.role,
              id: user.id,
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return children;
};

export default AuthMiddleware;