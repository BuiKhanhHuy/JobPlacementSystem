import React, { memo } from "react";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@material-ui/core/styles";
import WorkIcon from "@mui/icons-material/Work";
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

const CardSearchCareer = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const careers = useSelector((state) => state.careers.careers);

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
        startIcon={<WorkIcon />}
        onClick={handleClickOpen}
        sx={{ width: "100%" }}
      >
        Việc làm theo ngành nghề
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
              Việc làm theo ngành nghề
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
          {careers &&
            careers.length > 0 &&
            careers.map((career) => (
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
                key={career.id}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  className={classes.customHoverFocus}
                  component={Link}
                  to={`/?career_id=${career.id}`}
                >
                  {career.career_name}
                </Typography>
              </Box>
            ))}
        </Box>
      </Dialog>
    </div>
  );
};

export default memo(CardSearchCareer);
