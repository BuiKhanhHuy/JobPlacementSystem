import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    textDecoration: "inherit",
    color: "inherit",
    "&:hover, &.Mui-focusVisible": { borderColor: "#308edb" },
  },
}));

const CardItemJobPostLoading = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6} sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            bgcolor: "background.paper",
            borderRadius: 1,
            border: 1,
            p: 1,
            borderColor: "#bbdefb",
          }}
          className={classes.customHoverFocus}
        >
          <Box sx={{ p: 1, margin: { xs: "auto", md: "auto 0" } }}>
            <Skeleton variant="circular" width={75} height={75} />
          </Box>
          <Box sx={{ p: 1, width: "100%" }} flex="1">
            <Skeleton variant="text" />
            <Stack direction="row" spacing={1}>
              <Skeleton variant="rectangular" height={60} width="100%"/>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default CardItemJobPostLoading;
