import NiceModal from "@ebay/nice-modal-react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../slices/authSlice";
import { User } from "../../../types";
import LoginModal from "../../authModals/LoginModal";
import RegisterModal from "../../authModals/RegisterModal";

interface MobileMenuProps {
  hidePanel: () => void;
  user: User;
}

const MobileMenu = (props: MobileMenuProps) => {
  const { hidePanel, user } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <List sx={{ height: "100vh" }}>
      {user.id ? (
        <>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>{user.username}</Typography>
          </ListItem>
          <Divider />
          {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
            <ListItem>
              <ListItemButton
                onClick={() => {
                  hidePanel();
                  navigate("/dashboard");
                }}
              >
                <Typography color="inherit">Admin dashboard</Typography>
              </ListItemButton>
            </ListItem>
          )}
          <ListItem>
            <ListItemButton
              onClick={() => {
                dispatch(logout());
                hidePanel();
              }}
            >
              <Typography color="inherit">Logout</Typography>
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem>
            <ListItemButton
              onClick={() => {
                NiceModal.show(LoginModal);
              }}
            >
              Login
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                NiceModal.show(RegisterModal);
              }}
            >
              Register
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );
};

export default MobileMenu;
