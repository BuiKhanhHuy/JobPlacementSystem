import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../../configs/Api";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import CardCustomeEditor from "../../commons/CardCustomEditor";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import alertOpen from "../../../store/actions/AlertCreator";
import { useConfirm } from "material-ui-confirm";

const CardNewPost = ({ type, jobPostId }) => {
  const confirm = useConfirm();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [postDetail, setPostDetail] = useState(null);

  const careers = useSelector((state) => state.careers.careers);
  const cities = useSelector((state) => state.cities.cities);
  const experiences = useSelector((state) => state.experiences.experiences);
  const salaries = useSelector((state) => state.salaries.salaries);
  const positions = useSelector((state) => state.positions.positions);
  const workingForms = useSelector((state) => state.workingForms.workingForms);
  const user = useSelector((state) => state.user);
  const [fieldDescription, setFielDescription] = useState({
    jobDescription: "",
    jobRequirement: "",
    benefitsEnjoyed: "",
    requestProfile: "",
  });

  const validationSchema = Yup.object().shape({
    jobName: Yup.string()
      .required("Tên công việc không được để trống")
      .max(255, "Tên công việc vượt quá độ dài cho phép"),
    position: Yup.number()
      .required("Bạn phải chọn cấp bậc")
      .typeError("Bạn phải chọn cấp bậc"),
    city: Yup.number()
      .required("Bạn phải chọn tỉnh/thành phố")
      .typeError("Bạn phải chọn tỉnh/thành phố"),
    address: Yup.string()
      .required("Địa chỉ không được để trống")
      .max(255, "Địa chỉ vượt quá độ dài cho phép"),
    career: Yup.number()
      .required("Bạn phải chọn ngành nghề")
      .typeError("Bạn phải chọn ngành nghề"),
    workingForm: Yup.number()
      .required("Bạn phải chọn hình thức làm việc")
      .typeError("Bạn phải chọn hình thức làm việc"),
    salary: Yup.number()
      .required("Bạn phải chọn mức lương")
      .typeError("Bạn phải chọn mức lương"),
    probationaryPeriod: Yup.string()
      .required("Thời gian thử việc không được để trống")
      .max(100, "Thời gian thử việc vượt quá độ dài cho phép"),
    quantity: Yup.number()
      .required("Bạn phải nhập số lượng cần tuyển")
      .typeError("Số lượng cần tuyển phải là số")
      .min(1, "Số lượng cần tuyển phải lớn hơn 1"),
    jobDetail: Yup.string()
      .required("Bạn phải nhập chi tiết công việc ngắn gọn")
      .max(255, "Chi tiết công việc vượt quá độ dài cho phép"),
    experience: Yup.number()
      .required("Bạn phải chọn kinh nghiệm làm việc")
      .typeError("Bạn phải chọn kinh nghiệm làm việc"),
    degreeRequired: Yup.string()
      .required("Bạn phải nhập yêu cầu bằng cấp")
      .max(200, "Yêu cầu bằng cấp vượt quá độ dài cho phép"),
    genderRequired: Yup.number()
      .required("Bạn phải chọn yêu cầu giới tính")
      .typeError("Bạn phải chọn yêu cầu giới tính"),
    deadline: Yup.date().required("Hạn nộp hồ sơ không được để trống"),

    contactPersonName: Yup.string()
      .required("Tên người liên hệ không được để trống")
      .max(100, "Tên người liên hệ vượt quá độ dài cho phép"),
    contactAddress: Yup.string()
      .required("Địa chỉ người liên hệ không được để trống")
      .max(255, "Địa chỉ người liên hệ vượt quá độ dài cho phép"),
    contactPhoneNumber: Yup.string()
      .required("Số điện thoại người liên hệ không được để trống")
      .max(15, "Số điện thoại người liên hệ vượt quá độ dài cho phép"),
    contactEmail: Yup.string()
      .required("Email người liên hệ không được để trống")
      .max(100, "Email người liên hệ vượt quá độ dài cho phép"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      jobName: "",
      position: "",
      city: "",
      address: "",
      career: "",
      workingForm: "",
      salary: "",
      probationaryPeriod: "",
      quantity: 1,
      jobDetail: "",
      experience: "",
      degreeRequired: "",
      genderRequired: "",
      deadline: "",
      contactPersonName: "",
      contactAddress: "",
      contactPhoneNumber: "",
      contactEmail: "",
      isUrgentJob: false,
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
    const loadPostDetail = async () => {
      try {
        const res = await authApi().get(
          endpoints["job-post-recruiter"](jobPostId)
        );

        if (res.status === 200) {
          setPostDetail(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    // load post detail
    if (type === "edit") {
      loadPostDetail();
    }
  }, []);

  useEffect(() => {
    handleResetFormEdit(postDetail);
  }, [postDetail]);

  // submit form
  const handleSubmitFormNewPost = (data) => {
    setIsLoadingSave(true);
    const {
      jobName,
      position,
      city,
      address,
      career,
      workingForm,
      salary,
      probationaryPeriod,
      quantity,
      jobDetail,
      experience,
      degreeRequired,
      genderRequired,
      deadline,
      contactPersonName,
      contactAddress,
      contactPhoneNumber,
      contactEmail,
      isUrgentJob,
    } = data;

    var formData = new FormData();
    formData.append("job_name", jobName);
    formData.append("position", position);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("career", career);
    formData.append("working_form", workingForm);
    formData.append("salary", salary);
    formData.append("probationary_period", probationaryPeriod);
    formData.append("quantity", quantity);
    formData.append("job_detail", jobDetail);
    formData.append("experience", experience);
    formData.append("degree_required", degreeRequired);
    formData.append("gender_required", genderRequired);
    formData.append("deadline", deadline.toISOString());
    formData.append("contact_person_name", contactPersonName);
    formData.append("contact_address", contactAddress);
    formData.append("contact_phone_number", contactPhoneNumber);
    formData.append("contact_email", contactEmail);
    formData.append("is_urgent_job", isUrgentJob);
    formData.append("job_description", fieldDescription.jobDescription);
    formData.append("job_requirement", fieldDescription.jobRequirement);
    formData.append("benefits_enjoyed", fieldDescription.benefitsEnjoyed);
    formData.append("request_profile", fieldDescription.requestProfile);
    formData.append("is_active", true)

    console.log("CardNewPost: render");
    const addNewPost = async () => {
      try {
        const res = await authApi().post(
          endpoints["post-of-user"](user.id),
          formData
        );

        if (res.status === 200 || res.status === 201) {
          setIsLoadingSave(false);
          // thong bao cap nhat thanh cong
          confirm({
            title: "Đăng tin thành công.",
            description:
              "Tin tuyển dụng của bạn đã được đăng thành công. Bạn có muốn tiếp tục đăng tin?",
            confirmationText: "Đi đến mục tin đã đăng",
            cancellationText: "Tiếp tục đăng tin",
          })
            .then(() => nav("/recruiter/posted/"))
            .catch((err) => console.err(err));
        }
      } catch (err) {
        // loi
        setIsLoadingSave(false);
      }
    };

    const updatePost = async () => {
      try {
        const res = await authApi().patch(
          endpoints["job-post-detail"](jobPostId),
          formData
        );

        if (res.status === 200) {
          setPostDetail(res.data);
          setIsLoadingSave(false);
          // thong bao cap nhat thanh cong
          dispatch(
            alertOpen("success", "Cập nhật thông tin bài đăng thành công")
          );
        }
      } catch (err) {
        setIsLoadingSave(false);
        console.error(err);
        // thong bao cap nhat that bai
        dispatch(alertOpen("error", "Cập nhật thông tin bài đăng thất bại"));
      }
    };

    if (type === "add") addNewPost();
    else {
      updatePost();
    }
  };

  // reset form add
  const handleResetFormAdd = () => {
    reset();
    setFielDescription({
      jobDescription: "",
      jobRequirement: "",
      benefitsEnjoyed: "",
      requestProfile: "",
    });
  };

  // reset form edit
  const handleResetFormEdit = (jobPostDetail) => {
    if (jobPostDetail !== null) {
      const {
        job_name,
        position,
        city,
        address,
        career,
        working_form,
        salary,
        probationary_period,
        quantity,
        job_detail,
        experience,
        degree_required,
        gender_required,
        deadline,
        contact_person_name,
        contact_address,
        contact_phone_number,
        contact_email,
        is_urgent_job,
        job_description,
        job_requirement,
        benefits_enjoyed,
        request_profile,
      } = jobPostDetail;

      reset({
        jobName: job_name,
        position: position,
        city: city,
        address: address,
        career: career,
        workingForm: working_form,
        salary: salary,
        probationaryPeriod: probationary_period,
        quantity: quantity,
        jobDetail: job_detail,
        experience: experience,
        degreeRequired: degree_required,
        genderRequired: gender_required,
        deadline: new Date(deadline).toISOString().slice(0, 10),
        contactPersonName: contact_person_name,
        contactAddress: contact_address,
        contactPhoneNumber: contact_phone_number,
        contactEmail: contact_email,
        isUrgentJob: is_urgent_job,
      });
      setFielDescription({
        jobDescription: job_description,
        jobRequirement: job_requirement,
        benefitsEnjoyed: benefits_enjoyed,
        requestProfile: request_profile,
      });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleSubmitFormNewPost)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12}>
            <div style={{ fontWeight: "bold", color: "#0000ee" }}>
              | Thông tin việc làm
            </div>
          </Grid>
          <Grid item xs={12} md={8} sm={12}>
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
          <Grid item xs={12} md={4} sm={12}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  id="position"
                  select
                  size="small"
                  fullWidth
                  label="Cấp bậc/vị trí (*)"
                  error={errors.position}
                  helperText={
                    errors.position
                      ? errors.position.message
                      : "Chọn cấp bậc/vị trí"
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
              label="Địa chỉ tuyển dụng (*)"
              error={errors.address}
              helperText={
                errors.address
                  ? errors.address.message
                  : "Nhập địa chỉ tuyển dụng"
              }
              {...register("address")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  id="career,"
                  select
                  size="small"
                  fullWidth
                  label="Ngành nghề (*)"
                  error={errors.career}
                  helperText={
                    errors.career ? errors.career.message : "Chọn ngành nghề"
                  }
                >
                  {careers.map((career) => (
                    <MenuItem value={career.id} key={career.id}>
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
                  id="workingForm,"
                  select
                  size="small"
                  fullWidth
                  label="Hình thức làm việc (*)"
                  error={errors.workingForm}
                  helperText={
                    errors.workingForm
                      ? errors.workingForm.message
                      : "Chọn hình thức làm việc"
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
          <Grid item xs={12} md={4} sm={12}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  id="salary,"
                  select
                  size="small"
                  fullWidth
                  label="Mức lương (*)"
                  error={errors.salary}
                  helperText={
                    errors.salary ? errors.salary.message : "Chọn mức lương"
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
          <Grid item xs={12} md={4} sm={12}>
            <TextField
              fullWidth
              id="probationaryPeriod"
              name="probationaryPeriod"
              size="small"
              type="text"
              label="Thời gian thử việc (*)"
              error={errors.probationaryPeriod}
              helperText={
                errors.probationaryPeriod
                  ? errors.probationaryPeriod.message
                  : "Nhập thời gian thử viêc VD: 1 tuần, 1 tháng"
              }
              {...register("probationaryPeriod")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              size="small"
              type="number"
              label="Số lượng cần tuyển (*)"
              error={errors.quantity}
              helperText={
                errors.quantity
                  ? errors.quantity.message
                  : "Nhập lượng cần tuyển"
              }
              {...register("quantity")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              id="jobDetail"
              name="jobDetail"
              size="small"
              type="number"
              label="Chi tiết công việc (*)"
              error={errors.jobDetail}
              helperText={
                errors.jobDetail
                  ? errors.jobDetail.message
                  : "Nhập mô tả ngắn gọn ngành nghề mà bạn muốn tuyển dụng"
              }
              {...register("jobDetail")}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>

          <Grid item xs={12} md={12} sm={12}>
            <div style={{ fontWeight: "bold", color: "#0000ee" }}>
              | Mô tả công việc
            </div>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ color: "text.secondary" }}
            >
              Nhập mô tả công việc
            </Typography>
            <CardCustomeEditor
              value={fieldDescription.jobDescription}
              handleChange={(value) =>
                setFielDescription({
                  ...fieldDescription,
                  jobDescription: value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <div style={{ fontWeight: "bold", color: "#0000ee" }}>
              | Yêu cầu công việc
            </div>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  id="experience,"
                  select
                  size="small"
                  fullWidth
                  label="Kinh nghiệm (*)"
                  error={errors.experience}
                  helperText={
                    errors.experience
                      ? errors.experience.message
                      : "Chọn kinh nghiệm"
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
          <Grid item xs={12} md={4} sm={12}>
            <TextField
              fullWidth
              id="degreeRequired"
              name="degreeRequired"
              size="small"
              type="text"
              label="Bằng cấp (*)"
              error={errors.degreeRequired}
              helperText={
                errors.degreeRequired
                  ? errors.degreeRequired.message
                  : "Nhập yêu cầu bằng cấp VD: Cao đẳng, Đại học"
              }
              {...register("degreeRequired")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  id="genderRequired,"
                  select
                  size="small"
                  fullWidth
                  label="Yêu cầu giới tính (*)"
                  error={errors.genderRequired}
                  helperText={
                    errors.genderRequired
                      ? errors.genderRequired.message
                      : "Chọn yêu cầu giới tính"
                  }
                >
                  {[
                    { id: 0, label: "Không yêu cầu" },
                    { id: 1, label: "Nam" },
                    { id: 2, label: "Nữ" },
                    { id: 3, label: "Khác" },
                  ].map((gender) => (
                    <MenuItem value={gender.id} key={gender.id}>
                      {gender.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              name="genderRequired"
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ color: "text.secondary" }}
            >
              Nhập yêu cầu công việc
            </Typography>
            <CardCustomeEditor
              value={fieldDescription.jobRequirement}
              handleChange={(value) =>
                setFielDescription({
                  ...fieldDescription,
                  jobRequirement: value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={12} sm={12}>
            <div style={{ fontWeight: "bold", color: "#0000ee" }}>
              | Quyền lợi được hưởng
            </div>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ color: "text.secondary" }}
            >
              Nhập quyền lợi được hưởng
            </Typography>
            <CardCustomeEditor
              value={fieldDescription.benefitsEnjoyed}
              handleChange={(value) =>
                setFielDescription({
                  ...fieldDescription,
                  benefitsEnjoyed: value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={12} sm={12}>
            <div style={{ fontWeight: "bold", color: "#0000ee" }}>
              | Yêu cầu hồ sơ
            </div>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ color: "text.secondary" }}
            >
              Nhập yêu cầu hồ sơ
            </Typography>
            <CardCustomeEditor
              initValue="<ul> <li>Đơn xin việc</li> <li>Sơ yếu l&iacute; lịch</li> <li>Hộ khẩu, chứng minh nh&acirc;n d&acirc;n v&agrave; giấy kh&aacute;m sức khoẻ.</li> <li>C&aacute;c bằng cấp c&oacute; li&ecirc;n quan</li> </ul>"
              value={fieldDescription.requestProfile}
              handleChange={(value) =>
                setFielDescription({
                  ...fieldDescription,
                  requestProfile: value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  id="deadline"
                  size="small"
                  fullWidth
                  inputProps={{
                    placeholder: "MM-DD-YYYY",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Hạn nộp hồ sơ"
                  error={errors.deadline}
                  helperText={
                    errors.deadline
                      ? errors.deadline.message
                      : "Chọn hạn nộp hồ sơ"
                  }
                />
              )}
              name="deadline"
              control={control}
            />
          </Grid>

          <Grid item xs={12} md={12} sm={12}>
            <div style={{ fontWeight: "bold", color: "#0000ee" }}>
              | Thông tin liên hệ
            </div>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <TextField
              fullWidth
              id="contactPersonName"
              name="contactPersonName"
              size="small"
              type="text"
              label="Tên người liên hệ (*)"
              error={errors.contactPersonName}
              helperText={
                errors.contactPersonName
                  ? errors.contactPersonName.message
                  : "Nhập tên người liên hệ"
              }
              {...register("contactPersonName")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <TextField
              fullWidth
              id="contactPhoneNumber"
              name="contactPhoneNumber"
              size="small"
              type="text"
              label="SĐT người liên hệ (*)"
              error={errors.contactPhoneNumber}
              helperText={
                errors.contactPhoneNumber
                  ? errors.contactPhoneNumber.message
                  : "Nhập SĐT người liên hệ"
              }
              {...register("contactPhoneNumber")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <TextField
              fullWidth
              id="contactEmail"
              name="contactEmail"
              size="small"
              type="text"
              label="Email người liên hệ (*)"
              error={errors.contactEmail}
              helperText={
                errors.contactEmail
                  ? errors.contactEmail.message
                  : "Nhập email người liên hệ"
              }
              {...register("contactEmail")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              fullWidth
              id="contactAddress"
              name="contactAddress"
              size="small"
              type="text"
              label="Địa chỉ người liên hệ (*)"
              error={errors.contactAddress}
              helperText={
                errors.contactAddress
                  ? errors.contactAddress.message
                  : "Nhập địa chỉ người liên hệ"
              }
              {...register("contactAddress")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Controller
                name="isUrgentJob"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value}
                  />
                )}
              />
              <Typography variant="body1">Cần tuyển gấp</Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={12} sm={12} align="center" my={3}>
            <span style={{ marginRight: "5px" }}>
              <LoadingButton
                type="submit"
                startIcon={
                  type === "add" ? <AddCircleOutlineIcon /> : <SaveIcon />
                }
                loading={isLoadingSave}
                loadingPosition="start"
                variant="contained"
              >
                {type === "add" ? "Tạo tin" : "Cập nhật"}
              </LoadingButton>
            </span>
            <span style={{ marginLeft: "5px" }}>
              <Button
                variant="outlined"
                size="medium"
                type="button"
                onClick={
                  type === "add" ? handleResetFormAdd : handleResetFormEdit
                }
              >
                Làm mới
              </Button>
            </span>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
export default CardNewPost;
