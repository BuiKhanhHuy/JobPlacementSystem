import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { Button, Grid, TextField, Typography } from "@mui/material";
import CardUploadAvatar from "../../components/commons/CardUploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { authApi, endpoints } from "../../configs/Api";
import alertOpen from "../../store/actions/AlertCreator";
import { updateUser } from "../../store/actions/UserCreator";

const Account = () => {
  const dispatch = useDispatch();
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const user = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const [avatarImageUrl, setAvatarImageUrl] = useState();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Tên người dùng không được để trống")
      .max(150, "Tên người dùng vượt quá độ dài cho phép"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: user.username ? user.username : "",
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm(formOptions);

  useEffect(() => {
    if (avatar) {
      setAvatarImageUrl(URL.createObjectURL(avatar));
    } else setAvatarImageUrl(user.avatar ? user.avatar : "");
  }, [avatar]);

  const onChooseImage = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handSubmitFormAccount = (data) => {
    setIsLoadingSave(true);
    console.log(data);
    const handleUpdateUser = async () => {
      var formData = new FormData();
      formData.append("username", data.username);
      formData.append("avatar", avatar);

      try {
        const res = await authApi().patch(endpoints["current-user"], formData);

        if (res.status === 200) {
          // thay doi user toan cuc
          dispatch(updateUser());
          // thong bao cap nhat user thanh cong
          dispatch(
            alertOpen("success", "Cập nhật thông tin tài khoản thành công")
          );
        }
      } catch (err) {
        // thong bao cap nhat user thất bại
        dispatch(alertOpen("error", "Cập nhật thông tin tài khoản thất bại"));
      } finally {
        setIsLoadingSave(false);
      }
    };

    handleUpdateUser();
  };

  const handleResetForm = () => {
    reset();
    setAvatar(null);
  };

  return (
    <>
      <Typography variant="h6" pb={1} gutterBottom component="div">
        || Thông tin tài khoản
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: "32px",
          boxShadow: 3,
        }}
      >
        <form onSubmit={handleSubmit(handSubmitFormAccount)}>
          <Grid
            container
            md={12}
            justifyContent="center"
            style={{ padding: "12px 0" }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CardUploadAvatar
                label={"Ảnh đại diện của bạn"}
                url={avatarImageUrl}
                onChangeImage={onChooseImage}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <TextField
                fullWidth
                id="username"
                name="username"
                size="small"
                type="text"
                label="Tên người dùng (*)"
                error={errors.username}
                helperText={
                  errors.username
                    ? errors.username.message
                    : "Nhập tên người dùng"
                }
                {...register("username")}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            md={12}
            justifyContent="center"
            style={{ padding: "12px 0" }}
          >
            <Grid item xs={12} md={6} sm={12}>
              <TextField
                fullWidth
                required
                disabled
                id="outlined-email-input"
                label="Email"
                type="email"
                size="small"
                helperText="Email tài khoản của bạn"
                value={user.email}
              />
            </Grid>
          </Grid>
          <Grid
            container
            md={12}
            justifyContent="center"
            style={{ paddingBottom: "6px" }}
          >
            <Grid item></Grid>
          </Grid>
          <Grid item xs={12} md={12} sm={12} align="center" my={3}>
            <span style={{ marginRight: "5px" }}>
              <LoadingButton
                type="submit"
                startIcon={<SaveIcon />}
                loading={isLoadingSave}
                loadingPosition="start"
                variant="contained"
              >
                Lưu
              </LoadingButton>
            </span>
            <span style={{ marginLeft: "5px" }}>
              <Button
                variant="outlined"
                size="medium"
                type="button"
                onClick={handleResetForm}
              >
                Đặt lại
              </Button>
            </span>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Account;
