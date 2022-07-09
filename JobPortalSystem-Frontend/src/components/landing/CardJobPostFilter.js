import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { memo, useEffect, useState } from "react";
import Api, { endpoints } from "../../configs/Api";
import CardItemJobPost from "../cards/CardItemJobPost";
import CardItemJobPostLoading from "../cards/CardItemJobPostLoading";
import CardSearchNoResult from "../commons/CardSearchNoResult";

const CardJobPostFilter = ({
  title = "",
  careerId = "",
  cityId = "",
  experienceId = "",
  salaryId = "",
  positionId = "",
  workingFormId = "",
  isUrgentJob = "",
  pageSize = 10,
}) => {
  const [isLoadingFilterJobPosts, setIsLoadingFilterJobPosts] = useState(true);
  const [filterJobPosts, setFilterJobPosts] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    sizeNumber: 0,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadFilterJobPosts = async () => {
      setIsLoadingFilterJobPosts(true);
      try {
        let query = `career_id=${careerId}&city_id=${cityId}&experience_id=${experienceId}&salary_id=${salaryId}&position_id=${positionId}&working_form_id=${workingFormId}&is_urgent_job=${isUrgentJob}&page_size=${pageSize}&page=${page}`;

        console.log("query: " + query);

        const res = await Api.get(`${endpoints["job-posts"]}?${query}`);
        const data = await res.data;

        setFilterJobPosts(data.results);
        setPagination({
          count: data.count,
          sizeNumber: Math.ceil(data.count / pageSize),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingFilterJobPosts(false);
      }
    };

    loadFilterJobPosts();
  }, [
    page,
    careerId,
    cityId,
    experienceId,
    salaryId,
    positionId,
    workingFormId,
    isUrgentJob,
    pageSize,
  ]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      {title === "" ? null : (
        <Typography
          component="h4"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{
            marginBottom: 5,
            fontWeight: "bold",
            fontSize: { xs: 24, sm: 30, md: 30 },
          }}
        >
          {title}
        </Typography>
      )}

      <Box>
        <Grid container spacing={2}>
          {/* Job Posts Filter*/}
          {isLoadingFilterJobPosts ? (
            Array.from({ length: pageSize }, (_, i) => i + 1).map((value) => (
              <CardItemJobPostLoading />
            ))
          ) : filterJobPosts.length === 0 ? (
            <CardSearchNoResult description="Không tìm thấy bản tin tuyển dụng nào!" />
          ) : (
            filterJobPosts.map((filterJobPost) => (
              <CardItemJobPost
                key={filterJobPost.id}
                jobPostId={filterJobPost.id}
                avatar={filterJobPost.recruiter.avatar}
                jobName={filterJobPost.job_name}
                companyName={filterJobPost.recruiter.company.company_name}
                cityName={filterJobPost.city.city_name}
                salaryName={filterJobPost.salary.salary_name}
                deadline={filterJobPost.deadline}
                isUrgentJob={filterJobPost.is_urgent_job}
              />
            ))
          )}
        </Grid>
      </Box>
      {pagination.sizeNumber >= 2 && (
        <Box sx={{ pt: 5, pb: 2 }}>
          <Stack>
            <Pagination
              size="large"
              count={pagination.sizeNumber}
              color="primary"
              // siblingCount={{ xs: 0 }}
              variant="outlined"
              sx={{ margin: "0 auto" }}
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default memo(CardJobPostFilter);
