import "moment/locale/vi";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { authApi, endpoints } from "../../configs/Api";
import alertOpen from "../../store/actions/AlertCreator";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: "80%",
  },
}));

const FormUploadComment = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { openUpdateComment, setOpenUpdateComment } = props;

  const validationSchema = Yup.object().shape({
    content: Yup.string()
      .required("Bạn hãy nhập nội dung để bình luận")
      .max(255, "Nội dung bình luận vượt quá độ dài cho phép"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitUpdateComment = (data) => {
    const updateComment = async () => {
      try {
        const res = await authApi().patch(
          endpoints["comments"](openUpdateComment.commentId),
          { content: data.content }
        );

        if (res.status === 200) {
          // thong bao cap nhat thanh cong
          dispatch(alertOpen("success", "Cập nhật bình luận thành công"));
          setOpenUpdateComment({
            isOpen: false,
            isSuccess: !openUpdateComment.isSuccess,
            commentId: null,
            commentContent: "",
          });
        }
      } catch (err) {
        // thong bao cap nhat that bai
        dispatch(alertOpen("error", "Đã xảy ra lỗi trong quá trình cập nhật"));
        console.error(err);
      }
    };

    if (openUpdateComment.commentId) {
      updateComment();
    }
  };

  useEffect(() => {
    reset({ content: openUpdateComment.commentContent });
  }, [openUpdateComment.commentContent]);

  console.log("Form update: render");
  return (
    <div>
      <Dialog
        open={openUpdateComment.isOpen}
        onClose={() =>
          setOpenUpdateComment({
            ...openUpdateComment,
            isOpen: false,
            commentId: null,
            commentContent: "",
          })
        }
        classes={{ paper: classes.dialogPaper }}
      >
        <form onSubmit={handleSubmit(onSubmitUpdateComment)}>
          <DialogTitle>Chỉnh sửa bình luận</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              minRows={4}
              id="content"
              name="content"
              size="small"
              type="text"
              error={errors.content}
              helperText={errors.content?.message}
              {...register("content")}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                setOpenUpdateComment({
                  ...openUpdateComment,
                  isOpen: false,
                  commentId: null,
                  commentContent: "",
                })
              }
            >
              Hủy
            </Button>
            <Button type="submit">Chỉnh sửa</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default memo(FormUploadComment);
