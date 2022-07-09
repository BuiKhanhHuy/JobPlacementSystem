import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@mui/material/DialogTitle";
import { memo, useEffect, useRef, useState } from "react";
import { authApi, endpoints } from "../../../configs/Api";
import Loading from "../../commons/Loading";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: "80%",
    height: "90%",
  },
}));

const ViewJobPost = (props) => {
  const classes = useStyles();
  const { openViewJobPost, setOpenViewJobPost } = props;
  const [isLoadingJobPostDetail, setIsLoadingJobPostDetail] = useState(true);
  const [jobPostDetail, setJobPostDetail] = useState(null);

  const handleClose = () => {
    setOpenViewJobPost({ ...openViewJobPost, isOpen: false });
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    // load jobposts cua nha tuyen dung
    const loadJobPosts = async () => {
      setIsLoadingJobPostDetail(true);

      try {
        const res = await authApi().get(
          endpoints["job-post-detail"](openViewJobPost.jobPostId)
        );

        if (res.status === 200) {
          setJobPostDetail(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingJobPostDetail(false);
      }
    };

    if (openViewJobPost.isOpen) {
      if (openViewJobPost.jobPostId !== null) loadJobPosts();

      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openViewJobPost.jobPostId]);

  console.log("ViewJobPost: render");
  return (
    <>
      <Dialog
        maxWidth={"md"}
        open={openViewJobPost.isOpen}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="scroll-dialog-title">
          # Xem bài đã đăng của bạn
        </DialogTitle>
        <DialogContent dividers={"paper"}>
          {isLoadingJobPostDetail ? (
            <Loading />
          ) : (
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {" "}
              <Typography
                variant="h5"
                component="div"
                style={{ color: "#1976d2" }}
              >
                👉 {jobPostDetail.job_name}
              </Typography>
              <Box sx={{ p: 2 }}>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="body2" gutterBottom color="grey.600">
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
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="body2" gutterBottom color="grey.600">
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
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="body2" gutterBottom color="grey.600">
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
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="body2" gutterBottom color="grey.600">
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
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="body2" gutterBottom color="grey.600">
                      Hạn nộp
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold" }}
                      gutterBottom
                    >
                      <Moment format="DD/MM/YYYY">
                        {jobPostDetail.deadline}
                      </Moment>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="body2" gutterBottom color="grey.600">
                      Số lượng
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold" }}
                      gutterBottom
                    >
                      {jobPostDetail.quantity}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" component="div" sx={{ pb: 3, pt: 0 }}>
                  Thông tin
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
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
                  <Grid item xs={12} sm={12} md={12} lg={12}>
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
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="h6" component="div">
                    Chi tiết công việc
                  </Typography>
                  <Box sx={{ pt: 1, py: 2 }}>{jobPostDetail.job_detail}</Box>
                </Box>
                <Box sx={{ pt: 0 }}>
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
                <Box sx={{ pt: 0 }}>
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
                <Box sx={{ pt: 0 }}>
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
                <Box sx={{ pt: 0 }}>
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
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" component="div" sx={{ pb: 3, pt: 0 }}>
                  Thông tin liên hệ
                </Typography>
                <Grid container>
                  <Grid item xs={6} sm={6} md={5} lg={6}>
                    <Typography variant="body1" gutterBottom color="grey.600">
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
                    <Typography variant="body1" gutterBottom color="grey.600">
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
                    <Typography variant="body1" gutterBottom color="grey.600">
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
                    <Typography variant="body1" gutterBottom color="grey.600">
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
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Thoát</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(ViewJobPost);
