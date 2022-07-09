import { Chip, Grid, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Stack from "@mui/material/Stack";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { memo, useEffect, useState } from "react";
import Api, { endpoints } from "../../configs/Api";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../../components/commons/Loading";

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    textDecoration: "inherit",
    color: "inherit",
    "&:hover, &.Mui-focusVisible": { borderColor: "#308edb" },
  },
}));

const CardSimilarJobPost = ({ careerId, cityId }) => {
  const classes = useStyles();
  const [isLoadingSimilarJobPosts, setIsLoadingSimilarJobPosts] =
    useState(true);
  const [similarJobPosts, setSimilarJobPosts] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadSimilarJobPost = async () => {
      setIsLoadingSimilarJobPosts(true);

      try {
        const pageSize = 8;
        let query = `career_id=${careerId}&city_id=${cityId}&page_size=${pageSize}&page=${page}`;

        const res = await Api.get(`${endpoints["job-posts"]}?${query}`);
        const data = await res.data;

        setSimilarJobPosts(data.results);
        setPagination({
          count: data.count,
          sizeNumber: Math.ceil(data.count / pageSize),
        });
      } catch (err) {
        console.error(err);
      }finally{
        setIsLoadingSimilarJobPosts(false);
      }
    };

    loadSimilarJobPost();
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  console.log("CardSimilarJobPost: render");

  return isLoadingSimilarJobPosts ? (
    <Loading />
  ) : similarJobPosts.length === 0 ? (
    <Typography variant="body1" gutterBottom color="grey.600">
      Không tìm thấy việc làm nào tương tự.🥲
    </Typography>
  ) : (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box
              sx={{
                display: {
                  sx: "block",
                  sm: "flex",
                  md: "block",
                  lg: "block",
                },
                flexWrap: "wrap",
              }}
            >
              {similarJobPosts.map((similarJobPost) => (
                <Box key={similarJobPost.id}>
                  {similarJobPost.is_urgent_job === true && (
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Chip
                        sx={{
                          fontWeight: "bold",
                          marginBottom: -6,
                          marginRight: 2,
                        }}
                        variant="filled"
                        color="error"
                        size="small"
                        label="Gấp"
                        icon={<ElectricBoltIcon />}
                      />
                    </Stack>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      bgcolor: "background.paper",
                      borderRadius: 1,
                      border: 1,
                      borderColor: "#bbdefb",
                      p: 1,
                      mb: 1,
                      width: {
                        sx: "100%",
                        sm: "50%",
                        md: "100%",
                        lg: "100%",
                      },
                    }}
                    key={similarJobPost.id}
                    className={classes.customHoverFocus}
                    component={Link}
                    to={`/job-posts/${similarJobPost.id}`}
                  >
                    <Box sx={{ p: 1, width: "100%" }}>
                      <Typography variant="button" display="block">
                        {similarJobPost.job_name}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        color="text.secondary"
                      >
                        {similarJobPost.recruiter.company.company_name}
                      </Typography>
                      <Box>
                        <Chip
                          icon={<LocationOnIcon />}
                          variant="filled"
                          size="small"
                          sx={{ fontSize: 12, mr: 1, mb: 1 }}
                          label={similarJobPost.city.city_name}
                        />
                        <Chip
                          variant="filled"
                          size="small"
                          icon={<MonetizationOnIcon />}
                          sx={{ fontSize: 12, mr: 1, mb: 1 }}
                          label={similarJobPost.salary.salary_name}
                        />
                        <Chip
                          variant="filled"
                          size="small"
                          icon={<CalendarMonthIcon />}
                          sx={{ fontSize: 12, mr: 1, mb: 1 }}
                          label={
                            <Typography variant="caption">
                              <Moment format="DD/MM/YYYY">
                                {similarJobPost.deadline}
                              </Moment>
                            </Typography>
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      {pagination.sizeNumber >= 2 && (
        <Box>
          <Stack sx={{ py: 1 }}>
            <Pagination
              siblingCount={0}
              hidePrevButton
              hideNextButton
              color="primary"
              size="small"
              variant="outlined"
              sx={{ margin: "0 auto" }}
              count={pagination.sizeNumber}
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default memo(CardSimilarJobPost);
