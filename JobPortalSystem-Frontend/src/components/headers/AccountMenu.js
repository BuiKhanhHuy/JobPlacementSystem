import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HistoryIcon from "@mui/icons-material/History";
import AppsIcon from "@mui/icons-material/Apps";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import KeyIcon from "@mui/icons-material/Key";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import checkPermission from "../../permissions/CheckPermission";
import UserRole from "../../permissions/UserRole";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import cookie from "react-cookies";
import { logoutUser } from "../../store/actions/UserCreator";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user);
  const nav = useNavigate();
  const dispath = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout
  const handleLogout = () => {
    if (cookie.load("access_token")) {
      cookie.remove("access_token");
      cookie.remove("current_user");
      dispath(logoutUser());
      nav("/login/");
    }
  };

  const menuItemSeekers = [
    <MenuItem onClick={() => nav("/seeker/account/")}>
      <Avatar src={user.avatar} />
      {user.username}
    </MenuItem>,
    <Divider />,
    <MenuItem onClick={() => nav("/seeker/general-management/")}>
      <ListItemIcon>
        <AppsIcon fontSize="small" />
      </ListItemIcon>
      Qu???n l?? chung
    </MenuItem>,
    <MenuItem onClick={() => nav("/seeker/seeker-profile/")}>
      <ListItemIcon>
        <AccountCircleIcon fontSize="small" />
      </ListItemIcon>
      Ho??n thi???n h??? s??
    </MenuItem>,
    <MenuItem onClick={() => nav("/seeker/applied-jobs/")}>
      <ListItemIcon>
        <FactCheckIcon fontSize="small" />
      </ListItemIcon>
      Vi???c l??m ???? ???ng tuy???n
    </MenuItem>,
    <MenuItem onClick={() => nav("/seeker/save-jobs/")}>
      <ListItemIcon>
        <WorkHistoryIcon fontSize="small" />
      </ListItemIcon>
      Vi???c l??m ???? l??u
    </MenuItem>,
  ];

  const menuItemRecruiters = [
    <MenuItem onClick={() => nav("/recruiter/account/")}>
      <Avatar src={user.avatar} /> {user.username}
    </MenuItem>,
    <Divider />,
    <MenuItem onClick={() => nav("/recruiter/general-management/")}>
      <ListItemIcon>
        <AppsIcon fontSize="small" />
      </ListItemIcon>
      Qu???n l?? chung
    </MenuItem>,
    <MenuItem onClick={() => nav("/recruiter/new-post/")}>
      <ListItemIcon>
        <NewspaperIcon fontSize="small" />
      </ListItemIcon>
      ????ng tin tuy???n d???ng
    </MenuItem>,
    <MenuItem onClick={() => nav("/recruiter/posted/")}>
      <ListItemIcon>
        <HistoryIcon fontSize="small" />
      </ListItemIcon>
      Tin tuy???n d???ng ???? ????ng
    </MenuItem>,
    <MenuItem onClick={() => nav("/recruiter/job-post-activity/")}>
      <ListItemIcon>
        <PeopleAltIcon fontSize="small" />
      </ListItemIcon>
      ???ng vi??n ???ng tuy???n
    </MenuItem>,
  ];

  return (
    <>
      <Box sx={{ display: { sm: "flex", md: "flex" }, marginLeft: "auto" }}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
        >
          <Badge badgeContent={1} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Thi???t l???p t??i kho???n">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={user.avatar} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* show menu item  */}
        {checkPermission(user, UserRole.SEEKER) ? (
          menuItemSeekers.map((menuItemSeeker) => menuItemSeeker)
        ) : checkPermission(user, UserRole.RECRUITER) ? (
          menuItemRecruiters.map((menuItemRecruiter) => menuItemRecruiter)
        ) : (
          <MenuItem></MenuItem>
        )}
        {/* show menu item  */}
        <MenuItem
          onClick={() =>
            checkPermission(user, UserRole.SEEKER)
              ? nav("/seeker/change-password/")
              : checkPermission(user, UserRole.RECRUITER)
              ? nav("/recruiter/change-password/")
              : "/node_modules"
          }
        >
          <ListItemIcon>
            <KeyIcon fontSize="small" />
          </ListItemIcon>
          ?????i m???t kh???u
        </MenuItem>
        <Divider />
        <MenuItem style={{ color: "red" }} onClick={handleLogout}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faArrowRightFromBracket} color="red" />
          </ListItemIcon>
          ????ng xu???t
        </MenuItem>
      </Menu>
    </>
  );
}
