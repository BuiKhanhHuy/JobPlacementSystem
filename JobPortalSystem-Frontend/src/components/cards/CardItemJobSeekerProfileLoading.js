import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";
import { memo } from "react";

const CardItemJobSeekerProfileLoading = () => {
  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        p: 1,
        textAlign: "center",
      }}
    >
      <Stack spacing={2} sx={{ margin: "auto" }}>
        <Skeleton variant="circular" width={120} height={120} />
      </Stack>
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" />
        <Typography variant="h6">
          <Skeleton />
        </Typography>
        <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Stack>
        <Stack direction="column" sx={{ mt: 1 }}>
          <Skeleton variant="text" />
        </Stack>
        <Skeleton variant="text" />
      </CardContent>
    </Card>
  );
};

export default memo(CardItemJobSeekerProfileLoading);
