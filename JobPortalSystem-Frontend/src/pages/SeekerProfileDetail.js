import {
  Avatar,
  Grid,
  Box,
  Button,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ChatIcon from "@mui/icons-material/Chat";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api, { endpoints } from "../configs/Api";
import CardSimilarJobSeekerProfile from "../components/landing/CardSimilarJobSeekerProfile";
import { BackdropLoading } from "../components/commons/Loading";
import CardSearchNoResult from "../components/commons/CardSearchNoResult";
import Moment from "react-moment";
import CardItemExperience from "../components/cards/CardItemExperience";
import CardItemEducation from "../components/cards/CardItemEducation";
import CardItemDesiredJob from "../components/cards/CardItemDesiredJob";
import CardCvPreview from "../components/landing/CardCvPreview";

const SeekerProfileDetail = () => {
  const [isLoadingSeekerProfileDetail, setIsLoadingSeekerProfileDetail] =
    useState(true);
  const { jobSeekerProfileId } = useParams();
  const [jobSeekerProfileDetail, setJobSeekerProfileDetail] = useState(null);
  const [openCvPreview, setOpenCvPreview] = useState(false);

  useEffect(() => {
    const addViewJobSeekerProfile = async () => {
      try {
        Api.post(endpoints["job-seeker-profile-view"](jobSeekerProfileId));
      } catch (err) {
        console.error(err);
      }
    };

    addViewJobSeekerProfile();
  }, []);

  useEffect(() => {
    const loadJobSeekerProfileDetail = async () => {
      setIsLoadingSeekerProfileDetail(true);
      try {
        const res = await Api.get(
          endpoints["job-seeker-profile-detail"](jobSeekerProfileId)
        );

        setJobSeekerProfileDetail(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingSeekerProfileDetail(false);
      }
    };

    loadJobSeekerProfileDetail();
  }, [jobSeekerProfileId]);

  console.log("SeekerProfileDetail: render");

  return (
    <>
      <section>
        {isLoadingSeekerProfileDetail? (
          <BackdropLoading />
        ) : jobSeekerProfileDetail === null ? (
          <CardSearchNoResult description="Kh??ng t??m th???y th??ng tin ???ng vi??n." />
        ) : (
          <>
            <Box
              sx={{
                width: "80%",
                margin: "0 auto",
                mt: 4,
                mb: 2,
                p: 3,
                boxShadow: 2,
                borderRadius: 1,
                backgroundColor: "background.paper",
              }}
            >
              <Box
                sx={{
                  display: { xs: "block", sm: "block", md: "flex", lg: "flex" },
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    pt: 1,
                    display: {
                      xs: "block",
                      sm: "block",
                      md: "flex",
                      lg: "flex",
                    },
                  }}
                >
                  <Box>
                    <Avatar
                      src={jobSeekerProfileDetail.job_seeker.avatar}
                      sx={{ width: 100, height: 100, margin: "0 auto" }}
                    />
                  </Box>
                  <Box sx={{ px: 2, pt: 1 }}>
                    <CardContent sx={{ flexGrow: 1, p: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          textAlign: {
                            xs: "center",
                            sm: "center",
                            md: "left",
                            lg: "left",
                          },
                        }}
                        variant="h5"
                        component="h5"
                        gutterBottom
                      >
                        {jobSeekerProfileDetail.full_name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: {
                            xs: "center",
                            sm: "center",
                            md: "left",
                            lg: "left",
                          },
                        }}
                        color="grey.600"
                      >
                        {jobSeekerProfileDetail.desired_job === null
                          ? "Ch??a c???p nh???t"
                          : jobSeekerProfileDetail.desired_job.job_name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 16,
                          textAlign: {
                            xs: "center",
                            sm: "center",
                            md: "left",
                            lg: "left",
                          },
                        }}
                        color="grey.600"
                        gutterBottom
                      >
                        Th???i gian c???p nh???t:{" "}
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          <Moment format="DD/MM/YYYY">
                            {jobSeekerProfileDetail.updated_date}
                          </Moment>
                        </span>{" "}
                        | L?????t xem:{" "}
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {jobSeekerProfileDetail.view
                            ? jobSeekerProfileDetail.view.view
                            : 1}
                        </span>
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent={{
                          xs: "center",
                          sm: "center",
                          md: "left",
                          lg: "left",
                        }}
                      >
                        <IconButton aria-label="print" size="large">
                          <LocalPrintshopIcon />
                        </IconButton>
                        <IconButton aria-label="chat" size="large">
                          <ChatIcon fontSize="inherit" />
                        </IconButton>
                      </Stack>
                    </CardContent>
                  </Box>
                </Box>

                <Box sx={{ px: 2, pt: 1, ml: "auto" }}>
                  <Box>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      sx={{ mb: { xs: 2, sm: 2, md: 0, lg: 0 } }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: { xs: "100%", sm: "auto" },
                          marginLeft: "auto",
                        }}
                        startIcon={<DocumentScannerIcon />}
                        onClick={() => setOpenCvPreview(true)}
                      >
                        CV c???a ???ng vi??n
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  Th??ng tin c?? nh??n
                </Typography>
                <Box sx={{ p: 1 }}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Email
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {jobSeekerProfileDetail.job_seeker.email}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        S??? ??i???n tho???i
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {jobSeekerProfileDetail.phone_number}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Ng??y sinh
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <Moment format="DD/MM/YYYY">
                          {jobSeekerProfileDetail.date_of_birth}
                        </Moment>
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Gi???i t??nh
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {jobSeekerProfileDetail.gender === 1
                          ? "Nam"
                          : jobSeekerProfileDetail.gender === 2
                          ? "N???"
                          : "Kh??c"}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        T??nh tr???ng h??n nh??n
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {jobSeekerProfileDetail.marital_status === 1
                          ? "?????c th??n"
                          : "???? c?? gia ????nh"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        T???nh/Th??nh ph???
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {jobSeekerProfileDetail.city.city_name}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        ?????a ch???
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {jobSeekerProfileDetail.address}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  C??ng vi???c mong mu???n
                </Typography>
                <Box sx={{ p: 1 }}>
                  {/* Card Item Desired Job */}
                  <CardItemDesiredJob
                    desiredJob={jobSeekerProfileDetail.desired_job}
                  />
                </Box>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  B???ng c???p h???c v???n
                </Typography>
                <Box sx={{ p: 1 }}>
                  {/* Card Item Education */}
                  <CardItemEducation
                    educationDetail={jobSeekerProfileDetail.education_detail}
                  />
                </Box>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  Kinh nghi???m l??m vi???c
                </Typography>
                <Box sx={{ p: 1 }}>
                  {/* Card Item Experience */}
                  <CardItemExperience
                    experienceDetails={
                      jobSeekerProfileDetail.experience_details
                    }
                  />
                </Box>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  M???c ti??u ngh??? nghi???p
                </Typography>
                <Box sx={{ p: 1 }}>
                  {jobSeekerProfileDetail.career_goals === "" ? (
                    <Typography variant="body1" gutterBottom color="grey.600">
                      Ch??a c???p nh???t
                    </Typography>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobSeekerProfileDetail.career_goals,
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  K??? n??ng b???n th??n
                </Typography>
                <Box sx={{ p: 1 }}>
                  {jobSeekerProfileDetail.personal_skills === "" ? (
                    <Typography variant="body1" gutterBottom color="grey.600">
                      Ch??a c???p nh???t
                    </Typography>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobSeekerProfileDetail.personal_skills,
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "80%",
                margin: "0 auto",
                border: 1,
                borderColor: "grey.200",
                borderRadius: 1,
                mt: 4,
                mb: 2,
                p: 3,
              }}
            >
              <Box>
                <Typography
                  component="h4"
                  variant="h4"
                  color="text.primary"
                  gutterBottom
                  sx={{ marginBottom: 0 }}
                >
                  ???ng vi??n t????ng t???
                </Typography>
                <div
                  style={{
                    backgroundColor: "#1565c0",
                    height: 5,
                    width: 150,
                    marginTop: "5px",
                    marginBottom: "35px",
                  }}
                ></div>
                <Box>
                  {jobSeekerProfileDetail.desired_job === null ? (
                    <Typography variant="body1" color="grey.600">
                      Kh??ng t??m th???y ???ng vi??n t????ng t???, v?? c??ng vi???c mong mu???n
                      c???a ???ng vi??n n??y ch??a ???????c c???p nh???t. ????
                    </Typography>
                  ) : (
                    <CardSimilarJobSeekerProfile
                      careerId={jobSeekerProfileDetail.desired_job.career.id}
                      cityId={jobSeekerProfileDetail.desired_job.city.id}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </>
        )}
        <CardCvPreview
          openCvPreview={openCvPreview}
          setOpenCvPreview={setOpenCvPreview}
          jobSeekerProfileId={jobSeekerProfileId}
        />
      </section>
    </>
  );
};
export default SeekerProfileDetail;
