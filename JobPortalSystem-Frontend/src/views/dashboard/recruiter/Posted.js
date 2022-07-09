import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import CardPosted from "../../../components/dashboard/recruiter/CardPosted";

const NewPost = () => {
  
  return (
    <>
      <Typography variant="h6" pb={1} gutterBottom component="div">
        || Tin tuyển dụng đã đăng
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: "32px",
          boxShadow: 3,
        }}
      >
        <CardPosted />
      </Box>
    </>
  );
};

export default NewPost;
