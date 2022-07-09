import * as React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import Api, { endpoints } from "../../configs/Api";
import cookie from "react-cookies";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/actions/UserCreator";

const theme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [openError, setOpenError] = React.useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Tên người dùng không được để trống")
      .max(150, "Tên người dùng vượt quá độ dài cho phép"),
    password: Yup.string()
      .required("Mật khẩu không được phép để trống")
      .max(128, "Mật khẩu vượt quá độ dài cho phép"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const handleLoginUser = (data) => {
    const login = async () => {
      try {
        const res = await Api.get(endpoints["auth-info"]);

        if (res.status === 200) {
          var formData = new FormData();
          formData.append("username", data.username);
          formData.append("password", data.password);
          formData.append("grant_type", "password");
          formData.append("client_id", res.data.client_id);
          formData.append("client_secret", res.data.client_secret);
          try {
            const res = await Api.post(endpoints["auth"], formData);

            if (res.status === 200) {
              cookie.save("access_token", res.data.access_token);
              dispatch(updateUser());
              nav("/");
            }
          } catch (err) {
            if (err.response.status === 400) {
              setOpenError(true);
              reset();
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    login();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form onSubmit={handleSubmit(handleLoginUser)}>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Collapse in={openError}>
                    <Alert
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpenError(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                      severity="error"
                    >
                      Thông tin đăng nhập không hợp lệ hoặc tài khoản chưa được
                      xác thực nếu bạn là nhà tuyển dụng!
                    </Alert>
                  </Collapse>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    autoComplete="given-name"
                    autoFocus
                    id="username"
                    name="username"
                    type="text"
                    label="Tên người dùng"
                    error={errors.username}
                    helperText={errors.username ? errors.username.message : ""}
                    {...register("username")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="given-name"
                    autoFocus
                    id="password"
                    name="password"
                    type="password"
                    label="Mật khẩu"
                    error={errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    {...register("password")}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Divider>Hoặc </Divider>
              <Stack
                direction="column"
                justifyContent="space-around"
                alignItems="center"
                spacing={1}
                sx={{ my: 2 }}
              ></Stack>
              <Grid container>
                <Grid item sx={{ margin: "0 auto", mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component={Link}
                    to="/"
                    style={{ textDecoration: "inherit" }}
                    color="grey.700"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} /> Quay về trang chủ
                  </Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs>
                  <Link
                    to="/"
                    style={{ textDecoration: "inherit", color: "#1976d2" }}
                  >
                    {"Quên mật khẩu?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to="/register/"
                    style={{ textDecoration: "inherit", color: "#1976d2" }}
                  >
                    Bạn chưa có tài khoản? Đăng ký
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Login;
