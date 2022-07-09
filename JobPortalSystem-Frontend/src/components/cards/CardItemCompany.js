import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
  Divider,
  Rating,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { memo } from "react";
import { Link } from "react-router-dom";

const CardItemCompany = ({
  id,
  companyName,
  cityName,
  fieldOperation,
  avatar,
  company_cover_image,
  rate,
}) => {
  console.log("CardItemCompany: render");

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 1,
          textAlign: "center",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${company_cover_image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Stack spacing={2} sx={{ margin: "auto" }}>
          <Avatar
            src={avatar}
            sx={{
              width: 120,
              height: 120,
              backgroundColor: "grey.100",
              border: 2,
              borderColor: "grey.300",
            }}
          />
        </Stack>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            sx={{ fontSize: 18 }}
            variant="h6"
            component="h6"
            color="grey.100"
            gutterBottom
          >
            {companyName}
          </Typography>
          <Rating name="read-only" value={rate} precision={0.1} readOnly />
          <Divider variant="middle" color="#F7F7F7" sx={{ mb: 1 }} />
          <Typography
            sx={{ fontSize: 16, fontWeight: "bold" }}
            gutterBottom
            color="grey.200"
          >
            {fieldOperation}
          </Typography>
          <Typography sx={{ fontSize: 16 }} gutterBottom color="grey.200">
            {cityName}
          </Typography>

          <Stack direction="column" sx={{ mt: 1 }}>
            <Chip
              sx={{ width: "50%", margin: "0 auto" }}
              icon={<CommentIcon />}
              label="Chat ngay"
              color="primary"
              onClick={() => console.log("Click chat")}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ margin: "0 auto" }}>
          <Button
            size="medium"
            variant="contained"
            color="error"
            sx={{ px: 6 }}
            component={Link}
            to={`/companies/${id}/`}
          >
            Xem thêm
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default memo(CardItemCompany);
