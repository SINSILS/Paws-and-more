import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface Props {
  itemType: string;
  children: string;
  confirm: () => void;
}

const DeleteThis = NiceModal.create((props: Props) => {
  const modal = useModal();
  const { itemType, children, confirm } = props;

  return (
    <Dialog
      open={modal.visible}
      onClose={modal.remove}
      TransitionComponent={Transition}
    >
      <DialogTitle>Do you want to delete this {itemType}</DialogTitle>
      <DialogContent>
        {children ? (
          <Typography>
            If you delete this {itemType}, all associated {children} will be
            deleted
          </Typography>
        ) : (
          <Typography>If you delete this {itemType} will be deleted</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            modal.remove();
          }}
          color="inherit"
        >
          Cancel
        </Button>
        <Button onClick={confirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default DeleteThis;
