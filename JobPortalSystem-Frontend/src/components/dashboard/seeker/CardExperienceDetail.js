import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CardCustomeEditor from "../../commons/CardCustomEditor";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { authApi, endpoints } from "../../../configs/Api";
import { useDispatch } from "react-redux";
import alertOpen from "../../../store/actions/AlertCreator";
import { useConfirm } from "material-ui-confirm";

const CardExperienceDetail = ({
  index,
  experienceDetail,
  handleUpdate,
  type = "updateOrDelete",
  jobSeekerProfileId = "",
}) => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const {
    id,
    job_name,
    job_position,
    start_date,
    end_date,
    company_name,
    description,
  } = experienceDetail;
  const [descriptionExperienceDetail, setDescriptionExperienceDetail] =
    useState(description);

  const validationSchema = Yup.object().shape({
    jobName: Yup.string()
      .required("Tên công việc không được để trống")
      .max(200, "Tên công việc vượt quá độ dài cho phép"),
    jobPosition: Yup.string()
      .required("Vị trí làm việc không được để trống")
      .max(200, "Vị trí làm việc vượt quá độ dài cho phép"),
    startDate: Yup.date()
      .required("Ngày bắt đầu không được để trống")
      .typeError("Bạn hãy chọn ngày bắt đầu."),
    endDate: Yup.date()
      .required("Ngày kết thúc không được để trống")
      .typeError("Bạn hãy chọn ngày kết thúc."),
    companyName: Yup.string()
      .required("Tên công ty không được để trống")
      .max(255, "Tên công ty vượt quá độ dài cho phép"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      jobName: job_name,
      jobPosition: job_position,
      startDate:
        start_date !== ""
          ? new Date(start_date).toISOString().slice(0, 10)
          : "",
      endDate:
        end_date !== "" ? new Date(end_date).toISOString().slice(0, 10) : "",
      companyName: company_name,
    },
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm(formOptions);

  // submit form - update
  const handleSubmitFormExperienceDetail = (data) => {
    setIsLoadingSave(true);

    const { jobName, jobPosition, startDate, endDate, companyName } = data;

    var formData = new FormData();
    formData.append("job_name", jobName);
    formData.append("job_position", jobPosition);
    formData.append("start_date", startDate.toISOString());
    formData.append("end_date", endDate.toISOString());
    formData.append("company_name", companyName);
    formData.append("description", descriptionExperienceDetail);
    if (type === "add")
      formData.append("job_seeker_profile", jobSeekerProfileId);

    if (type === "updateOrDelete") {
      // update
      const updateExperienceDetail = async () => {
        try {
          const res = await authApi().patch(
            endpoints["update-experience-detail"](id),
            formData
          );

          if (res.status === 200) {
            // update list
            handleUpdate();
            // thong bao cap nhat thong tin kinh nghiem thanh cong
            dispatch(
              alertOpen(
                "success",
                `Cập nhật thành công thông tin kinh nghiệm ${index + 1}`
              )
            );
            setIsLoadingSave(false);
          }
        } catch (err) {
          // thong bao cap nhat thong tin kinh nghiem thanh cong
          dispatch(
            alertOpen(
              "error",
              `Cập nhật thất bại thông tin kinh nghiệm ${index + 1}`
            )
          );
          setIsLoadingSave(false);
          console.error(err);
        }
      };
      updateExperienceDetail();
    } else {
      // add
      const addExperienceDetail = async () => {
        try {
          const res = await authApi().post(
            endpoints["add-experience-detail"],
            formData
          );

          if (res.status === 201) {
            // update list
            handleUpdate();
            // thong bao them thanh cong kinh nghiem
            dispatch(
              alertOpen(
                "success",
                `Thêm thành công thông tin kinh nghiệm ${index + 1}`
              )
            );
            setIsLoadingSave(false);
          }
        } catch (err) {
          // thong bao them that bai kinh nghiem
          dispatch(
            alertOpen(
              "error",
              `Thêm thất bại thông tin kinh nghiệm ${index + 1}`
            )
          );
          console.error(err);
        }
      };

      addExperienceDetail();
    }
  };

  // delete experience detail
  const onDeleteExperienceDetail = () => {
    const deleteExperienceDetail = async () => {
      try {
        const res = await authApi().delete(
          endpoints["update-experience-detail"](id)
        );

        if (res.status === 204) {
          // update list
          handleUpdate();
          // thong bao xoa thanh cong thong tin kinh nghiem
          dispatch(
            alertOpen("success", `Xóa thành thông tin kinh nghiệm ${index + 1}`)
          );
        }
      } catch (err) {
        // thong bao xoa that bai thong tin kinh nghiem
        dispatch(
          alertOpen("error", `Xóa thất bại thông tin kinh nghiệm ${index + 1}`)
        );
        console.error(err);
      }
    };

    confirm({
      title: "Bạn có chắc chắc muốn xóa kinh nghiệm này không?",
      description: "Dữ liệu kinh nghiệm này sẽ được xóa vĩnh viễn",
      confirmationText: "Có",
      cancellationText: "Không",
    })
      .then(() => deleteExperienceDetail())
      .catch((err) => console.error(err));
  };

  console.log("experienceDetail: render");
  return (
    <Box>
      <form onSubmit={handleSubmit(handleSubmitFormExperienceDetail)}>
        <Grid container spacing={4} md={12}>
          <Grid item xs={12} md={6} sm={12}>
            <TextField
              fullWidth
              id="jobName"
              name="jobName"
              size="small"
              type="text"
              label="Tên công việc (*)"
              error={errors.jobName}
              helperText={
                errors.jobName ? errors.jobName.message : "Nhập tên công việc"
              }
              {...register("jobName")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <TextField
              fullWidth
              id="jobPosition"
              name="jobPosition"
              size="small"
              type="text"
              label="Chức danh/vị trí (*)"
              error={errors.jobPosition}
              helperText={
                errors.jobPosition
                  ? errors.jobPosition.message
                  : "Nhập tên chức danh vị trí của công việc này"
              }
              {...register("jobPosition")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              fullWidth
              id="companyName"
              name="companyName"
              size="small"
              type="text"
              label="Công ty (*)"
              error={errors.companyName}
              helperText={
                errors.companyName
                  ? errors.companyName.message
                  : "Nhập tên tên công ty bạn đã từng làm việc"
              }
              {...register("companyName")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
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
                  label="Thời gian từ ngày"
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
          <Grid item xs={12} md={6} sm={12}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  id="endDate"
                  size="small"
                  fullWidth
                  inputProps={{
                    placeholder: "MM-DD-YYYY",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Đến ngày"
                  error={errors.endDate}
                  helperText={
                    errors.endDate
                      ? errors.endDate.message
                      : "Chọn ngày kết thúc"
                  }
                />
              )}
              name="endDate"
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <Typography
              variant="body1"
              display="block"
              gutterBottom
              sx={{ color: "text.secondary" }}
            >
              Mô tả công việc
            </Typography>
            <CardCustomeEditor
              value={descriptionExperienceDetail}
              handleChange={(value) => setDescriptionExperienceDetail(value)}
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
            <span style={{ mx: "5px" }}>
              <Button variant="outlined" size="medium" type="reset">
                Không Lưu
              </Button>
            </span>
            {type === "updateOrDelete" && (
              <span style={{ marginLeft: "5px" }}>
                <Button
                  variant="contained"
                  type="button"
                  size="medium"
                  color="error"
                  onClick={onDeleteExperienceDetail}
                >
                  Xóa
                </Button>
              </span>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default memo(CardExperienceDetail);
