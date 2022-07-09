import { Grid, Pagination, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useEffect, useState } from "react";
import CardItemJobPost from "../../components/cards/CardItemJobPost";
import Api, { endpoints } from "../../configs/Api";
import CardItemJobPostLoading from "../cards/CardItemJobPostLoading";
import CardSearchNoResult from "../commons/CardSearchNoResult";

const CardJobPostOfCompany = ({ recruiterId }) => {
  const [isLoadingJobPostOfCompany, setIsLoadingJobPostOfCompany] =
    useState(true);
  const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
  const [page, setPage] = useState(1);
  const [jobPosts, setJobPosts] = useState([]);
  const pageSize = 10;

  useEffect(() => {
    const loadJobPosts = async () => {
      setIsLoadingJobPostOfCompany(true);

      try {
        let query = `recruiter_id=${recruiterId}&page_size=${pageSize}&page=${page}`;

        const res = await Api.get(`${endpoints["job-posts"]}?${query}`);
        const data = res.data;

        setJobPosts(data.results);
        setPagination({
          count: data.count,
          sizeNumber: Math.ceil(data.count / pageSize),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingJobPostOfCompany(false);
      }
    };

    loadJobPosts();
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  console.log("CardJobPostOfCompany: render, recruiter_id: " + recruiterId);
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginTop: 2 }}
        gutterBottom
        component="div"
      >
        Vị trí đang tuyển
      </Typography>
      {isLoadingJobPostOfCompany ? (
        <Grid container spacing={2}>
          {Array.from({ length: pageSize }, (_, i) => i + 1).map((value) => (
            <CardItemJobPostLoading />
          ))}
        </Grid>
      ) : jobPosts.length === 0 ? (
        <CardSearchNoResult description="Chưa có thông tin tuyển dụng nào." />
      ) : (
        <>
          <Box>
            <Grid container spacing={2}>
              {jobPosts.map((jobPost) => (
                <CardItemJobPost
                  key={jobPost.id}
                  jobPostId={jobPost.id}
                  avatar={jobPost.recruiter.avatar}
                  jobName={jobPost.job_name}
                  companyName={jobPost.recruiter.company.company_name}
                  cityName={jobPost.city.city_name}
                  salaryName={jobPost.salary.salary_name}
                  deadline={jobPost.deadline}
                  isUrgentJob={jobPost.is_urgent_job}
                />
              ))}
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
  );
};

export default memo(CardJobPostOfCompany);
