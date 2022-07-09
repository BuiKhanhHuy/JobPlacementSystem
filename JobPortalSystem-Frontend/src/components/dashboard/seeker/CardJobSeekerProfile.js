import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import CardCustomeEditor from "../../commons/CardCustomEditor";
import { Controller, useForm } from "react-hook-form";
import { authApi, endpoints } from "../../../configs/Api";
import { LoadingButton } from "@mui/lab";
import Loading from "../../commons/Loading";
import { useDispatch } from "react-redux";
import alertOpen from "../../../store/actions/AlertCreator";

const CardJobSeekerProfile = () => {
  const dispatch = useDispatch();
  const [isloadingJobSeekerProfile, setIsloadingJobSeekerProfile] =
    useState(true);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const user = useSelector((state) => state.user);
  const cities = useSelector((state) => state.cities.cities);
  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);
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

  useEffect(() => {
    const loadJobSeekerProfile = async () => {
      try {
        const res = await authApi().get(
          endpoints["user-job-seeker-profile"](user.id)
        );

        if (res.status === 200) {
          setJobSeekerProfile(res.data);
          setIsloadingJobSeekerProfile(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    // load educaion detail
    loadJobSeekerProfile();
    console.info("Load dữ liệu loadJobSeekerProfile");
  }, [user.id]);

  const resetForm = (jobSeekerProfile) => {
    if (jobSeekerProfile !== null) {
      const {
        full_name,
        phone_number,
        gender,
        date_of_birth,
        marital_status,
        address,
        city,
        career_goals,
        personal_skills,
      } = jobSeekerProfile;

      reset({
        fullName: full_name,
        phoneNumber: phone_number,
        gender: gender,
        dateOfBirth: new Date(date_of_birth).toISOString().slice(0, 10),
        maritalStatus: marital_status,
        address: address,
        city: city,
      });
      setFieldRichText({
        careerGoals: career_goals,
        personalSkills: personal_skills,
      });
    }
  };

  useEffect(() => {
    resetForm(jobSeekerProfile);
  }, [jobSeekerProfile]);

  // submit form
  const handleSubmitFormJobSeekerProfile = (data) => {
    setIsLoadingSave(true);
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
      try {
        const res = await authApi().post(
          endpoints["user-job-seeker-profile"](user.id),
          formData
        );

        // thong bao cap nhat thanh cong
        if (res.status === 200 || res.status === 201) {
          setJobSeekerProfile(res.data);
          setIsLoadingSave(false);
          dispatch(alertOpen("success", "Cập nhật thông tin hồ sơ thành công"));
        }
      } catch (err) {
        // thong bao cap nhat that bai
        dispatch(alertOpen("error", "Cập nhật thông tin hồ sơ thất bại"));
        setIsLoadingSave(false);
      }
    };

    createOrUpdateJobSeekerProfile();
  };

  // reset form
  const handleResetForm = () => {
    resetForm(jobSeekerProfile);
  };

  console.log("CardJobSeekerProfile: render");

  return (
    <Box>
      {isloadingJobSeekerProfile && jobSeekerProfile === null ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(handleSubmitFormJobSeekerProfile)}>
          <Grid container spacing={4} md={12}>
            <Grid item xs={12} md={8} sm={12}>
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
            <Grid item xs={12} md={4} sm={12}>
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
            <Grid item xs={12} md={4} sm={12}>
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
            <Grid item xs={12} md={4} sm={12}>
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
                      errors.gender
                        ? errors.posigendertion.message
                        : "Chọn giới tính"
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
            <Grid item xs={12} md={4} sm={12}>
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
            <Grid item xs={12} md={12} sm={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={4} sm={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="city"
                    select
                    size="small"
                    fullWidth
                    label="Tỉnh/thành phố sinh sống (*)"
                    error={errors.city}
                    helperText={
                      errors.city
                        ? errors.city.message
                        : "Chọn tỉnh/thành phố đang sinh sống"
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
            <Grid item xs={12} md={8} sm={12}>
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
            <Grid item xs={12} md={12} sm={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
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
            <Grid item xs={12} md={12} sm={12}>
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
                  setFieldRichText({ ...fieldRichText, personalSkills: value })
                }
              />
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
                  Không Lưu
                </Button>
              </span>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};
export default memo(CardJobSeekerProfile);
