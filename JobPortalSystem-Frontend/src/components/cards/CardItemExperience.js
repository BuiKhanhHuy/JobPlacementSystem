import { Grid, Typography } from "@mui/material";
import Moment from "react-moment";

const CardItemExperience = ({ experienceDetails }) => {
  return (
    <>
      {experienceDetails.length === 0 ? (
        <Grid container>
          <Typography variant="body1" gutterBottom color="grey.600">
            Chưa cập nhật
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid container spacing={2}>
            {experienceDetails.map((experienceDetail, index) => (
              <Grid container item>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant="button"
                    display="block"
                    gutterBottom
                    color="grey.500"
                  >
                    + Kinh nghiệm thứ {index + 1}:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Công việc
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {experienceDetail.job_name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Vị trí
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {experienceDetail.job_position}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Ngày bắt đầu
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <Moment format="DD/MM/YYYY">
                      {experienceDetail.start_date}
                    </Moment>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Ngày kết thúc
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <Moment format="DD/MM/YYYY">
                      {experienceDetail.end_date}
                    </Moment>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Tên công ty/doanh nghiệp
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {experienceDetail.company_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Mô tả công việc
                  </Typography>

                  {experienceDetail.description === "" ? (
                    <Typography variant="body1" gutterBottom color="grey.600">
                      Chưa cập nhật
                    </Typography>
                  ) : (
                    <Typography variant="body1" gutterBottom>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: experienceDetail.description,
                        }}
                      />{" "}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default CardItemExperience;
