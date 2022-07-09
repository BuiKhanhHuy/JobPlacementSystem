import { Box, Grid, Stack, Typography, Pagination } from "@mui/material";
import CardSearch from "../components/landing/CardSearch";
import { useEffect, useState } from "react";
import Api, { endpoints } from "../configs/Api";
import CardSearchNoResult from "../components/commons/CardSearchNoResult";
import CardItemJobSeekerProfile from "../components/cards/CardItemJobSeekerProfile";
import { useSearchParams } from "react-router-dom";
import CardItemJobSeekerProfileLoading from "../components/cards/CardItemJobSeekerProfileLoading";

const SeekerProfile = () => {
  const [isLoadingJobSeekerProfiles, setIsLoadingJobSeekerProfiles] =
    useState(true);
  const [q] = useSearchParams();
  const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
  const [page, setPage] = useState(1);
  const [jobSeekerProfiles, setJobSeekerProfiles] = useState([]);
  const pageSize = 16;

  useEffect(() => {
    const loadJobSeekerProfiles = async () => {
      setIsLoadingJobSeekerProfiles(true);
      try {
        let query = q.toString();

        query === ""
          ? (query += `page=${page}&page_size=${pageSize}`)
          : (query += `&page=${page}&page_size=${pageSize}`);

        const res = await Api.get(
          `${endpoints["job-seeker-profiles"]}?${query}`
        );
        const data = await res.data;

        setJobSeekerProfiles(data.results);
        setPagination({
          count: data.count,
          sizeNumber: Math.ceil(data.count / data.page_size),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingJobSeekerProfiles(false);
      }
    };

    loadJobSeekerProfiles();
  }, [q, page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  console.log("SeekerProfile: render");
  return (
    <>
      <CardSearch type={"typeSearchJobSeekers"} />
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          border: 1,
          borderColor: "grey.200",
          borderRadius: 2,
          mt: 4,
          mb: 2,
          p: 3,
        }}
      >
        <Box>
          {q.toString() === "" ? (
            <>
              <Typography
                component="h4"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{
                  marginBottom: 0,
                  fontWeight: "bold",
                  fontSize: { xs: 24, sm: 30, md: 30 },
                }}
              >
                Ứng viên
              </Typography>
              <div
                style={{
                  backgroundColor: "#1565c0",
                  height: 5,
                  width: 140,
                  margin: "0 auto",
                  marginTop: "5px",
                  marginBottom: "25px",
                }}
              ></div>
            </>
          ) : (
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ marginBottom: "25px" }}
            >
              Kết quả tìm kiếm (
              <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                {pagination.count}
              </span>{" "}
              ứng viên)
            </Typography>
          )}
          <Box>
            {isLoadingJobSeekerProfiles ? (
              <Grid container spacing={4}>
                {Array.from({ length: pageSize }, (_, i) => i + 1).map(
                  (value) => (
                    <Grid item key={value} xs={12} sm={6} md={3} lg={3}>
                      <CardItemJobSeekerProfileLoading />
                    </Grid>
                  )
                )}
              </Grid>
            ) : jobSeekerProfiles.length === 0 ? (
              <CardSearchNoResult description="Không tìm thấy ứng viên nào." />
            ) : (
              <>
                <Box>
                  <Grid container spacing={4}>
                    {/* job seeker profiles */}
                    {jobSeekerProfiles.map((jobSeekerProfile) => (
                      <Grid
                        item
                        key={jobSeekerProfile.id}
                        xs={12}
                        sm={6}
                        md={3}
                        lg={3}
                      >
                        <CardItemJobSeekerProfile
                          id={jobSeekerProfile.id}
                          avatar={jobSeekerProfile.job_seeker.avatar}
                          fullName={jobSeekerProfile.full_name}
                          desiredJob={jobSeekerProfile.desired_job}
                        />
                      </Grid>
                    ))}
                    {/* job seeker profiles */}
                  </Grid>
                </Box>
                {pagination.sizeNumber >= 2 && (
                  <Box sx={{ pt: 5, pb: 2 }}>
                    <Stack>
                      <Pagination
                        count={pagination.sizeNumber}
                        color="primary"
                        size="large"
                        variant="outlined"
                        sx={{ margin: "0 auto" }}
                        page={page}
                        onChange={handleChangePage}
                      />
                    </Stack>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default SeekerProfile;
