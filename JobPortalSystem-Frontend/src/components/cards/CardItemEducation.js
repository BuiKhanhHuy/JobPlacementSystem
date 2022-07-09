import { Grid, Typography } from "@mui/material";
import Moment from "react-moment";

const CardItemEducation = ({ educationDetail }) => {
  return (
    <>
      {educationDetail === null ? (
        <Grid container>
          <Typography variant="body1" gutterBottom color="grey.600">
            Chưa cập nhật
          </Typography>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Bằng cấp
            </Typography>
            <Typography variant="body1" gutterBottom>
              {educationDetail.degree_name}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Chuyên ngành
            </Typography>
            <Typography variant="body1" gutterBottom>
              {educationDetail.major}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Trường/Đơn vị giảng dạy
            </Typography>
            <Typography variant="body1" gutterBottom>
              {educationDetail.training_place_name}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Điểm GPA
            </Typography>
            <Typography variant="body1" gutterBottom>
              {educationDetail.gpa}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Ngày bắt đầu
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Moment format="DD/MM/YYYY">{educationDetail.start_date}</Moment>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Ngày hoàn thành
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Moment format="DD/MM/YYYY">
                {educationDetail.completed_date}
              </Moment>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Thông tin bổ sung
            </Typography>

            {educationDetail.description === "" ? (
              <Typography variant="body1" gutterBottom color="grey.600">
                Chưa cập nhật
              </Typography>
            ) : (
              <Typography variant="body1" gutterBottom>
                <div
                  dangerouslySetInnerHTML={{
                    __html: educationDetail.description,
                  }}
                />
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CardItemEducation;
