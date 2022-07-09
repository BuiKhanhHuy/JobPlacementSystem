import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

const FormNotifyDialog = ({ onCancel, isSuccess, description }) => {
  return (
    <Box sx={{ py: 4 }}>
      <Stack spacing={0} justifyContent="center" alignItems="center">
        <Box>
          <Avatar
            src={
              isSuccess
                ? require("../../assets/check.png")
                : require("../../assets/close.png")
            }
            sx={{ width: 120, height: 120 }}
            alt="Image"
          />
        </Box>
        <Box>
          {isSuccess ? (
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold", color: "#17aa3a", mt: 1.5 }}
            >
              Thành công
            </Typography>
          ) : (
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold", color: "#d32f2f", mt: 1 }}
            >
              Thất bại
            </Typography>
          )}
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ color: "black", mt: 2 }}
            gutterBottom
            component="div"
          >
            {description}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" type="button" onClick={onCancel}>
            Xác nhận
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default FormNotifyDialog;
