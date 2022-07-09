import { CircularProgress, Stack } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";

const Loading = () => {
  return (
    <Box sx={{ margin: "auto" }}>
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    </Box>
  );
};

const BackdropLoading = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
export { BackdropLoading };
