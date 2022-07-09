import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const CardPageNotFound = () => {
  const nav = useNavigate();

  return (
    <section>
      <Box>
        <Box>
          <Avatar
            variant="square"
            src={require("../../assets/img-404.jpg")}
            sx={{
              width: { xs: "40vh", sm: "40vh", md: "70vh" },
              height: { xs: "40vh", sm: "40vh", md: "70vh" },
              margin: "auto",
            }}
          />
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ margin: "0 auto" }}
              color="grey.800"
            >
              Sorry, Page Not Found
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ margin: "0 auto", mt: 1 }}
              color="grey.600"
            >
              The page you requested could not be found
            </Typography>
            <Button
              variant="contained"
              size="medium"
              sx={{ mt: 4 }}
              onClick={() => nav("/")}
            >
              GO BACK HOME
            </Button>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default CardPageNotFound;
