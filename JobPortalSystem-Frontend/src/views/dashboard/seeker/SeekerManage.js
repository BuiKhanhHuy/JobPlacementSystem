import { Box } from "@mui/system";
import CardStats from "../../../components/dashboard/seeker/CardStats";
import CardSuitableJobPost from "../../../components/dashboard/seeker/CardSuitableJobPost"

const SeekerManage = () => {
  return (
    <Box>
      <CardStats />
      <CardSuitableJobPost />
    </Box>
  );
};

export default SeekerManage;
