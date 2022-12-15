import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../slices/authSlice";
import { selectUser } from "../../../slices/userSlice";
import { useAppSelector } from "../../../store";
import { User } from "../../../types";

interface DropDownMenuProps {
  user: User;
}

const DropDownMenu = (props: DropDownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const username = useAppSelector(selectUser).username;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        gap: 1,
        flexGrow: 1,
      }}
    >
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem
          sx={{
            display: "flex",
            justifyContent: "center",
            "&.Mui-disabled": {
              opacity: "1",
            },
          }}
          disabled
        >
          <Typography>{username}</Typography>
        </MenuItem>
        <Divider sx={{ bgcolor: "#000" }} />
        <MenuItem
          onClick={() => {
            dispatch(logout());
          }}
        >
          <Typography color="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
      <Avatar
        sx={{ mr: 2, cursor: "pointer" }}
        alt="RadicalV"
        src={`https://avatars.dicebear.com/api/avataaars/${username}.svg`}
        onClick={handleClick}
      ></Avatar>
    </Box>
  );
};

export default DropDownMenu;
