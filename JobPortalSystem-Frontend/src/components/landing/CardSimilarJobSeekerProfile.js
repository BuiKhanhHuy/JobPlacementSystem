import { Grid, Box, Stack, Pagination } from "@mui/material";
import { memo, useEffect, useState } from "react";
import Api, { endpoints } from "../../configs/Api";
import Loading from "../commons/Loading";
import CardSearchNoResult from "../commons/CardSearchNoResult";
import CardItemJobSeekerProfile from "../cards/CardItemJobSeekerProfile";
import CardItemJobSeekerProfileLoading from "../cards/CardItemJobSeekerProfileLoading";

const CardSimilarJobSeekerProfile = ({ careerId, cityId }) => {
  const [isLoadingSimilarSeekerProfiles, setIsLoadingSimilarSeekerProfiles] =
    useState(true);
  const [similarJobSeekerProfiles, setSimilarJobSeekerProfiles] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    const loadSimilarSeekerProfiles = async () => {
      setIsLoadingSimilarSeekerProfiles(true);

      try {
        let query = `career_id=${careerId}&city_id=${cityId}&page_size=${pageSize}&page=${page}`;

        const res = await Api.get(
          `${endpoints["job-seeker-profiles"]}?${query}`
        );
        const data = await res.data;

        setSimilarJobSeekerProfiles(data.results);
        setPagination({
          count: data.count,
          sizeNumber: Math.ceil(data.count / pageSize),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingSimilarSeekerProfiles(false);
      }
    };

    loadSimilarSeekerProfiles();
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  console.log(
    "CardSimilarJobSeekerProfile: render, careerId=" +
      careerId +
      ", cityId=" +
      cityId
  );
  return (
    <Box>
      {isLoadingSimilarSeekerProfiles ? (
        <Grid container spacing={4}>
          {Array.from({ length: pageSize }, (_, i) => i + 1).map((value) => (
            <Grid item key={value} xs={12} sm={6} md={4} lg={4}>
              <CardItemJobSeekerProfileLoading />
            </Grid>
          ))}
        </Grid>
      ) : similarJobSeekerProfiles.length === 0 ? (
        <CardSearchNoResult description="Không tìm thấy việc ứng viên nào tương tự.🥲" />
      ) : (
        <>
          <Box>
            <Grid container spacing={4}>
              {similarJobSeekerProfiles.map((similarJobSeekerProfile) => (
                <Grid
                  item
                  key={similarJobSeekerProfile.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                >
                  <CardItemJobSeekerProfile
                    id={similarJobSeekerProfile.id}
                    avatar={similarJobSeekerProfile.job_seeker.avatar}
                    fullName={similarJobSeekerProfile.full_name}
                    desiredJob={similarJobSeekerProfile.desired_job}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {pagination.sizeNumber >= 2 && (
            <Box sx={{ pt: 5, pb: 2 }}>
              <Stack>
                <Pagination
                  color="primary"
                  size="large"
                  variant="outlined"
                  sx={{ margin: "0 auto" }}
                  count={pagination.sizeNumber}
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

export default memo(CardSimilarJobSeekerProfile);
