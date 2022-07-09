import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

const CardSearchNoResult = ({ description }) => {
  return (
    <>
      <Box sx={{ margin: "0 auto" }}>
        <Avatar
          variant="square"
          src={require("../../assets/search-no-result.png")}
          sx={{ width: "190px", height: "190px", margin: "auto" }}
        />
        <Typography
          variant="body1"
          gutterBottom
          sx={{ color: "GrayText", textAlign: "center" }}
        >
          {description}
        </Typography>
      </Box>
    </>
  );
};

export default CardSearchNoResult;
