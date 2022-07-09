import Box from "@mui/material/Box";
import CardJobPostMain from "../../components/landing/CardJobPostMain";
import CardJobPostFilter from "../../components/landing/CardJobPostFilter";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          border: 1,
          borderColor: "grey.200",
          borderRadius: 2,
          p: 3,
          mt: 4,
          mb: 2,
          bgcolor: "#fafaff",
        }}
      >
        <CardJobPostMain />
      </Box>
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          border: 1,
          borderColor: "grey.200",
          borderRadius: 2,
          p: 3,
          mt: 4,
          mb: 2,
          bgcolor: "#fafaff",
        }}
      >
        <CardJobPostFilter title={"Việc làm tuyển gấp"} isUrgentJob="True" pageSize={10}/>
      </Box>
    </>
  );
};

export default Home;
