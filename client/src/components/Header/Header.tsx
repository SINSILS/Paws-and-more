import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { selectUser } from "../../slices/userSlice";
import HamburgerButton from "./components/HamburgerButton";
import NiceModal from "@ebay/nice-modal-react";
import LoginModal from "../authModals/LoginModal";
import RegisterModal from "../authModals/RegisterModal";
import MobileMenu from "./components/MobileMenu";
import DropDownMenu from "./components/DropDownMenu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Link
              href="/"
              color="inherit"
              variant="h5"
              sx={{ flexGrow: 1, textDecoration: "none" }}
            >
              Paws and more
            </Link>
          </Box>
          {user.id && !isXs ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  gap: 1,
                  flexGrow: 1,
                }}
              >
                {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                  <Button
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                    color="inherit"
                  >
                    Admin Dashboard
                  </Button>
                )}
              </Box>
              <DropDownMenu user={user} />{" "}
            </>
          ) : user.id && isXs ? (
            <HamburgerButton onClick={() => setOpen((prev) => !prev)} />
          ) : isXs ? (
            <HamburgerButton onClick={() => setOpen((prev) => !prev)} />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}
            >
              <Button
                color="inherit"
                sx={{ borderRadius: 2 }}
                onClick={() => {
                  NiceModal.show(LoginModal);
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{ borderRadius: 2 }}
                onClick={() => {
                  NiceModal.show(RegisterModal);
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {open && isXs && (
        <MobileMenu hidePanel={() => setOpen(false)} user={user} />
      )}
    </Box>
  );
};
export default Header;
