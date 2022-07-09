import { useState, useEffect } from "react";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CardJobPostFilter from "../../../components/landing/CardJobPostFilter";
import { useSelector } from "react-redux";
import { authApi, endpoints } from "../../../configs/Api";

const CardSuitableJobPost = () => {
  const user = useSelector((state) => state.user);
  const [desiredJob, setDesiredJob] = useState(null);
  const [filter, setFilter] = useState({
    career: true,
    city: true,
    experience: false,
    salary: false,
    position: false,
    workingForm: false,
  });

  const { career, city, experience, salary, position, workingForm } = filter;

  useEffect(() => {
    const loadDesiredJob = async () => {
      try {
        const res = await authApi().get(
          endpoints["desired-job"](user.job_seeker_profile.id)
        );

        if (res.status === 200 && res.data.id !== undefined) {
          setDesiredJob(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user.job_seeker_profile !== null) loadDesiredJob();
  }, [user.job_seeker_profile]);

  const handleChangeFilter = (event) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.checked,
    });
  };
  console.log(filter);

  return (
    <Box>
      <Typography
        variant="h6"
        pb={1}
        gutterBottom
        component="div"
        sx={{ mt: 3 }}
      >
        || Việc làm phù hợp với bạn
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: "32px",
          boxShadow: 3,
        }}
      >
        {desiredJob !== null ? (
          <Grid container spacing={2}>
            <Grid item md={2}>
              <Divider>Lọc theo</Divider>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={career ? career : false}
                      onChange={handleChangeFilter}
                      name="career"
                    />
                  }
                  label="Ngành nghề"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={city ? city : false}
                      onChange={handleChangeFilter}
                      name="city"
                    />
                  }
                  label="Địa điểm"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={experience ? experience : false}
                      onChange={handleChangeFilter}
                      name="experience"
                    />
                  }
                  label="Kinh nghiệm"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={salary ? salary : false}
                      onChange={handleChangeFilter}
                      name="salary"
                    />
                  }
                  label="Lương"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={position ? position : false}
                      onChange={handleChangeFilter}
                      name="position"
                    />
                  }
                  label="Vị trí"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={workingForm ? workingForm : false}
                      onChange={handleChangeFilter}
                      name="workingForm"
                    />
                  }
                  label="Hình thức"
                />
              </FormGroup>
            </Grid>
            <Grid item md={10}>
              <CardJobPostFilter
                careerId={career && desiredJob.career ? desiredJob.career : ""}
                cityId={city && desiredJob.city ? desiredJob.city : ""}
                experienceId={
                  experience && desiredJob.experience
                    ? desiredJob.experience
                    : ""
                }
                salaryId={salary && desiredJob.salary ? desiredJob.salary : ""}
                positionId={
                  position && desiredJob.position ? desiredJob.position : ""
                }
                workingFormId={
                  workingForm && desiredJob.working_form
                    ? desiredJob.working_form
                    : ""
                }
                pageSize={10}
              />
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" color="grey.600">
            Không tìm thấy công việc phù hợp, vì công việc mong muốn của bạn
            chưa được cập nhật. 😊
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CardSuitableJobPost;
