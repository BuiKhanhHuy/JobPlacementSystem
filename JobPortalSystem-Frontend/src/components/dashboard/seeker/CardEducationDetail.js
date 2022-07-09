import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { authApi, endpoints } from "../../../configs/Api";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import CardCustomeEditor from "../../commons/CardCustomEditor";
import Loading from "../../commons/Loading";
import alertOpen from "../../../store/actions/AlertCreator";

const CardEducationDetail = () => {
  const dispatch = useDispatch();
  const [isLoadingEducationDetail, setIsloadingEducationDetail] =
    useState(true);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const user = useSelector((state) => state.user);
  const [educationDetail, setEducationDetail] = useState(null);
  const [descriptionEducationDetail, setDescriptionEducationDetail] =
    useState("");

  const validationSchema = Yup.object().shape({
    degreeName: Yup.string()
      .required("Tên bằng cấp/chưng chỉ không được để trống")
      .max(200, "Tên bằng cấp/chưng chỉ vượt quá độ dài cho phép"),
    major: Yup.string()
      .required("Tên chuyên ngành không được để trống")
      .max(255, "Tên chuyên ngành vượt quá độ dài cho phép"),
    trainingPlaceName: Yup.string()
      .required("Tên trường hoặc đơn vị giảng dạy không được để trống")
      .max(255, "Tên trường hoặc đơn vị giảng dạy vượt quá độ dài cho phép"),
    startDate: Yup.date().required("Ngày bắt đầu không được để trống"),
    completedDate: Yup.date().required("Ngày hoàn thành không được để trống"),
    gpa: Yup.number()
      .required("Điểm trung bình (gpa) không được để trống")
      .typeError("Điểm phải là số")
      .min(0, "Điểm phải lớn hơn hoặc bằng 0")
      .max(10, "Điểm không vượt quá điểm 10"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      degreeName: "",
      major: "",
      trainingPlaceName: "",
      startDate: "",
      completedDate: "",
      gpa: 0,
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
    const loadEducationDetail = async () => {
      try {
        const res = await authApi().get(
          endpoints["education-detail"](user.job_seeker_profile.id)
        );

        if (res.status === 200) {
          setEducationDetail(res.data);
          setIsloadingEducationDetail(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    // load educaion detail
    loadEducationDetail();
    console.info("Load dữ liệu education detail");
  }, [user.job_seeker_profile.id]);

  const resetForm = (educationDetail) => {
    if (educationDetail !== null) {
      const {
        degree_name,
        major,
        training_place_name,
        start_date,
        completed_date,
        gpa,
        description,
      } = educationDetail;

      reset({
        degreeName: degree_name,
        major: major,
        trainingPlaceName: training_place_name,
        startDate: new Date(start_date).toISOString().slice(0, 10),
        completedDate: new Date(completed_date).toISOString().slice(0, 10),
        gpa: gpa,
      });
      setDescriptionEducationDetail(description);
    }
  };

  useEffect(() => {
    resetForm(educationDetail);
  }, [educationDetail]);

  // submit form
  const handleSubmitFormEducationDetail = (data) => {
    setIsLoadingSave(true);
    const {
      degreeName,
      major,
      trainingPlaceName,
      startDate,
      completedDate,
      gpa,
    } = data;
    var formData = new FormData();
    formData.append("degree_name", degreeName);
    formData.append("major", major);
    formData.append("training_place_name", trainingPlaceName);
    formData.append("start_date", startDate.toISOString());
    formData.append("completed_date", completedDate.toISOString());
    formData.append("gpa", gpa);
    formData.append("description", descriptionEducationDetail);
    formData.append("job_seeker_profile", user.job_seeker_profile.id);
    const createOrUpdateEducationDetail = async () => {
      try {
        const res = await authApi().post(
          endpoints["education-detail"](user.job_seeker_profile.id),
          formData
        );

        if (res.status === 200 || res.status === 201) {
          setEducationDetail(res.data);
          // thong bao luu thong tin hoc van thanh cong
          dispatch(
            alertOpen("success", "Cập nhật thông tin học vấn thành công")
          );
          setIsLoadingSave(false);
        }
      } catch (err) {
        // thong bao luu thong tin hoc van that bai cong
        dispatch(alertOpen("error", "Cập nhật thông tin học vấn thất bại"));
        setIsLoadingSave(false);
      }
    };

    createOrUpdateEducationDetail();
  };

  // reset form
  const handleResetForm = () => {
    resetForm(educationDetail);
  };

  console.log("CardEducationDetail: render");

  return (
    <Box>
      {isLoadingEducationDetail && educationDetail === null ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(handleSubmitFormEducationDetail)}>
          <Grid container spacing={4} md={12}>
            <Grid item xs={12} md={6} sm={12}>
              <TextField
                fullWidth
                id="degreeName"
                name="degreeName"
                size="small"
                type="text"
                label="Bằng cấp/chứng chỉ (*)"
                error={errors.degreeName}
                helperText={
                  errors.degreeName
                    ? errors.degreeName.message
                    : "Nhập tên bằng cấp chứng chỉ"
                }
                {...register("degreeName")}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <TextField
                fullWidth
                id="major"
                name="major"
                size="small"
                type="text"
                label="Chuyên ngành (*)"
                error={errors.major}
                helperText={
                  errors.major ? errors.major.message : "Nhập tên chuyên ngành"
                }
                {...register("major")}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
              <TextField
                fullWidth
                id="trainingPlaceName"
                name="trainingPlaceName"
                size="small"
                type="text"
                label="Trường/đơn vị giảng dạy (*)"
                error={errors.trainingPlaceName}
                helperText={
                  errors.trainingPlaceName
                    ? errors.trainingPlaceName.message
                    : "Nhập tên trường/đơn vị giảng dạy"
                }
                {...register("trainingPlaceName")}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    id="startDate"
                    size="small"
                    fullWidth
                    inputProps={{
                      placeholder: "MM-DD-YYYY",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Ngày bắt đầu"
                    error={errors.startDate}
                    helperText={
                      errors.startDate
                        ? errors.startDate.message
                        : "Chọn ngày bắt đầu"
                    }
                  />
                )}
                name="startDate"
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    id="completedDate"
                    size="small"
                    fullWidth
                    inputProps={{
                      placeholder: "MM-DD-YYYY",
                    }}
                    defaultValue="02/02/2022"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Ngày hoàn thành"
                    error={errors.completedDate}
                    helperText={
                      errors.completedDate
                        ? errors.complatedDate.message
                        : "Chọn ngày hoàn thành"
                    }
                  />
                )}
                name="completedDate"
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12}>
              <TextField
                fullWidth
                id="gpa"
                name="gpa"
                size="small"
                type="number"
                label="Điểm trung bình (GPA) (*)"
                error={errors.gpa}
                helperText={
                  errors.gpa
                    ? errors.gpa.message
                    : "Nhập số điểm trung bình (GPA) của bạn"
                }
                {...register("gpa")}
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
                Thông tin bổ sung
              </Typography>
              <CardCustomeEditor
                value={descriptionEducationDetail}
                handleChange={(value) => setDescriptionEducationDetail(value)}
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
export default memo(CardEducationDetail);