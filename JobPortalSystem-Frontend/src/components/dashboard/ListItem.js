import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

// icons
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AppsIcon from "@mui/icons-material/Apps";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import WorkIcon from "@mui/icons-material/Work";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import KeyIcon from "@mui/icons-material/Key";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import PhotoIcon from "@mui/icons-material/Photo";

const SeekerList = () => {
  const location = useLocation();
  const [openProfile, setOpenProfile] = React.useState(true);
  const [openAccount, setOpenAccount] = React.useState(true);

  const handleClickProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleClickAccount = () => {
    setOpenAccount(!openAccount);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper"}}
      component="nav"
    >
      <ListItemButton
        component={Link}
        to="general-management/"
        selected={location.pathname === "/seeker/general-management/"}
      >
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý chung" />
      </ListItemButton>
      <ListItemButton onClick={handleClickProfile} underline="none">
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Hồ sơ xin việc" />
        {openProfile ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProfile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="seeker-profile/"
            selected={location.pathname === "/seeker/seeker-profile/"}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Hồ sơ online" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="cv/"
            selected={location.pathname === "/seeker/cv/"}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="CV xin việc" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton component={Link} to={"/"}>
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="Việc làm" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={"/seeker/applied-jobs/"}
        selected={location.pathname === "/seeker/applied-jobs/"}
      >
        <ListItemIcon>
          <FactCheckIcon />
        </ListItemIcon>
        <ListItemText primary="Việc làm đã ứng tuyển" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={"/seeker/save-jobs/"}
        selected={location.pathname === "/seeker/save-jobs/"}
      >
        <ListItemIcon>
          <WorkHistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Việc làm đã lưu" />
      </ListItemButton>
      <ListItemButton onClick={handleClickAccount}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý tài khoản" />
        {openAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAccount} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="account/"
            selected={location.pathname === "/seeker/account/"}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Thông tin tài khoản" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="change-password/"
            selected={location.pathname === "/seeker/change-password/"}
          >
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary="Đổi mật khẩu" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

const RecruiterList = () => {
  const location = useLocation();
  const [openProfile, setOpenProfile] = React.useState(true);
  const [openAccount, setOpenAccount] = React.useState(true);
  const [openProfileCompany, setOpenProfileCompany] = React.useState(true);

  const handleClickProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleClickAccount = () => {
    setOpenAccount(!openAccount);
  };

  const handleClickProfileCompnay = () => {
    setOpenProfileCompany(!openProfileCompany);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      <ListItemButton
        component={Link}
        to={"general-management/"}
        selected={location.pathname === "/recruiter/general-management/"}
      >
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý chung" />
      </ListItemButton>
      <ListItemButton onClick={handleClickProfile} underline="none">
        <ListItemIcon>
          <NewspaperIcon />
        </ListItemIcon>
        <ListItemText primary="Đăng tin" />
        {openProfile ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProfile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to={"new-post/"}
            selected={location.pathname === "/recruiter/new-post/"}
          >
            <ListItemIcon>
              <FiberNewIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng tin mới" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to={"posted/"}
            selected={location.pathname === "/recruiter/posted/"}
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Tin đã đăng" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton component={Link} to={"/job-seeker-profiles/"}>
        <ListItemIcon>
          <PersonSearchIcon />
        </ListItemIcon>
        <ListItemText primary="Tìm kiếm ứng viên" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={"job-post-activity/"}
        selected={location.pathname === "/recruiter/job-post-activity/"}
      >
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="Ứng viên ứng tuyển" />
      </ListItemButton>
      <ListItemButton onClick={handleClickProfileCompnay}>
        <ListItemIcon>
          <FolderSharedIcon />
        </ListItemIcon>
        <ListItemText primary="Hồ sơ công ty" />
        {openAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProfileCompany} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to={"company-profile/"}
            selected={location.pathname === "/recruiter/company-profile/"}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Thông tin công ty" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to={"company-images/"}
            selected={location.pathname === "/recruiter/company-images/"}
          >
            <ListItemIcon>
              <PhotoIcon />
            </ListItemIcon>
            <ListItemText primary="Hình ảnh công ty" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClickAccount}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý tài khoản" />
        {openAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAccount} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to={"account/"}
            selected={location.pathname === "/recruiter/account/"}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Thông tin tài khoản" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to={"change-password/"}
            selected={location.pathname === "/recruiter/change-password/"}
          >
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary="Đổi mật khẩu" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};
export default SeekerList;
export { RecruiterList };
