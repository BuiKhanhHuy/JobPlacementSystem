import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import CommentIcon from "@mui/icons-material/Comment";
import { memo } from "react";
import { Link } from "react-router-dom";

const CardItemJobSeekerProfile = ({ id, avatar, fullName, desiredJob }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        p: 1,
        textAlign: "center",
      }}
    >
      <Stack spacing={2} sx={{ margin: "auto" }}>
        <Avatar src={avatar} sx={{ width: 120, height: 120 }} />
      </Stack>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
          {fullName}
        </Typography>
        {desiredJob === null ? (
          <>
            <Typography
              sx={{ fontSize: 18 }}
              variant="h6"
              component="h6"
              color="error.main"
            >
              Chưa cập nhật
            </Typography>
            <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
              <Chip
                icon={<MonetizationOnIcon />}
                variant="outlined"
                label="Chưa cập nhật"
              />
              <Chip
                icon={<LocationOnIcon />}
                variant="outlined"
                label="Chưa cập nhật"
              />
              <Chip
                icon={<WorkIcon />}
                variant="outlined"
                label="Chưa cập nhật"
              />
            </Stack>
          </>
        ) : (
          <>
            <Typography
              sx={{ fontSize: 18 }}
              variant="h6"
              component="h6"
              color="error.main"
            >
              {desiredJob.job_name}
            </Typography>
            <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
              <Chip
                icon={<MonetizationOnIcon />}
                variant="outlined"
                label={desiredJob.salary.salary_name}
              />
              <Chip
                icon={<LocationOnIcon />}
                variant="outlined"
                label={desiredJob.city.city_name}
              />
              <Chip
                icon={<WorkIcon />}
                variant="outlined"
                label={desiredJob.working_form.working_form_name}
              />
            </Stack>
          </>
        )}
        <Stack direction="column" sx={{ mt: 1 }}>
          <Chip
            icon={<CommentIcon />}
            label="Chat ngay"
            onClick={() => console.log("Click chat")}
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ margin: "0 auto" }}>
        <Button
          size="medium"
          variant="contained"
          sx={{ px: 6 }}
          component={Link}
          to={`/job-seeker-profiles/${id}/`}
        >
          Xem hồ sơ
        </Button>
      </CardActions>
    </Card>
  );
};

export default memo(CardItemJobSeekerProfile);
