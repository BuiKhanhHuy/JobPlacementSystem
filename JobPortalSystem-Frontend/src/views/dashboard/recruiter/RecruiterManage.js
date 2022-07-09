import { Box } from "@mui/system";
import CardStats from "../../../components/dashboard/recruiter/CardStats";
import JobPostActivity from "./JobPostActivity";

const RecruiterManage = () => {
  return (
    <Box>
      <CardStats />
      <div style={{marginTop: "25px"}}/>
      <JobPostActivity />
    </Box>
  );
};

export default RecruiterManage;
