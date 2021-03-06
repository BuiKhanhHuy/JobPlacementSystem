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
          # Xem b??i ???? ????ng c???a b???n
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
                ???? {jobPostDetail.job_name}
              </Typography>
              <Box sx={{ p: 2 }}>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="body2" gutterBottom color="grey.600">
                      Y??u c???u kinh nghi???m
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
                      M???c l????ng
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
                      C???p b???c
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
                      H??nh th???c l??m vi???c
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
                      H???n n???p
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
                      S??? l?????ng
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
                  Th??ng tin
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
                          Ng??nh ngh??? tuy???n d???ng:
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
                          L??nh v???c ho???t ?????ng:
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
                          T???nh th??nh tuy???n d???ng:
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
                          ?????a ch??? tuy???n d???ng:
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
                          Y??u c???u b???ng c???p
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
                          Y??u c???u ????? tu???i:
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
                          Y??u c???u gi???i t??nh:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={7} lg={6}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          {jobPostDetail.gender_required === 0
                            ? "Kh??ng y??u c???u"
                            : jobPostDetail.gender_required === 1
                            ? "Nam"
                            : jobPostDetail.gender_required === 2
                            ? "N???"
                            : "Kh??c"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={5} lg={6}>
                        <Typography
                          variant="body1"
                          gutterBottom
                          color="grey.600"
                        >
                          Th???i gian th???c t???p:
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
                    Chi ti???t c??ng vi???c
                  </Typography>
                  <Box sx={{ pt: 1, py: 2 }}>{jobPostDetail.job_detail}</Box>
                </Box>
                <Box sx={{ pt: 0 }}>
                  <Typography variant="h6" component="div">
                    M?? t??? c??ng vi???c
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
                    Y??u c???u c??ng vi???c
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
                    Quy???n l???i ???????c h?????ng
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
                    Y??u c???u h??? s??
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
                  Th??ng tin li??n h???
                </Typography>
                <Grid container>
                  <Grid item xs={6} sm={6} md={5} lg={6}>
                    <Typography variant="body1" gutterBottom color="grey.600">
                      Th??ng tin ng?????i li??n h???:
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
                      S??? ??i???n tho???i ng?????i li??n h???:
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
                      Email ng?????i li??n h???:
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
                      ?????a ch??? li??n h???:
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
          <Button onClick={handleClose}>Tho??t</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(ViewJobPost);
