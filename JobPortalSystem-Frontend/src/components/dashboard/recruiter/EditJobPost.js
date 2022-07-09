import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { memo, useEffect, useRef } from "react";
import CardNewPost from "./CardNewPost";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: "80%",
    height: "90%",
  },
}));

const EditJobPost = (props) => {
  const classes = useStyles();
  const { openEditJobPost, setOpenEditJobPost } = props;

  const handleClose = () => {
    setOpenEditJobPost({ ...openEditJobPost, isOpen: false });
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (openEditJobPost.isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openEditJobPost.isOpen]);

  console.log("EditJobPost: render");
  return (
    <>
      <Dialog
        open={openEditJobPost.isOpen}
        maxWidth={"md"}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="scroll-dialog-title">
         # Chỉnh sửa thông tin bài đăng
        </DialogTitle>
        <DialogContent dividers={"paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <CardNewPost type="edit" jobPostId={openEditJobPost.jobPostId} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Thoát</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(EditJobPost);
