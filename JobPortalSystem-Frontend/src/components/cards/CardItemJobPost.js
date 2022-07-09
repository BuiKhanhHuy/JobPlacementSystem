import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Moment from "react-moment";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    textDecoration: "inherit",
    color: "inherit",
    "&:hover, &.Mui-focusVisible": { borderColor: "#308edb" },
  },
}));

const CardItemJobPost = ({
  jobPostId,
  avatar,
  jobName,
  companyName,
  cityName,
  salaryName,
  deadline,
  isUrgentJob,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6} sx={{ width: "100%" }}>
        {isUrgentJob === true && (
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Chip
              sx={{ fontWeight: "bold", marginBottom: -4.5, marginRight: 1}}
              variant="filled"
              color="error"
              size="small"
              label="Gấp"
              icon={<ElectricBoltIcon />}
            />
          </Stack>
        )}

        <Box
          sx={{
            display: 'flex',
            flexWrap: "wrap",
            bgcolor: "background.paper",
            borderRadius: 1,
            border: 1,
            p: 1,
            borderColor: "#bbdefb",
          }}
          className={classes.customHoverFocus}
          component={Link}
          to={`/job-posts/${jobPostId}/`}
        >
          <Box sx={{ p: 1, margin: { xs: "auto", md: "auto 0" } }}>
            <Avatar src={avatar} sx={{ width: 75, height: 75 }} />
          </Box>
          <Box sx={{ p: 1, width: "100%"}} flex="1" >
            <Tooltip title={jobName} placement="bottom-start" followCursor>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  width: "100%",
                  fontSize: "1.1rem",
                  // whiteSpace: "nowrap",
                  // textOverflow: "ellipsis",
                  // overflow: "hidden",
                }}
              >
                {jobName}
              </Typography>
            </Tooltip>
            <Typography
              display="block"
              variant="body1"
              color="text.secondary"
              gutterBottom
            >
              {companyName}
            </Typography>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              <Stack direction="row" spacing={1}>
                <Chip
                  icon={<LocationOnIcon />}
                  variant="filled"
                  size="small"
                  sx={{ fontSize: 12 }}
                  label={cityName}
                />
                <Chip
                  variant="filled"
                  size="small"
                  icon={<MonetizationOnIcon />}
                  sx={{ fontSize: 12 }}
                  label={salaryName}
                />
                <Chip
                  variant="filled"
                  size="small"
                  icon={<CalendarMonthIcon />}
                  sx={{ fontSize: 12 }}
                  label={<Moment format="DD/MM/YYYY">{deadline}</Moment>}
                />
              </Stack>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default CardItemJobPost;
