import * as Yup from "yup";
import { useDialog } from "react-mui-dialog";
import { useEffect, useState } from "react";
import { Select } from "formik-material-ui";
import { Field } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box } from "@mui/system";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ChatIcon from "@mui/icons-material/Chat";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import Api, { endpoints, authApi } from "../configs/Api";
import Moment from "react-moment";
import CardSimilarJobPost from "../components/landing/CardSimilarJobPost";
import { BackdropLoading } from "../components/commons/Loading";
import CardSearchNoResult from "../components/commons/CardSearchNoResult";
import checkPermission from "../permissions/CheckPermission";
import UserRole from "../permissions/UserRole";
import { useDispatch, useSelector } from "react-redux";
import alertOpen from "../store/actions/AlertCreator";
import { useConfirm } from "material-ui-confirm";
import { LoadingButton } from "@mui/lab";

const PostDetail = () => {
  const { openDialog, closeDialog } = useDialog();
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoadingJobPostDetail, setIsLoadingJobPostDetail] = useState(true);
  const [isLoadingApply, setIsLoadingApply] = useState(false);
  const [isLoadingSaveJobPost, setIsLoadingSaveJobPost] = useState(false);
  const { jobPostId } = useParams();
  const [jobPostDetail, setJobPostDetail] = useState(null);
  const [saved, setSaved] = useState({ isSaved: false, saveJobPostId: null });
  const [applied, setApplied] = useState({
    isApplied: false,
    applyJobPostId: null,
  });
  const nav = useNavigate();
  const [isHaveCv, setIsHaveCv] = useState(false);

  useEffect(() => {
    const addViewJobPost = async () => {
      try {
        Api.post(endpoints["job-post-view"](jobPostId));
      } catch (err) {
        console.error(err);
      }
    };

    const loadCv = async () => {
      try {
        const res = await Api.get(
          endpoints["job-seeker-profile-cv"](user.job_seeker_profile.id)
        );

        if (res.status === 200 && res.data["id"] !== undefined) {
          setIsHaveCv(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    addViewJobPost();
    loadCv();
  }, []);

  useEffect(() => {
    const loadJobPostDetail = async () => {
      setIsLoadingJobPostDetail(true);
      try {
        const res = await authApi().get(
          endpoints["job-post-detail"](jobPostId)
        );

        if (res.status === 200) {
          setJobPostDetail(res.data);
          setSaved({
            isSaved: res.data.saved.saved,
            saveJobPostId: res.data.saved.id,
          });
          setApplied({
            isApplied: res.data.applied.applied,
            applyJobPostId: res.data.applied.id,
          });
        }
      } catch (err) {
        console.log("Error: " + err);
      } finally {
        setIsLoadingJobPostDetail(false);
      }
    };

    loadJobPostDetail();
  }, [jobPostId]);

  // luu bang tin
  const onSaveOrRemoveSaveJobPost = () => {
    const saveJobPost = async () => {
      setIsLoadingSaveJobPost(true);

      try {
        const res = await authApi().post(
          endpoints["user-save-job-post"](user.id),
          { job_post_id: jobPostDetail.id }
        );

        if (res.status === 201) {
          // thong bao luu thanh cong
          dispatch(
            alertOpen("success", "Bạn đã lưu thành công tin tuyển dụng này")
          );
          setSaved({ ...saved, isSaved: true, saveJobPostId: res.data.id });
        }
      } catch (err) {
        // thong bao luu khong thanh cong
        dispatch(alertOpen("error", "Lưu tin tuyển dụng thất bại"));
        console.error(err);
      } finally {
        setIsLoadingSaveJobPost(false);
      }
    };

    const removeJobPost = async () => {
      setIsLoadingSaveJobPost(true);

      try {
        const res = await authApi().delete(
          endpoints["save-job-posts"](saved.saveJobPostId)
        );

        if (res.status === 204) {
          // thong bao huy luu thanh cong
          dispatch(alertOpen("success", "Hủy lưu tin tuyển dụng thành công"));
          setSaved({ ...saved, isSaved: false, saveJobPostId: null });
        }
      } catch (err) {
        // thong bao huy luu khong thanh cong
        dispatch(alertOpen("error", "Hủy lưu tin tuyển dụng thất bại"));
        console.error(err);
      } finally {
        setIsLoadingSaveJobPost(false);
      }
    };

    if (saved.isSaved && saved.saveJobPostId !== null) {
      confirm({
        title: "Hủy lưu công việc",
        description: "Bạn có muốn hủy lưu công việc này không?",
        confirmationText: "Có",
        cancellationText: "Không",
      })
        .then(() => removeJobPost())
        .catch((err) => console.error(err));
    } else if (saved.isSaved === false && saved.saveJobPostId === null) {
      confirm({
        title: "Lưu công việc",
        description: "Bạn có muốn lưu công việc này không?",
        confirmationText: "Có",
        cancellationText: "Không",
      })
        .then(() => saveJobPost())
        .catch((err) => console.error(err));
    }
  };

  // apply bang tin
  const onApplySaveJobPost = (fullName, email, phoneNumber, profileType) => {
    const appliedJobSaveDatabase = async () => {
      try {
        const res = await authApi().post(
          endpoints["user-apply-job-post"](user.id),
          { job_post_id: jobPostDetail.id }
        );

        if (res.status === 201) {
          // thong bao ung tuyen thanh cong
          handleAppliedSucces();
          setApplied({
            ...applied,
            isApplied: true,
            applyJobPostId: res.data.id,
          });
        }
      } catch (err) {
        // thong bao lưu thất bại
        dispatch(alertOpen("error", "Lưu thông tin tuyển dụng thất bại"));
        console.error(err);
      } finally {
        setIsLoadingApply(false);
      }
    };

    const appliedToRecruiter = async () => {
      setIsLoadingApply(true);
      var formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("phone_number", phoneNumber);
      formData.append(
        "url_web",
        "https://buikhanhhuy.github.io/JobPortalSystem-UI/"
      );
      formData.append(
        "url_logo",
        "https://res.cloudinary.com/dtnpj540t/image/upload/v1655732060/JobPortalSystemImages/logo/job-link-icon_b0d1jo.png"
      );
      formData.append("url", "https://github.com/");
      formData.append(
        "url_view_cv",
        `${window.location.origin}/view-cv/${user.job_seeker_profile.id}/${profileType}/`
      );
      formData.append("job_name", jobPostDetail.job_name);
      formData.append("from_email", email);
      formData.append("to_email", jobPostDetail.recruiter.email);
      formData.append(
        "url",
        `${window.location.origin}/job-seeker-profiles/${user.job_seeker_profile.id}/`
      );
      formData.append("avatar", user.avatar);

      try {
        const res = await authApi().post(
          endpoints["applied-to-recruiter"],
          formData
        );

        if (res.status === 200) {
          // ung tuyen thanh cong -> tien hanh luu vao db
          appliedJobSaveDatabase();
        }
      } catch (err) {
        // thong bao ứng tuyển thất bại
        setIsLoadingApply(false);
        dispatch(alertOpen("error", "Ứng tuyển thất bại"));
        console.error(err);
      }
    };

    if (applied.isApplied === false && applied.applyJobPostId === null) {
      appliedToRecruiter();
    }
  };

  const handleAppliedSucces = () => {
    return openDialog({
      title: null,
      contentText: (
        <>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Avatar
              src={require("../assets/tick_check_mark_icon.png")}
              sx={{ width: 100, height: 100 }}
            />
            <Typography
              gutterBottom
              sx={{ fontWeight: "bold", color: "#1976d2", mt: 2 }}
            >
              Ứng tuyển thành công vào vị trí
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", fontSize: 24, color: "black" }}
            >
              {jobPostDetail.job_name}
            </Typography>
            <Typography variant="body1" color="grey.600" gutterBottom>
              {jobPostDetail.recruiter.company &&
                jobPostDetail.recruiter.company.company_name}
            </Typography>
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{ color: "black", mt: 3 }}
              gutterBottom
              component="div"
            >
              Nhà tuyển dụng sẽ liên hệ với bạn qua email hoặc số điện thoại nếu
              hồ sơ của bạn phù hợp
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{ color: "black" }}
              gutterBottom
              component="div"
            >
              Bạn thường xuyên kiểm tra mail và điện thoại nhé
            </Typography>
          </Stack>
        </>
      ),
      cancelButton: {
        children: "Xác nhận",
      },
      submitButton: null,
    });
  };

  const handleApplyJobPost = () => {
    return openDialog({
      title: (
        <>
          <Typography
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Ứng tuyển vào vị trí
          </Typography>{" "}
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", fontSize: 20 }}
          >
            {jobPostDetail.job_name}
          </Typography>
          <Typography variant="body2" color="grey.600" gutterBottom>
            {jobPostDetail.recruiter.company &&
              jobPostDetail.recruiter.company.company_name}
          </Typography>
        </>
      ),
      contentText: null,
      fields: {
        fullName: {
          initialValue: "",
          label: "Họ và tên (*)",
          fieldProps: { variant: "outlined", size: "small" },
        },
        email: {
          initialValue: "",
          label: "Email (*)",
          fieldProps: { variant: "outlined", size: "small" },
        },
        phoneNumber: {
          initialValue: "",
          label: "Số điện thoại (*)",
          fieldProps: { variant: "outlined", size: "small" },
        },

        profileType: {
          initialValue: 1,
          component: (
            <>
              <FormControl>
                <FormLabel id="profile-type-label">Chọn loại hồ sơ</FormLabel>
                <Field
                  component={Select}
                  name="profileType"
                  inputProps={{
                    id: "profileType",
                  }}
                >
                  <MenuItem value={1}>Hồ sơ online</MenuItem>
                  {isHaveCv && <MenuItem value={2}>CV của bạn</MenuItem>}
                </Field>
              </FormControl>
              {isHaveCv === false && (
                <Typography variant="body2" gutterBottom>
                  Hiện tại bạn chưa có CV, cập nhật Cv
                  <Button
                    sx={{ textTransform: "capitalize" }}
                    onClick={handRedirect}
                    size="small"
                  >
                    Tại đây
                  </Button>
                </Typography>
              )}
            </>
          ),
        },
      },
      validationSchema: Yup.object({
        fullName: Yup.string().required("Họ và tên không được để trống"),
        email: Yup.string()
          .required("Email không được để trống")
          .email("Email không đúng định dạng"),
        phoneNumber: Yup.string().required("Số điện thoại không được để trống"),
      }),
      cancelButton: { children: "Hủy bỏ" },
      submitButton: {
        children: "Nộp hồ sơ",
        props: {
          variant: "contained",
          color: "primary",
        },
      },
      onSubmit: async ({ fullName, email, phoneNumber, profileType }) =>
        onApplySaveJobPost(fullName, email, phoneNumber, profileType),
    });
  };

  // chuyen den trang cap nhat cv
  const handRedirect = () => {
    closeDialog();
    nav("/seeker/cv/");
  };

  let action = (
    <Box sx={{ p: 3, pt: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            sm: "flex-start",
            md: "flex-start",
            lg: "flex-start",
          },
        }}
      >
        {checkPermission(user, UserRole.SEEKER) && (
          <>
            {!applied.isApplied ? (
              <Button
                variant="contained"
                size="large"
                startIcon={<TouchAppIcon />}
                sx={{
                  mr: 1,
                  mb: 1,
                  width: {
                    xs: "100%",
                    sm: "auto",
                    md: "auto",
                    lg: "auto",
                  },
                }}
                onClick={handleApplyJobPost}
              >
                Ứng tuyển
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                startIcon={<CheckBoxIcon />}
                sx={{
                  mr: 1,
                  mb: 1,
                  width: {
                    xs: "100%",
                    sm: "auto",
                    md: "auto",
                    lg: "auto",
                  },
                }}
                disabled={true}
              >
                Bạn đã ứng tuyển
              </Button>
            )}

            {!saved.isSaved ? (
              <LoadingButton
                size="large"
                variant="contained"
                loadingPosition="start"
                loading={isLoadingSaveJobPost}
                startIcon={<BookmarkAddIcon />}
                sx={{
                  mr: 1,
                  mb: 1,
                  width: {
                    xs: "100%",
                    sm: "auto",
                    md: "auto",
                    lg: "auto",
                  },
                }}
                onClick={onSaveOrRemoveSaveJobPost}
              >
                Lưu
              </LoadingButton>
            ) : (
              <LoadingButton
                size="large"
                variant="outlined"
                loadingPosition="start"
                loading={isLoadingSaveJobPost}
                startIcon={<BookmarkAddedIcon />}
                sx={{
                  mr: 1,
                  mb: 1,
                  width: {
                    xs: "100%",
                    sm: "auto",
                    md: "auto",
                    lg: "auto",
                  },
                }}
                onClick={onSaveOrRemoveSaveJobPost}
              >
                Hủy lưu
              </LoadingButton>
            )}
          </>
        )}

        <Button
          variant="outlined"
          size="large"
          startIcon={<ChatIcon />}
          color="secondary"
          sx={{
            mr: 1,
            mb: 1,
            width: {
              xs: "100%",
              sm: "auto",
              md: "auto",
              lg: "auto",
            },
          }}
        >
          Chat ngay
        </Button>
      </Box>
    </Box>
  );

  console.log("PostDetail: render");
  return (
    <>
      <section>
        <Box
          sx={{
            width: "85%",
            margin: "0 auto",
            mt: 4,
            mb: 2,
          }}
        >
          {isLoadingJobPostDetail ? (
            <BackdropLoading />
          ) : jobPostDetail === null ? (
            <CardSearchNoResult description="Không tìm thấy thông tin bài đăng. " />
          ) : (
            <Grid container>
              <Grid md={9} lg={9}>
                <Box
                  sx={{
                    boxShadow: 2,
                    borderRadius: 1,
                    backgroundColor: "white",
                    mr: { xs: 0, sm: 0, md: 2, lg: 2 },
                    mb: 2,
                  }}
                >
                  <Box sx={{ p: 3 }}>
                    <ListItem sx={{ p: 0 }}>
                      <ListItemAvatar>
                        <Avatar
                          src={jobPostDetail.recruiter.avatar}
                          sx={{ width: 75, height: 75, mr: 1 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="h6"
                            component={Link}
                            to={`/companies/${jobPostDetail.id}/`}
                            style={{
                              textDecoration: "inherit",
                              color: "inherit",
                            }}
                          >
                            {jobPostDetail.recruiter.company.company_name}
                          </Typography>
                        }
                        secondary={`${jobPostDetail.recruiter.company.field_operation}`}
                      />
                    </ListItem>
                  </Box>
                  <Divider variant="middle" />
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {jobPostDetail.job_name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <Chip
                        variant="outlined"
                        icon={<CalendarMonthIcon />}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        label={
                          <Typography variant="body2">
                            Hạn nộp:{" "}
                            <Moment format="DD/MM/YYYY">
                              {jobPostDetail.deadline}
                            </Moment>
                          </Typography>
                        }
                      />
                      <Chip
                        variant="outlined"
                        icon={<QueryBuilderIcon />}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        label={
                          <Typography variant="body2">
                            Đăng ngày:{" "}
                            <Moment format="DD/MM/YYYY">
                              {jobPostDetail.created_date}
                            </Moment>
                          </Typography>
                        }
                      />
                      <Chip
                        variant="outlined"
                        icon={<HourglassBottomIcon />}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        label={
                          <Typography variant="body2">
                            Số lượng tuyển: {jobPostDetail.quantity}
                          </Typography>
                        }
                      />
                      <Chip
                        variant="outlined"
                        icon={<VisibilityIcon />}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        label={
                          <Typography variant="body2">
                            Lượt xem:{" "}
                            {jobPostDetail.view ? jobPostDetail.view.view : 1}
                          </Typography>
                        }
                      />
                    </Box>
                  </Box>
                  {/* action */}
                  {action}
                  <Divider variant="middle" />
                  <Box sx={{ p: 3 }}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          color="grey.600"
                        >
                          Yêu cầu kinh nghiệm
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          {jobPostDetail.experience.experience_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          color="grey.600"
                        >
                          Mức lương
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          {jobPostDetail.salary.salary_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          color="grey.600"
                        >
                          Cấp bậc
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          {jobPostDetail.position.position_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          color="grey.600"
                        >
                          Hình thức làm việc
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          {jobPostDetail.working_form.working_form_name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider variant="middle" />
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ pb: 3, pt: 0 }}
                    >
                      Thông tin
                    </Typography>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Grid container>
                          <Grid item xs={6} sm={6} md={5} lg={6}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              color="grey.600"
                            >
                              Ngành nghề tuyển dụng:
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={7} lg={6}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                              color="error"
                              gutterBottom
                            >
                              {jobPostDetail.career.career_name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={5} lg={6}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              color="grey.600"
                            >
                              Lĩnh vực hoạt động:
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={7} lg={6}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                              gutterBottom
                            >
                              {jobPostDetail.recruiter.company.field_operation}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={5} lg={6}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              color="grey.600"
                            >
                              Tỉnh thành tuyển dụng:
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={7} lg={6}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                              gutterBottom
                            >
                              {jobPostDetail.city.city_name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={5} lg={6}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              color="grey.600"
                            >
                              Địa chỉ tuyển dụng:
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={7} lg={6}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                              gutterBottom
                            >
                              {jobPostDetail.address}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Grid container>
                          <Grid item xs={6} sm={6} md={5} lg={6}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              color="grey.600"
                            >
                              Yêu cầu bằng cấp
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={7} lg={6}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                              gutterBottom
                            >
                              {jobPostDetail.degree_required}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={5} lg={6}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              color="grey.600"
                            >
                              Yêu cầu độ tuổi:
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={7} lg={6}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                              gutterBottom
                            >
                              18 - 35
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={5} lg={6}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              color="grey.600"
                            >
                              Yêu cầu giới tính:
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={7} lg={6}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                              gutterBottom
                            >
                              {jobPostDetail.gender_required === 0
                                ? "Không yêu cầu"
                                : jobPostDetail.gender_required === 1
                                ? "Nam"
                                : jobPostDetail.gender_required === 2
                                ? "Nữ"
                                : "Khác"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={5} lg={6}>
                            <Typography
                              variant="body1"
                              gutterBottom
                              color="grey.600"
                            >
                              Thời gian thực tập:
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={7} lg={6}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                              gutterBottom
                            >
                              {jobPostDetail.probationary_period}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box
                  sx={{
                    boxShadow: 2,
                    borderRadius: 1,
                    backgroundColor: "white",
                    mr: { xs: 0, sm: 0, md: 2, lg: 2 },
                    mb: 2,
                  }}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" component="div">
                      Chi tiết công việc
                    </Typography>
                    <Box sx={{ pt: 1 }}>{jobPostDetail.job_detail}</Box>
                  </Box>
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Typography variant="h6" component="div">
                      Mô tả công việc
                    </Typography>
                    <Box sx={{ pt: 1 }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: jobPostDetail.job_description,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Typography variant="h6" component="div">
                      Yêu cầu công việc
                    </Typography>
                    <Box sx={{ pt: 1 }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: jobPostDetail.job_requirement,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Typography variant="h6" component="div">
                      Quyền lợi được hưởng
                    </Typography>
                    <Box sx={{ pt: 1 }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: jobPostDetail.benefits_enjoyed,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Typography variant="h6" component="div">
                      Yêu cầu hồ sơ
                    </Typography>
                    <Box sx={{ pt: 1 }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: jobPostDetail.request_profile,
                        }}
                      />
                    </Box>
                  </Box>
                  {/* action */}
                  {action}
                </Box>

                <Box
                  sx={{
                    boxShadow: 2,
                    borderRadius: 1,
                    backgroundColor: "white",
                    mr: { xs: 0, sm: 0, md: 2, lg: 2 },
                    mb: 2,
                  }}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ pb: 3, pt: 0 }}
                    >
                      Thông tin liên hệ
                    </Typography>
                    <Grid container>
                      <Grid item xs={6} sm={6} md={5} lg={6}>
                        <Typography
                          variant="body1"
                          gutterBottom
                          color="grey.600"
                        >
                          Thông tin người liên hệ:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={7} lg={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          {jobPostDetail.contact_person_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={5} lg={6}>
                        <Typography
                          variant="body1"
                          gutterBottom
                          color="grey.600"
                        >
                          Số điện thoại người liên hệ:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={7} lg={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          {jobPostDetail.contact_phone_number}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={5} lg={6}>
                        <Typography
                          variant="body1"
                          gutterBottom
                          color="grey.600"
                        >
                          Email người liên hệ:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={7} lg={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          {jobPostDetail.contact_email}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={5} lg={6}>
                        <Typography
                          variant="body1"
                          gutterBottom
                          color="grey.600"
                        >
                          Địa chỉ liên hệ:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={7} lg={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          {jobPostDetail.contact_address}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box
                  sx={{
                    boxShadow: 2,
                    borderRadius: 1,
                    backgroundColor: "white",
                    mr: { xs: 0, sm: 0, md: 2, lg: 2 },
                    mb: 2,
                  }}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ pb: 3, pt: 0 }}
                    >
                      Tag
                    </Typography>
                    <Box>
                      {jobPostDetail.tags.length > 0 ? (
                        <Stack direction="row" spacing={1}>
                          {jobPostDetail.tags.map((tag) => (
                            <Chip
                              key={tag.id}
                              sx={{ fontWeight: "bold", mr: 1 }}
                              variant="outlined"
                              color="primary"
                              label={tag.name}
                              onClick={() => console.log("tag click")}
                            />
                          ))}
                        </Stack>
                      ) : (
                        <Typography variant="body1" color="grey.600">
                          Chưa có tag nào được gắn cho tin tuyển dụng này. 😊
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={12} sm={12} md={3} lg={3}>
                <Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ pb: 3, pt: 0 }}
                  >
                    Việc làm tương tự cho bạn
                    <div
                      style={{
                        backgroundColor: "#1565c0",
                        height: 5,
                        width: 100,
                      }}
                    ></div>
                  </Typography>
                  <CardSimilarJobPost
                    careerId={jobPostDetail.career.id}
                    cityId={jobPostDetail.city.id}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </section>
      {isLoadingApply && <BackdropLoading />}
    </>
  );
};
export default PostDetail;
