import { Box, Typography } from "@mui/material";
import CardJobPostActivity from "../../../components/dashboard/recruiter/CardJobPostActivity";

const JobPostActivity = () => {
  return (
    <>
      <Typography variant="h6" pb={1} gutterBottom component="div">
        || Ứng viên ứng tuyển
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: "32px",
          boxShadow: 3,
        }}
      >
        <CardJobPostActivity />
      </Box>
    </>
  );
};

export default JobPostActivity;
