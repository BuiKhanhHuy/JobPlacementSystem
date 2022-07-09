import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import {
  Alert,
  Button,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { authApi, endpoints } from "../../configs/Api";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const ChangePassword = () => {
  const [openNotification, setOpenNotification] = useState({
    isOpen: false,
    label: "",
    severity: "success",
  });
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Mật khẩu cũ không được để trống"),
    newPassword: Yup.string().required("Mật khẩu mới không được để trống"),
    confirmPassword: Yup.string()
      .required("Mật khẩu xác nhân không được để trống")
      .oneOf([Yup.ref("newPassword")], "Mật khẩu xác nhận không đúng"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const handleSubmitFormChangePassword = (data) => {
    setIsLoadingSave(true);
    const { oldPassword, newPassword } = data;

    var formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("new_password", newPassword);

    const changePassword = async () => {
      try {
        const res = await authApi().post(
          endpoints["change-password"],
          formData
        );

        if (res.status === 200) {
          // thong bao doi mat khau thanh cong
          setOpenNotification({
            isOpen: true,
            label: "Thay đổi mật khẩu thành công",
            severity: "success",
          });
          setIsLoadingSave(false);
        }
      } catch (err) {
        if (err.response.status === 403) {
          // thong bao doi mat khau that bai vi sai mat khau cu
          setOpenNotification({
            isOpen: true,
            label:
              "Thay đổi mật khẩu không thành công do mật khẩu cũ không chính xác. Vui lòng thử lại",
            severity: "error",
          });
        } else {
          // thong bao doi mat khau that bai
          setOpenNotification({
            isOpen: true,
            label: "Thay đổi mật khẩu không thành công",
            severity: "error",
          });
        }
        setIsLoadingSave(false);
        console.error(err);
      }
    };

    changePassword();
    reset();
  };

  return (
    <>
      <Collapse in={openNotification.isOpen}>
        <Alert
          variant="filled"
          severity={openNotification.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenNotification({ ...openNotification, isOpen: false });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {openNotification.label}
        </Alert>
      </Collapse>
      <Typography variant="h6" pb={1} gutterBottom component="div">
        || Thay đổi mật khẩu
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: "32px",
          boxShadow: 3,
        }}
      >
        <form onSubmit={handleSubmit(handleSubmitFormChangePassword)}>
          <Grid
            container
            md={12}
            justifyContent="center"
            style={{ padding: "12px 0" }}
          >
            <Grid item xs={12} md={6} sm={12}>
              <TextField
                fullWidth
                id="oldPassword"
                name="oldPassword"
                size="small"
                type="password"
                label="Mật khẩu cũ"
                error={errors.oldPassword}
                helperText={
                  errors.oldPassword
                    ? errors.oldPassword.message
                    : "Nhập mật khẩu cũ"
                }
                {...register("oldPassword")}
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
                id="newPassword"
                name="newPassword"
                size="small"
                type="password"
                label="Mật khẩu mới"
                error={errors.newPassword}
                helperText={
                  errors.newPassword
                    ? errors.newPassword.message
                    : "Nhập mật khẩu mới"
                }
                {...register("newPassword")}
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
                id="confirmPassword"
                name="confirmPassword"
                size="small"
                type="password"
                label="Xác nhận mật khẩu"
                error={errors.confirmPassword}
                helperText={
                  errors.confirmPassword
                    ? errors.confirmPassword.message
                    : "Nhập xác nhận mật khẩu"
                }
                {...register("confirmPassword")}
              />
            </Grid>
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
              <Button variant="outlined" size="medium" type="reset">
                Không Lưu
              </Button>
            </span>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default ChangePassword;
