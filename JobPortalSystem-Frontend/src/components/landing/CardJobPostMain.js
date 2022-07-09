import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { memo, useEffect, useState } from "react";
import Api, { endpoints } from "../../configs/Api";
import CardItemJobPost from "../../components/cards/CardItemJobPost";
import CardSearchNoResult from "../../components/commons/CardSearchNoResult";
import CardItemJobPostLoading from "../cards/CardItemJobPostLoading";import { useSearchParams } from "react-router-dom";


const CardJobPostMain = () => {
  const [isLoadingJobPosts, setIsLoadingJobPosts] = useState(true);
  const [q] = useSearchParams();
  const [jobPosts, setJobPosts] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
  const [page, setPage] = useState(1);
  const pageSize = 16;

  useEffect(() => {
    const loadJobPosts = async () => {
      setIsLoadingJobPosts(true);
      try {
        let query = q.toString();

        query === ""
          ? (query += `page=${page}&page_size=${pageSize}`)
          : (query += `&page=${page}&page_size=${pageSize}`);
        console.info("query: " + query);

        const res = await Api.get(`${endpoints["job-posts"]}?${query}`);
        const data = await res.data;

        setJobPosts(data.results);
        setPagination({
          count: data.count,
          sizeNumber: Math.ceil(data.count / data.page_size),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingJobPosts(false);
      }
    };
    loadJobPosts();
  }, [q, page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  console.log(
    "CardJobPostMain: Đã vào đây. Page số: " +
      page +
      ", is loading: " +
      isLoadingJobPosts
  );

  return (
    <Box>
      <Typography
        component="h5"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{
          marginBottom: 5,
          fontWeight: "bold",
          fontSize: { xs: 24, sm: 30, md: 30 },
        }}
      >
        {q.toString() === "" ? (
          "Việc làm mới nhất"
        ) : (
          <span>
            Kết quả tìm kiếm (
            <span style={{ fontWeight: "bold", color: "#1976d2" }}>
              {pagination.count}
            </span>{" "}
            tin đăng)
          </span>
        )}
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {/* jobposts */}
          {isLoadingJobPosts ? (
            Array.from({ length: pageSize }, (_, i) => i + 1).map((value) => (
              <CardItemJobPostLoading />
            ))
          ) : jobPosts.length === 0 ? (
            <CardSearchNoResult description="Không tìm thấy bản tin tuyển dụng nào!" />
          ) : (
            jobPosts.map((jobPost) => (
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
              // siblingCount={{ xs: 0 }}
              color="primary"
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

export default memo(CardJobPostMain);
