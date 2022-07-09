import * as React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Switch } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import Api, { endpoints } from "../../configs/Api";
import UserRole from "../../permissions/UserRole";

const theme = createTheme();

const Register = () => {
  const nav = useNavigate();
  const [isRole, setIsrole] = React.useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Tên người dùng không được để trống")
      .max(150, "Tên người dùng vượt quá độ dài cho phép"),
    email: Yup.string()
      .required("Email không được để trống")
      .max(254, "Email vượt quá độ dài cho phép")
      .email("Phải là một email hợp lệ"),
    password: Yup.string()
      .required("Mật khẩu không được phép để trống")
      .max(128, "Mật khẩu vượt quá độ dài cho phép"),
    confirmPassword: Yup.string()
      .required("Mật khẩu xác nhân không được để trống")
      .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không đúng"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm(formOptions);

  const registerUser = (data) => {
    const registerData = {
      username: data.username,
      email: data.email,
      password: data.password,
      groups: [{ name: isRole ? UserRole.RECRUITER : UserRole.SEEKER }],
    };

    const register = async () => {
      try {
        const res = await Api.post(endpoints["users"], registerData);

        if (res.status === 201) {
          nav("/login/");
        }
      } catch (err) {
        if (err.response.status === 400) {
          let data = err.response.data;

          if (data.username)
            setError("username", {
              type: "custom",
              message: data.username.join(", "),
            });
          if (data.email)
            setError("email", {
              type: "custom",
              message: data.email.join(", "),
            });
        }
      }
    };

    register();
  };

  const handleRole = () => {
    setIsrole(!isRole);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isRole
              ? "Đăng ký tài khoản nhà tuyển dụng"
              : "Đăng ký tài khoản ứng viên"}
          </Typography>
          <form onSubmit={handleSubmit(registerUser)}>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
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
                    id="email"
                    name="email"
                    type="text"
                    label="Email"
                    error={errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    {...register("email")}
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="given-name"
                    autoFocus
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Xác nhận mật khẩu"
                    error={errors.confirmPassword}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : ""
                    }
                    {...register("confirmPassword")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Bạn là nhà tuyển dụng."
                    value={isRole}
                    onChange={() => handleRole()}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng ký
              </Button>
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
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    to="/login/"
                    style={{ textDecoration: "inherit", color: "#1976d2" }}
                  >
                    Bạn đã có tài khoản? Đăng nhập
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
export default Register;
