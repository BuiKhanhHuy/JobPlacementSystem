import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { memo } from "react";

const CardItemCompanyLoading = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card
        sx={{
          height: "100%",
          widht: "100%",
          display: "flex",
          flexDirection: "column",
          p: 1,
          textAlign: "center",
          position: "relative",
        }}
      >
        <Stack spacing={2} sx={{ margin: "auto" }}>
          <Skeleton variant="circular" width={120} height={120} />
        </Stack>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            <Skeleton />
          </Typography>
          <Skeleton variant="text" />
          <Typography
            sx={{ fontSize: 16, fontWeight: "bold" }}
            gutterBottom
            color="grey.200"
          >
            <Skeleton variant="text" />
          </Typography>
          <Typography sx={{ fontSize: 16 }} gutterBottom color="grey.200">
            <Skeleton variant="text" />
          </Typography>

          <Stack direction="column" sx={{ mt: 1 }}>
            <Skeleton variant="text" />
          </Stack>
          <Skeleton variant="text" />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default memo(CardItemCompanyLoading);
