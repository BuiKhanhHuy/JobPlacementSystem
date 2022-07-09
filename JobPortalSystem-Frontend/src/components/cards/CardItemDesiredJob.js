import { Grid, Typography } from "@mui/material";

const CardItemDesiredJob = ({ desiredJob }) => {
  return (
    <>
      {desiredJob === null ? (
        <Grid container>
          <Typography variant="body1" gutterBottom color="grey.600">
            Chưa cập nhật
          </Typography>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Công việc
            </Typography>
            <Typography variant="body1" gutterBottom>
              {desiredJob.job_name}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Ngành nghề
            </Typography>
            <Typography variant="body1" gutterBottom>
              {desiredJob.career.career_name}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Vị trí
            </Typography>
            <Typography variant="body1" gutterBottom>
              {desiredJob.position.position_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Lương
            </Typography>
            <Typography variant="body1" gutterBottom>
              {desiredJob.salary.salary_name}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Hình thức làm việc
            </Typography>
            <Typography variant="body1" gutterBottom>
              {desiredJob.working_form.working_form_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Kinh nghiệm
            </Typography>
            <Typography variant="body1" gutterBottom>
              {desiredJob.experience.experience_name}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Tỉnh/Thành phố
            </Typography>
            <Typography variant="body1" gutterBottom>
              {desiredJob.city.city_name}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CardItemDesiredJob;
