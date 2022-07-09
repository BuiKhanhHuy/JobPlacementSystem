import * as React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Container,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import EmailIcon from "@mui/icons-material/Email";

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="grey.200"
      align="center"
      sx={{ mt: 2, mb: 1 }}
    >
      {"Copyright © "}
      <Link style={{ color: "inherit" }} to="">
        JobLink
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          pb: 2,
          pt: 6,
          px: 6,
          mt: 4,
        }}
        component="footer"
      >
        <Container>
          <Grid container sx={{ mb: 2 }}>
            <Grid item md={6} lg={6} sx={12} sm={12}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ width: 50, height: 50 }}>
                    <HeadsetMicIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="div">
                      Hotline hỗ trợ ứng viên
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1">0888425094</Typography>
                  }
                />
              </ListItem>
            </Grid>
            <Grid item md={6} lg={6} sx={12} sm={12}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ width: 50, height: 50 }}>
                    <HeadsetMicIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="div">
                      Hotline hỗ trợ nhà tuyển dụng
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1">0888425094</Typography>
                  }
                />
              </ListItem>
            </Grid>
            <Grid item md={3} sx={12} sm={12}></Grid>
          </Grid>
          <Divider sx={{ mb: 2, borderColor: "grey.300" }} />
          <Grid container>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Avatar
                sx={{
                  height: "75px",
                  width: "75px",
                  backgroundColor: "white",
                  borderRadius: 1,
                  ml: 1,
                }}
                variant="square"
                alt="JobLink"
                src="https://res.cloudinary.com/dtnpj540t/image/upload/v1650189348/job-link-icon_ajoawf.png"
              />
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ ml: 1, mt: 1 }}
              >
                JobLink
              </Typography>
              <Stack direction="row">
                <IconButton aria-label="facebook" sx={{ color: "grey.200" }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="youtube" sx={{ color: "grey.200" }}>
                  <YouTubeIcon />
                </IconButton>
                <IconButton aria-label="Linked" sx={{ color: "grey.200" }}>
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="Gmail" sx={{ color: "grey.200" }}>
                  <EmailIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} sx={{mt: 2}}>
              <Typography variant="button" display="block" gutterBottom>
                Dành cho ứng viên
              </Typography>
              <Link
                to="/"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                  Tin tuyển dụng
                </Typography>
              </Link>
              <Link
                to="/companies/"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                  Công ty
                </Typography>
              </Link>
              <Link
                to="/seeker/applied-jobs/"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                  Việc làm đã ứng tuyển
                </Typography>
              </Link>
              <Link
                to="/seeker/save-jobs/"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                 Việc làm đã lưu
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} sx={{mt: 2}}>
              <Typography variant="button" display="block" gutterBottom>
                Dành cho nhà tuyển dụng
              </Typography>
              <Link
                to="/job-seeker-profiles/"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                  Tìm kiếm ứng viên
                </Typography>
              </Link>
              <Link
                to="/recruiter/new-post/"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                  Đăng tin tuyển dụng
                </Typography>
              </Link>
              <Link
                to="/recruiter/posted/"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                  Tin tuyển dụng đã đăng
                </Typography>
              </Link>
              <Link
                to="/recruiter/job-post-activity"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                  Ứng viên ứng tuyển
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} sx={{mt: 2}}>
              <Typography variant="button" display="block" gutterBottom>
                JobLink
              </Typography>
              <Link
                to="/about-us/"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                  Về chúng tôi
                </Typography>
              </Link>
              <Link
                to=""
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                  Điều khoản sử dụng
                </Typography>
              </Link>
              <Link
                to=""
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                Quy định bảo mật
                </Typography>
              </Link>
              <Link
                to=""
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Typography variant="body1" gutterBottom>
                 Cẩm nang nghề nghiệp
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Container>
        <Copyright />
      </AppBar>
    </>
  );
};
export default Footer;
