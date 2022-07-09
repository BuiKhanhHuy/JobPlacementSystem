import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import CardSaveJob from "../../../components/dashboard/seeker/CardSaveJobPost";

const SaveJobPost = () => {
  return (
    <>
      <Typography variant="h6" pb={1} gutterBottom component="div">
        || Tin tuyển dụng đã lưu
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: "32px",
          boxShadow: 3,
        }}
      >
        <CardSaveJob />
      </Box>
    </>
  );
};

export default SaveJobPost;
