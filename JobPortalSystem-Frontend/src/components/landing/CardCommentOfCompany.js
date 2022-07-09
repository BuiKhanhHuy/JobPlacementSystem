import "moment/locale/vi";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Divider,
  Grid,
  List,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import Api, { authApi, endpoints } from "../../configs/Api";
import Moment from "react-moment";
import Loading from "../commons/Loading";
import { useSelector } from "react-redux";
import FormUpdateComment from "../forms/FormUpdateComment";
import { useConfirm } from "material-ui-confirm";
import alertOpen from "../../store/actions/AlertCreator";
import { useDispatch } from "react-redux";

const CardCommentOfCompnay = ({ companyId }) => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [flag, setFlag] = useState(false);
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
  const [page, setPage] = useState(1);
  const [openUpdateComment, setOpenUpdateComment] = useState({
    isOpen: false,
    isSuccess: false,
    commentId: null,
    commentContent: "",
  });

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
    defaultValues: { content: "" },
  });

  useEffect(() => {
    const loadComments = async () => {
      const pageSize = 5;
      const query = `page_size=${pageSize}&page=${page}`;

      const res = await Api.get(
        `${endpoints["company-comments"](companyId)}?${query}`
      );

      if (res.status === 200) {
        setComments(res.data.results);
        setIsLoadingComments(false);
        setPagination({
          count: res.data.count,
          sizeNumber: Math.ceil(res.data.count / pageSize),
        });
      }
      try {
      } catch (err) {
        console.error(err);
      }
    };

    loadComments();
  }, [companyId, flag, page, openUpdateComment.isSuccess]);

  const onAddComment = (data) => {
    const addComment = async () => {
      try {
        const res = await authApi().post(
          endpoints["company-comment"](companyId),
          {
            content: data.content,
          }
        );

        if (res.status === 201) {
          setFlag(!flag);
          reset();
        }
      } catch (err) {
        console.error(err);
      }
    };

    addComment();
  };

  const onDeleteComment = (commentId) => {
    const deleteComment = async () => {
      try {
        const res = await authApi().delete(endpoints["comments"](commentId));

        if (res.status === 204) {
          setFlag(!flag);
          // thong bao xoa binh luan thanh cong
          dispatch(alertOpen("success", "Xóa bình luận thành công"));
        }
      } catch (err) {
        // thong bao xoa binh luan khong thanh cong
        dispatch(alertOpen("error", "Xóa bình luận thất bại"));
        console.error(err);
      }
    };

    confirm({
      title: "Bạn có chắc chắn xóa bình luận này?",
      description: "Bình luận này sẽ được xóa vĩnh viễn",
      confirmationText: "Có",
      cancellationText: "Không",
    })
      .then(() => deleteComment())
      .catch((err) => console.error(err));
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  console.log("Comment: render");

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          border: 1,
          borderColor: "grey.200",
          borderRadius: 1,
        }}
      >
        <Stack spacing={2} direction={"column"}>
          <form onSubmit={handleSubmit(onAddComment)}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              id="content"
              name="content"
              size="small"
              type="text"
              placeholder="Viết bình luận của bạn tại đây ..."
              error={errors.content}
              helperText={errors.content?.message}
              {...register("content")}
            />
            <Button
              variant="contained"
              sx={{ width: 150, mt: 1 }}
              startIcon={<SendIcon />}
              type="submit"
            >
              Bình luận
            </Button>
          </form>
          <Divider light />
          {isLoadingComments && comments.length === 0 ? (
            <Loading />
          ) : comments.length === 0 ? (
            <Typography variant="body1" color="grey.600">
              Chưa có bình luận nào cho công ty này.
            </Typography>
          ) : (
            <List sx={{ width: "100%" }}>
              {comments.map((comment) => (
                <Grid container wrap="nowrap" spacing={1} sx={{ mb: 2 }}>
                  <Grid item>
                    <Avatar
                      sx={{ width: 60, height: 60 }}
                      src={comment.user.avatar}
                    />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontSize: 18 }}
                    >
                      {comment.user.username}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {comment.content}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        color={"grey.500"}
                      >
                        <Moment fromNow>{comment.updated_date}</Moment>
                      </Typography>
                      {user.id === comment.user.id && (
                        <>
                          <Typography
                            variant="body1"
                            gutterBottom
                            color={"grey.500"}
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              setOpenUpdateComment({
                                ...openUpdateComment,
                                isOpen: true,
                                commentId: comment.id,
                                commentContent: comment.content,
                              })
                            }
                          >
                            Chỉnh sửa
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                            color={"grey.500"}
                            sx={{ cursor: "pointer" }}
                            onClick={() => onDeleteComment(comment.id)}
                          >
                            Xóa
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              ))}
              {pagination.sizeNumber >= 2 && (
                <Box sx={{ pt: 5, pb: 2 }}>
                  <Stack>
                    <Pagination
                      count={pagination.sizeNumber}
                      color="primary"
                      variant="outlined"
                      sx={{ margin: "0 auto" }}
                      page={page}
                      onChange={handleChangePage}
                    />
                  </Stack>
                </Box>
              )}
            </List>
          )}
        </Stack>
      </Box>
      <FormUpdateComment
        openUpdateComment={openUpdateComment}
        setOpenUpdateComment={setOpenUpdateComment}
      />
    </>
  );
};

export default memo(CardCommentOfCompnay);
