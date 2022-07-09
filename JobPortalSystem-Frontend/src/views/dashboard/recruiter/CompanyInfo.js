import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardCompanyInfo from "../../../components/dashboard/recruiter/CardCompanyInfo";

const CompnanyInfo = () => {
  return (
    <>
      <Typography variant="h6" pb={1} gutterBottom component="div">
        || Thông tin công ty
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: "32px",
          boxShadow: 3,
        }}
      >
        <CardCompanyInfo />
      </Box>
    </>
  );
};
export default CompnanyInfo;
