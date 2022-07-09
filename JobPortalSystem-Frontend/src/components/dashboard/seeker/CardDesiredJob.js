import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import Loading from "../../commons/Loading";
import { memo, useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { authApi, endpoints } from "../../../configs/Api";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import alertOpen from "../../../store/actions/AlertCreator";

const CardDisiredJob = () => {
  const dispatch = useDispatch();
  const [isLoadingDesiredJob, setIsloadingDesiredJob] = useState(true);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const user = useSelector((state) => state.user);
  const careers = useSelector((state) => state.careers.careers);
  const cities = useSelector((state) => state.cities.cities);
  const experiences = useSelector((state) => state.experiences.experiences);
  const salaries = useSelector((state) => state.salaries.salaries);
  const positions = useSelector((state) => state.positions.positions);
  const workingForms = useSelector((state) => state.workingForms.workingForms);
  const [desiredJob, setDesiredJob] = useState(null);

  const validationSchema = Yup.object().shape({
    jobName: Yup.string()
      .required("Tên công việc không được để trống")
      .max(200, "Tên công việc vượt quá độ dài cho phép"),
    career: Yup.number()
      .required("Bạn phải chọn 1 ngành nghề")
      .typeError("Bạn phải chọn 1 ngành nghề"),
    city: Yup.number()
      .required("Bạn phải chọn 1 địa điểm làm việc")
      .typeError("Bạn phải chọn 1 địa điểm làm việc"),
    experience: Yup.number()
      .required("Bạn phải chọn 1 kinh nghiệm")
      .typeError("Bạn phải chọn 1 kinh nghiệm"),
    salary: Yup.number()
      .required("Bạn phải chọn 1 mức lương")
      .typeError("Bạn phải chọn 1 mức lương"),
    position: Yup.number()
      .required("Bạn phải chọn 1 vị trí làm việc")
      .typeError("Bạn phải chọn 1 vị trí làm việc"),
    workingForm: Yup.number()
      .required("Bạn phải chọn 1 hình thức làm việc")
      .typeError("Bạn phải chọn 1 hình thức làm việc"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      jobName: "",
      career: "",
      position: "",
      city: "",
      salary: "",
      experience: "",
      workingForm: "",
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
    const loadDesiredJob = async () => {
      try {
        const res = await authApi().get(
          endpoints["desired-job"](user.job_seeker_profile.id)
        );

        if (res.status === 200) {
        
          setDesiredJob(res.data);
          setIsloadingDesiredJob(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    // load desired job
    loadDesiredJob();
  }, []);

  const resetForm = (desiredJob) => {
    if (desiredJob !== null) {
      const {
        job_name,
        position,
        working_form,
        experience,
        salary,
        city,
        career,
      } = desiredJob;

      reset({
        jobName: job_name,
        career: career,
        position: position,
        city: city,
        salary: salary,
        experience: experience,
        workingForm: working_form,
      });
    }
  };

  useEffect(() => {
    resetForm(desiredJob);
  }, [desiredJob]);

  // submit form
  const handleSubmitFormDesiredJob = (data) => {
    setIsLoadingSave(true);
    const { jobName, career, position, city, salary, workingForm, experience } =
      data;
    var formData = new FormData();
    formData.append("job_name", jobName);
    formData.append("position", position);
    formData.append("working_form", workingForm);
    formData.append("experience", experience);
    formData.append("salary", salary);
    formData.append("city", city);
    formData.append("career", career);
    formData.append("job_seeker_profile", user.job_seeker_profile.id);

    const createOrUpdateDesiredJob = async () => {
      try {
        const res = await authApi().post(
          endpoints["desired-job"](user.job_seeker_profile.id),
          formData
        );

        if (res.status === 200 || res.status === 201) {
          setDesiredJob(res.data);
          dispatch(
            alertOpen(
              "success",
              "Cập nhật thông tin công việc mong muốn thành công"
            )
          );
          setIsLoadingSave(false);
        }
      } catch (err) {
        // thong bao luu du lieu cong viec mong muon that bai
        dispatch(alertOpen("error", "Lưu thông tin việc mong muốn thất bại"));
        setIsLoadingSave(false);
      }
    };

    createOrUpdateDesiredJob();
  };

  // reset form
  const handleResetForm = () => {
    resetForm(desiredJob);
  };

  console.log("CarDesiredJob: render");
  return (
    <Box>
      {isLoadingDesiredJob && desiredJob === null ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(handleSubmitFormDesiredJob)}>
          <Grid container spacing={4} md={12}>
            <Grid item xs={12} md={12} sm={12}>
              <TextField
                fullWidth
                id="jobName"
                name="jobName"
                size="small"
                type="text"
                label="Tên công việc mong muốn (*)"
                error={errors.jobName}
                helperText={
                  errors.jobName
                    ? errors.jobName.message
                    : "Nhập tên công việc mong muốn"
                }
                {...register("jobName")}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="career"
                    select
                    size="small"
                    fullWidth
                    label="Ngành nghề mong muốn (*)"
                    error={errors.career}
                    helperText={
                      errors.career
                        ? errors.career.message
                        : "Chọn ngành nghề mong muốn"
                    }
                  >
                    {careers.map((career) => (
                      <MenuItem key={career.id} value={career.id}>
                        {career.career_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="career"
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="position"
                    select
                    size="small"
                    fullWidth
                    label="Vị trí mong muốn (*)"
                    error={errors.position}
                    helperText={
                      errors.position
                        ? errors.position.message
                        : "Chọn vị trí mong muốn"
                    }
                  >
                    {positions.map((position) => (
                      <MenuItem value={position.id} key={position.id}>
                        {position.position_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="position"
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="city"
                    select
                    size="small"
                    fullWidth
                    label="Địa điểm mong muốn (*)"
                    error={errors.city}
                    helperText={
                      errors.city
                        ? errors.city.message
                        : "Chọn địa điểm mong muốn"
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
            <Grid item xs={12} md={6} sm={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="salary"
                    select
                    size="small"
                    fullWidth
                    label="Mức lương mong muốn (*)"
                    error={errors.salary}
                    helperText={
                      errors.salary
                        ? errors.salary.message
                        : "Chọn mức lương mong muốn"
                    }
                  >
                    {salaries.map((salary) => (
                      <MenuItem value={salary.id} key={salary.id}>
                        {salary.salary_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="salary"
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="workingForm"
                    select
                    size="small"
                    fullWidth
                    label="Hình thức làm việc mong muốn (*)"
                    error={errors.workingForm}
                    helperText={
                      errors.workingForm
                        ? errors.workingForm.message
                        : "Chọn hình thức làm việc mong muốn"
                    }
                  >
                    {workingForms.map((workingForm) => (
                      <MenuItem value={workingForm.id} key={workingForm.id}>
                        {workingForm.working_form_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="workingForm"
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="experience"
                    select
                    size="small"
                    fullWidth
                    label="Kinh nghiệm mong muốn (*)"
                    error={errors.experience}
                    helperText={
                      errors.experience
                        ? errors.experience.message
                        : "Chọn kinh nghiệm mong muốn"
                    }
                  >
                    {experiences.map((experience) => (
                      <MenuItem value={experience.id} key={experience.id}>
                        {experience.experience_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="experience"
                control={control}
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
export default memo(CardDisiredJob);
