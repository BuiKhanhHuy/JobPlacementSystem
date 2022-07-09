import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    textDecoration: "inherit",
    color: "inherit",
    "&:hover, &.Mui-focusVisible": { color: "#1976d2", fontWeight: "bold" },
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  const cities = useSelector((state) => state.cities.cities);
  const careers = useSelector((state) => state.careers.careers);
  const { description, social, title } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Danh mục tỉnh thành
      </Typography>
      {cities.map((city) => (
        <Link
          display="block"
          variant="body1"
          to={`/?city_id=${city.id}`}
          key={city.id}
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          {city.city_name} {" | "}
        </Link>
      ))}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Danh mục ngành nghề
      </Typography>
      {careers.map((career) => (
        <Link
          display="block"
          variant="body1"
          to={`/?career_id=${career.id}`}
          key={career.id}
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          {career.career_name} {" | "}
        </Link>
      ))}

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Mạng xã hội
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          className={classes.customHoverFocus}
          key={network.name}
          to="/"
          sx={{ mb: 0.5 }}
          // style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  description: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Sidebar;
