import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import CardNewPost from "../../../components/dashboard/recruiter/CardNewPost";

const NewPost = () => {
  
  return (
    <>
      <Typography variant="h6" pb={1} gutterBottom component="div">
        || Đăng tin tuyển dụng mới
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: "32px",
          boxShadow: 3,
        }}
      >
        <CardNewPost type="add"/>
      </Box>
    </>
  );
};

export default NewPost;
