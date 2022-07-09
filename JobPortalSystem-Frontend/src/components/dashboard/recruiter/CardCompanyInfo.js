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
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { authApi, endpoints } from "../../../configs/Api";
import CardCustomeEditor from "../../commons/CardCustomEditor";
import { LoadingButton } from "@mui/lab";
import alertOpen from "../../../store/actions/AlertCreator";
import Loading from "../../../components/commons/Loading";
import CardUploadCompanyCoverPhoto from "../../cards/CardUploadCompanyCoverPhoto";

const CardCompanyInfo = () => {
  const dispatch = useDispatch();
  const [isLoadingCompanyInfo, setIsloadingCompanyInfo] = useState(true);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const user = useSelector((state) => state.user);
  const cities = useSelector((state) => state.cities.cities);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [companyDescription, setCompanyDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState();

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

  useEffect(() => {
    const loadCompanyInfo = async () => {
      try {
        const res = await authApi().get(endpoints["company-info"](user.id));

        if (res.status === 200) {
          setCompanyInfo(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsloadingCompanyInfo(false);
      }
    };

    // load company info
    loadCompanyInfo();
    console.info("So 1");
  }, [user.id]);

  useEffect(() => {
    if (coverImage) {
      setCoverImageUrl(URL.createObjectURL(coverImage));
    } else {
      setCoverImageUrl(companyInfo ? companyInfo.company_cover_image : "");
    }
    console.info("So 2");
  }, [coverImage, companyInfo]);

  useEffect(() => {
    resetForm(companyInfo);
  }, [companyInfo]);

  const onChooseImage = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const resetForm = (companyInfo) => {
    if (companyInfo !== null) {
      const {
        company_name,
        field_operation,
        company_size,
        phone_number,
        tax_id_number,
        company_website_url,
        address,
        company_description,
        city,
      } = companyInfo;

      reset({
        companyName: company_name,
        fieldOperation: field_operation,
        companySize: company_size,
        phoneNumber: phone_number,
        taxIdNumber: tax_id_number,
        companyWebsiteUrl: company_website_url,
        address: address,
        city: city,
      });
      setCompanyDescription(company_description);

      if (coverImage !== null) setCoverImage(null);
    }
  };

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
    if (coverImage !== null) {
      formData.append("company_cover_image", coverImage);
    }

    const UpdateCompanyInfo = async () => {
      try {
        const res = await authApi().patch(
          endpoints["company-info"](user.id),
          formData
        );

        if (res.status === 200 || res.status === 201) {
          setCompanyInfo(res.data);
          // thong bao cap nhat thanh cong
          dispatch(
            alertOpen("success", "Cập nhật thông tin công ty thành công")
          );
          setIsLoadingSave(false);
        }
      } catch (err) {
        // thong bao loi
        if (err.response.status === 400) {
          let errCompanyName = err.response.data.company_name;

          if (errCompanyName !== undefined) {
            setError("companyName", {
              type: "custom",
              message: errCompanyName.join(", "),
            });
          }
        }
        dispatch(alertOpen("error", "Cập nhật thông tin công ty thất bại"));
        setIsLoadingSave(false);
      }
    };

    UpdateCompanyInfo();
  };

  // reset form
  const handleResetForm = () => {
    resetForm(companyInfo);
  };

  return (
    <Box>
      {isLoadingCompanyInfo && companyInfo === null ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(handleSubmitFormCompanyInfo)}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12} sm={12}>
              <div style={{ fontWeight: "bold", color: "#0000ee" }}>
                | Thông tin công ty
              </div>
            </Grid>
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
                      errors.city ? errors.city.message : "Chọn tỉnh/thành phố"
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
            <Grid item xs={12} md={12} sm={12}>
              <Typography
                variant="body1"
                display="block"
                gutterBottom
                sx={{ color: "text.secondary" }}
              >
                Ảnh bìa công ty của bạn
              </Typography>
              <Box>
                <CardUploadCompanyCoverPhoto
                  url={coverImageUrl}
                  onChangeImage={onChooseImage}
                />
              </Box>
              <Divider sx={{ mt: 2 }} />
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

export default CardCompanyInfo;
