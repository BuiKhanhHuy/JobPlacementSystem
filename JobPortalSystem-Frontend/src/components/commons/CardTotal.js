import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CardTotal = (props) => {
  return (
    <Card sx={{ boxShadow: 2, width: "100%" }}>
      <CardContent style={{ paddingBottom: "5px" , width: "100%" }}>
        <Box>
          <Grid container sx={{ justifyContent: "space-between", width: "100%" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                {props.title}
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {props.value}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: props.colorIcon,
                  height: 56,
                  width: 56,
                }}
              >
                {props.icon}
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2,
            }}
          >
            <ArrowForwardIcon style={{ color: props.colorIcon }} />
            <Typography
              variant="body2"
              sx={{
                mr: 1,
              }}
            ></Typography>
            <Typography color="textSecondary" variant="caption">
              {props.discription}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardTotal;
