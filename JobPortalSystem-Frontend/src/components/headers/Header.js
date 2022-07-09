import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import AccountMenu from "./AccountMenu";
import { useSelector } from "react-redux";

const pages = [
  { label: "Công ty", path: "/companies/", index: 0 },
  { label: "Ứng viên", path: "/job-seeker-profiles/", index: 1 },
  { label: "Về chúng tôi", path: "/about-us/", index: 2 },
];

const Header = () => {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const user = useSelector((state) => state.user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  let btn = (
    <>
      <Stack direction="row" spacing={1}>
        <Link
          to="/login/"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <Button variant="outlined" size="medium">
            Đăng nhập
          </Button>
        </Link>
        <Link
          to="/register/"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <Button variant="contained" size="medium">
            Đăng ký
          </Button>
        </Link>
      </Stack>
    </>
  );

  if (user !== null && user !== undefined) btn = <AccountMenu />;

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        // color="primary"
        sx={{ borderBottom: 1, borderColor: "grey.200", boxShadow: 0 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                height: "65px",
                width: "120px",
              }}
              variant="square"
              alt="JobLink"
              src={require("../../assets/job-link-logo-transparent.png")}
              component={Link}
              to="/"
            />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link
                    key={page.label}
                    to={page.path}
                    style={{ textDecoration: "inherit", color: "inherit" }}
                  >
                    <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>

              <Box sx={{ margin: "0 auto" }}>
                <Avatar
                  sx={{
                    display: { xs: "flex", md: "none" },
                    height: "50px",
                    width: "110px",
                  }}
                  variant="square"
                  alt="JobLink"
                  src={require("../../assets/job-link-logo-transparent.png")}
                  component={Link}
                  to="/"
                />
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page.label}
                  to={page.path}
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  <Button
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "inherit",
                      display: "block",
                      backgroundColor: location.pathname.startsWith(page.path)
                        ? "#e3eefa"
                        : "none",
                    }}
                  >
                    {page.label}
                  </Button>
                </Link>
              ))}
            </Box>
            {btn}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Header;
