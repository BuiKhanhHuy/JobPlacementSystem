import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import CardCustomeEditor from "../components/commons/CardCustomEditor";
import { Controller, useForm } from "react-hook-form";
import { authApi, endpoints } from "../configs/Api";
import { BackdropLoading } from "../components/commons/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/actions/UserCreator";

const RequestSeekerProfile = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const cities = useSelector((state) => state.cities.cities);
  const [fieldRichText, setFieldRichText] = useState({
    careerGoals: "",
    personalSkills: "",
  });

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Họ và tên không được để trống")
      .max(100, "Họ và tên vượt quá độ dài cho phép"),
    phoneNumber: Yup.string()
      .required("Số điện thoại không được để trống")
      .max(15, "Số điện thoại vượt quá độ dài cho phép"),
    gender: Yup.number()
      .required("Bạn phải chọn giới tính")
      .typeError("Bạn phải chọn giới tính"),
    dateOfBirth: Yup.date()
      .required("Ngày sinh không được để trống")
      .typeError("Bạn hãy nhập ngày sinh"),
    maritalStatus: Yup.number()
      .required("Bạn phải chọn tình trạng hôn nhân")
      .typeError("Bạn phải chọn tình trạng hôn nhân"),
    address: Yup.string()
      .required("Địa chỉ không được để trống")
      .max(100, "Địa chỉ vượt quá độ dài cho phép"),
    city: Yup.number()
      .required("Bạn phải tỉnh/thành phố sinh sống")
      .typeError("Bạn phải tỉnh/thành phố sinh sống"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      maritalStatus: "",
      address: "",
      city: "",
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm(formOptions);

  const resetForm = () => {
    reset();
    setFieldRichText({
      careerGoals: "",
      personalSkills: "",
    });
  };

  // submit form
  const handleSubmitFormJobSeekerProfile = (data) => {
    const {
      fullName,
      phoneNumber,
      gender,
      dateOfBirth,
      maritalStatus,
      address,
      city,
    } = data;
    var formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("phone_number", phoneNumber);
    formData.append("gender", gender);
    formData.append("date_of_birth", dateOfBirth.toISOString());
    formData.append("marital_status", maritalStatus);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("career_goals", fieldRichText.careerGoals);
    formData.append("personal_skills", fieldRichText.personalSkills);

    const createOrUpdateJobSeekerProfile = async () => {
      setIsLoadingSave(true);
      try {
        const res = await authApi().post(
          endpoints["user-job-seeker-profile"](user.id),
          formData
        );

        // thong bao cap nhat thanh cong
        if (res.status === 200 || res.status === 201) {
          // dispatch va update user
          dispatch(updateUser());
          nav("/seeker/general-management/");
        }
      } catch (err) {
        // thong bao cap nhat that bai
        console.error(err);
      } finally {
        setIsLoadingSave(false);
      }
    };

    createOrUpdateJobSeekerProfile();
  };

  console.log("CardJobSeekerProfile: render");

  return (
    <Box>
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          elevation={12}
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, boxShadow: 2 }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ mb: 3 }}
            color="info"
          >
            Cập nhật hồ sơ của bạn
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitFormJobSeekerProfile)}>
            <Grid container md={12}>
              <Grid item xs={12} md={8} sm={12} sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  size="small"
                  type="text"
                  label="Họ và tên (*)"
                  error={errors.fullName}
                  helperText={
                    errors.fullName ? errors.fullName.message : "Nhập họ và tên"
                  }
                  {...register("fullName")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  size="small"
                  type="text"
                  label="Số điện thoại(*)"
                  error={errors.phoneNumber}
                  helperText={
                    errors.phoneNumber
                      ? errors.phoneNumber.message
                      : "Nhập số điện thoại"
                  }
                  {...register("phoneNumber")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ p: 2 }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      id="dateOfBirth"
                      size="small"
                      fullWidth
                      inputProps={{
                        placeholder: "MM-DD-YYYY",
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Ngày sinh"
                      error={errors.dateOfBirth}
                      helperText={
                        errors.dateOfBirth
                          ? errors.dateOfBirth.message
                          : "Chọn ngày sinh"
                      }
                    />
                  )}
                  name="dateOfBirth"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ p: 2 }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="gender"
                      select
                      size="small"
                      fullWidth
                      label="Giới tính (*)"
                      error={errors.gender}
                      helperText={
                        errors.gender ? errors.gender.message : "Chọn giới tính"
                      }
                    >
                      <MenuItem value={1}>Nam</MenuItem>
                      <MenuItem value={2}>Nữ</MenuItem>
                      <MenuItem value={3}>Khác</MenuItem>
                    </TextField>
                  )}
                  name="gender"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ p: 2 }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="maritalStatus"
                      select
                      size="small"
                      fullWidth
                      label="Tình trạng hôn nhân (*)"
                      error={errors.maritalStatus}
                      helperText={
                        errors.maritalStatus
                          ? errors.maritalStatus.message
                          : "Chọn tình trạng hôn nhân"
                      }
                    >
                      <MenuItem value={1}>Độc thân</MenuItem>
                      <MenuItem value={2}>Đã kết hôn</MenuItem>
                    </TextField>
                  )}
                  name="maritalStatus"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} md={12} sm={12} sx={{ p: 2 }}>
                <Divider />
              </Grid>

              <Grid item xs={12} md={4} sm={12} sx={{ p: 2 }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="city"
                      select
                      size="small"
                      fullWidth
                      label="Tỉnh/thành phố (*)"
                      error={errors.city}
                      helperText={
                        errors.city
                          ? errors.city.message
                          : "Chọn tỉnh/thành phố"
                      }
                    >
                      {cities.map((city) => (
                        <MenuItem value={city.id} key={city.id}>
                          {city.city_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name="city"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} md={8} sm={12} sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  size="small"
                  type="text"
                  label="Địa chỉ (*)"
                  error={errors.address}
                  helperText={
                    errors.address ? errors.address.message : "Nhập địa chỉ"
                  }
                  {...register("address")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={12} sm={12} sx={{ p: 2 }}>
                <Divider />
              </Grid>
              <Grid item xs={12} md={12} sm={12} sx={{ p: 2 }}>
                <Typography
                  variant="body1"
                  display="block"
                  gutterBottom
                  sx={{ color: "text.secondary" }}
                >
                  Mục tiêu nghề nghiệp
                </Typography>
                <CardCustomeEditor
                  value={fieldRichText.careerGoals}
                  handleChange={(value) =>
                    setFieldRichText({ ...fieldRichText, careerGoals: value })
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} sm={12} sx={{ p: 2 }}>
                <Typography
                  variant="body1"
                  display="block"
                  gutterBottom
                  sx={{ color: "text.secondary" }}
                >
                  Kỹ năng bản thân
                </Typography>
                <CardCustomeEditor
                  value={fieldRichText.personalSkills}
                  handleChange={(value) =>
                    setFieldRichText({
                      ...fieldRichText,
                      personalSkills: value,
                    })
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                sx={{ p: 2 }}
                align="center"
                my={3}
              >
                <span style={{ marginRight: "5px" }}>
                  <Button
                    size="medium"
                    type="submit"
                    startIcon={<SaveIcon />}
                    variant="contained"
                  >
                    Lưu
                  </Button>
                </span>
                <span style={{ marginLeft: "5px" }}>
                  <Button
                    variant="outlined"
                    size="medium"
                    type="button"
                    onClick={resetForm}
                  >
                    Không Lưu
                  </Button>
                </span>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      {isLoadingSave && <BackdropLoading />}
    </Box>
  );
};
export default memo(RequestSeekerProfile);
