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
          <CardSearchNoResult description="Không tìm thấy thông tin ứng viên." />
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
                          ? "Chưa cập nhật"
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
                        Thời gian cập nhật:{" "}
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          <Moment format="DD/MM/YYYY">
                            {jobSeekerProfileDetail.updated_date}
                          </Moment>
                        </span>{" "}
                        | Lượt xem:{" "}
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
                        CV của ứng viên
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  Thông tin cá nhân
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
                        Số điện thoại
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {jobSeekerProfileDetail.phone_number}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Ngày sinh
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <Moment format="DD/MM/YYYY">
                          {jobSeekerProfileDetail.date_of_birth}
                        </Moment>
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Giới tính
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {jobSeekerProfileDetail.gender === 1
                          ? "Nam"
                          : jobSeekerProfileDetail.gender === 2
                          ? "Nữ"
                          : "Khác"}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Tình trạng hôn nhân
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {jobSeekerProfileDetail.marital_status === 1
                          ? "Độc thân"
                          : "Đã có gia đình"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Tỉnh/Thành phố
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {jobSeekerProfileDetail.city.city_name}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Địa chỉ
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
                  Công việc mong muốn
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
                  Bằng cấp học vấn
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
                  Kinh nghiệm làm việc
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
                  Mục tiêu nghề nghiệp
                </Typography>
                <Box sx={{ p: 1 }}>
                  {jobSeekerProfileDetail.career_goals === "" ? (
                    <Typography variant="body1" gutterBottom color="grey.600">
                      Chưa cập nhật
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
                  Kỹ năng bản thân
                </Typography>
                <Box sx={{ p: 1 }}>
                  {jobSeekerProfileDetail.personal_skills === "" ? (
                    <Typography variant="body1" gutterBottom color="grey.600">
                      Chưa cập nhật
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
                  Ứng viên tương tự
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
                      Không tìm thấy ứng viên tương tự, vì công việc mong muốn
                      của ứng viên này chưa được cập nhật. 😊
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
