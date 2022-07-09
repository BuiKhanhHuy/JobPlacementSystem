import React, { memo } from "react";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@material-ui/core/styles";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    textDecoration: "inherit",
    color: "inherit",
    "&:hover, &.Mui-focusVisible": { color: "#1976d2", fontWeight: "bold" },
  },
}));

const CardSearchLocation = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const cities = useSelector((state) => state.cities.cities);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<GpsFixedIcon />}
        onClick={handleClickOpen}
        sx={{ width: "100%" }}
      >
        Việc làm theo khu vực
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Việc làm theo khu vực
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            p: 2,
          }}
          onClick={handleClose}
        >
          {cities &&
            cities.length > 0 &&
            cities.map((city) => (
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    sm: "50%",
                    md: "25%",
                    lg: "25%",
                    xl: "20%",
                  },
                  p: 1,
                }}
                key={city.id}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  className={classes.customHoverFocus}
                  component={Link}
                  to={`/?city_id=${city.id}`}
                >
                  {city.city_name}
                </Typography>
              </Box>
            ))}
        </Box>
      </Dialog>
    </div>
  );
};

export default memo(CardSearchLocation);
