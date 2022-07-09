import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import CardAppliedJob from "../../../components/dashboard/seeker/CardAppliedJob"

const AppliedJob = () => {
  
  return (
    <>
      <Typography variant="h6" pb={1} gutterBottom component="div">
        || Việc làm đã ứng tuyển
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: "32px",
          boxShadow: 3,
        }}
      >
        <CardAppliedJob />
      </Box>
    </>
  );
};

export default AppliedJob;
