import React, { memo } from "react";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@material-ui/core/styles";
import ConstructionIcon from "@mui/icons-material/Construction";
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

const CardSearchWorkingForm = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const workingForms = useSelector((state) => state.workingForms.workingForms);

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
        startIcon={<ConstructionIcon />}
        onClick={handleClickOpen}
        sx={{ width: "100%" }}
      >
        Việc làm theo hình thức
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
              Việc làm theo hình thức làm việc
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
          {workingForms &&
            workingForms.length > 0 &&
            workingForms.map((workingForm) => (
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
                key={workingForm.id}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  className={classes.customHoverFocus}
                  component={Link}
                  to={`/?working_form_id=${workingForm.id}`}
                >
                  {workingForm.working_form_name}
                </Typography>
              </Box>
            ))}
        </Box>
      </Dialog>
    </div>
  );
};

export default memo(CardSearchWorkingForm);
