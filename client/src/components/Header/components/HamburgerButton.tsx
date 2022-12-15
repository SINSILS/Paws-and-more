import { Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface HamburgerButtonProps {
  onClick?: () => void;
}

const HamburgerButton = (props: HamburgerButtonProps) => {
  const { onClick } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        gap: 1,
        flexGrow: 1,
      }}
      onClick={onClick}
    >
      <MenuIcon />
    </Box>
  );
};

export default HamburgerButton;