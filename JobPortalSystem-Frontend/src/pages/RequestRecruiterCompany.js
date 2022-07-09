import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { memo, useState } from "react";
import { BackdropLoading } from "../components/commons/Loading";
import { Controller, useForm } from "react-hook-form";
import { authApi, endpoints } from "../configs/Api";
import CardCustomeEditor from "../components/commons/CardCustomEditor";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../store/actions/UserCreator";

const RequestRecruiterCompany = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const cities = useSelector((state) => state.cities.cities);
  const [companyDescription, setCompanyDescription] = useState("");

  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Tên công ty không được để trống")
      .max(255, "Tên công ty vượt quá độ dài cho phép"),
    fieldOperation: Yup.string()
      .required("Lĩnh vực hoạt động không được để trống")
      .max(255, "Lĩnh vực hoạt động vượt quá độ dài cho phép"),
    companySize: Yup.string()
      .required("Quy mô công ty không được để trống")
      .max(100, "Quy mô công ty vượt quá độ dài cho phép"),
    phoneNumber: Yup.string()
      .required("Số điện thoại không được để trống")
      .max(15, "Số điện thoại vượt quá độ dài cho phép"),
    taxIdNumber: Yup.string().max(15, "Mã số thuế vượt quá độ dài cho phép"),
    companyWebsiteUrl: Yup.string().max(
      255,
      "Địa chỉ website vượt quá độ dài cho phép"
    ),
    address: Yup.string()
      .required("Địa chỉ công ty không được để trống")
      .max(255, "Địa chỉ công ty vượt quá độ dài cho phép"),
    city: Yup.number()
      .required("Bạn phải chọn tỉnh/thành phố")
      .typeError("Bạn phải chọn tỉnh/thành phố"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      companyName: "",
      fieldOperation: "",
      companySize: "",
      phoneNumber: "",
      taxIdNumber: "",
      companyWebsiteUrl: "",
      address: "",
      city: "",
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm(formOptions);

  // submit form
  const handleSubmitFormCompanyInfo = (data) => {
    setIsLoadingSave(true);
    const {
      companyName,
      fieldOperation,
      companySize,
      phoneNumber,
      taxIdNumber,
      companyWebsiteUrl,
      address,
      city,
    } = data;

    var formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("field_operation", fieldOperation);
    formData.append("company_size", companySize);
    formData.append("phone_number", phoneNumber);
    formData.append("tax_id_number", taxIdNumber);
    formData.append("company_website_url", companyWebsiteUrl);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("company_description", companyDescription);

    const createOrUpdateCompanyInfo = async () => {
      try {
        const res = await authApi().post(
          endpoints["company-info"](user.id),
          formData
        );
        if (res.status === 200 || res.status === 201) {
          // cap nhat thong tin user
          dispatch(updateUser());
          nav("/recruiter/general-management/");
        }
      } catch (err) {
        if (err.response.status === 400) {
          let errCompanyName = err.response.data.msg;

          if (errCompanyName !== undefined) {
            setError("companyName", {
              type: "custom",
              message: errCompanyName,
            });
          }
        }
      } finally {
        setIsLoadingSave(false);
      }
    };

    createOrUpdateCompanyInfo();
  };

  // reset form
  const handleResetForm = () => {
    reset();
    setCompanyDescription("");
  };

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
            Cập nhật hồ sơ công ty
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitFormCompanyInfo)}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} sm={12}>
                <TextField
                  fullWidth
                  id="companyName"
                  name="companyName"
                  size="small"
                  type="text"
                  label="Tên công ty (*)"
                  error={errors.companyName}
                  helperText={
                    errors.companyName
                      ? errors.companyName.message
                      : "Nhập tên công ty"
                  }
                  {...register("companyName")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12}>
                <TextField
                  fullWidth
                  id="fieldOperation"
                  name="fieldOperation"
                  size="small"
                  type="text"
                  label="Lĩnh vực hoạt động (*)"
                  error={errors.fieldOperation}
                  helperText={
                    errors.fieldOperation
                      ? errors.fieldOperation.message
                      : "Nhập tên lĩnh vực hoạt động"
                  }
                  {...register("fieldOperation")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12}>
                <TextField
                  fullWidth
                  id="companySize"
                  name="companySize"
                  size="small"
                  type="text"
                  label="Quy mô công ty (*)"
                  error={errors.companySize}
                  helperText={
                    errors.companySize
                      ? errors.companySize.message
                      : "Nhập quy mô công ty. VD: 100-499 nhân viên"
                  }
                  {...register("companySize")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12}>
                <TextField
                  fullWidth
                  id="taxIdNumber"
                  name="taxIdNumber"
                  size="small"
                  type="text"
                  label="Mã số thuế"
                  error={errors.taxIdNumber}
                  helperText={
                    errors.taxIdNumber
                      ? errors.taxIdNumber.message
                      : "Nhập mã số thuế"
                  }
                  {...register("taxIdNumber")}
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
                  label="Điện thoại cố định (*)"
                  error={errors.phoneNumber}
                  helperText={
                    errors.phoneNumber
                      ? errors.phoneNumber.message
                      : "Nhập số điện thoại cố định của công ty"
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
              <Grid item xs={12} md={8} sm={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  size="small"
                  type="text"
                  label="Địa chỉ(*)"
                  error={errors.address}
                  helperText={
                    errors.address
                      ? errors.address.message
                      : "Nhập địa chỉ của công ty"
                  }
                  {...register("address")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={12} sm={12}>
                <TextField
                  fullWidth
                  id="companyWebsiteUrl"
                  name="companyWebsiteUrl"
                  size="small"
                  type="text"
                  label="Url website công ty"
                  error={errors.companyWebsiteUrl}
                  helperText={
                    errors.companyWebsiteUrl
                      ? errors.companyWebsiteUrl.message
                      : "Nhập địa chỉ website công ty"
                  }
                  {...register("companyWebsiteUrl")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={12} sm={12}>
                <Typography
                  variant="body1"
                  display="block"
                  gutterBottom
                  sx={{ color: "text.secondary" }}
                >
                  Thông tin giới thiệu công ty
                </Typography>
                <CardCustomeEditor
                  value={companyDescription}
                  handleChange={(value) => setCompanyDescription(value)}
                />
              </Grid>

              <Grid item xs={12} md={12} sm={12} align="center" my={3}>
                <span style={{ marginRight: "5px" }}>
                  <Button
                    type="submit"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={handleSubmitFormCompanyInfo}
                  >
                    Lưu
                  </Button>
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
        </Paper>
      </Container>
      {isLoadingSave && <BackdropLoading />}
    </Box>
  );
};

export default memo(RequestRecruiterCompany);
